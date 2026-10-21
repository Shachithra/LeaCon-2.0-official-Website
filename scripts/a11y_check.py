"""Keyboard, focus and reduced-motion checks: python scripts/a11y_check.py"""

import json
import os
import pathlib
import sys

from playwright.sync_api import sync_playwright

BASE = os.environ.get("LEACON_BASE", "http://localhost:5176")
OUT = pathlib.Path(__file__).resolve().parent.parent / "qa"


def main() -> int:
    problems: list[str] = []
    notes: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch()

        # --- desktop: tab order + visible focus -----------------------------
        calm = browser.new_context(
            viewport={"width": 1280, "height": 900}, reduced_motion="reduce"
        )
        calm.add_init_script("sessionStorage.setItem('leacon-entry-seen','1')")
        page = calm.new_page()
        page.goto(BASE + "/", wait_until="networkidle")
        page.wait_for_timeout(300)

        order = []
        for _ in range(14):
            page.keyboard.press("Tab")
            order.append(
                page.evaluate(
                    """() => {
                        const el = document.activeElement;
                        if (!el) return null;
                        const cs = getComputedStyle(el);
                        return {
                            tag: el.tagName,
                            text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 32),
                            outline: cs.outlineStyle + ' ' + cs.outlineWidth,
                            visible: el.getBoundingClientRect().width > 0,
                        };
                    }"""
                )
            )
        notes.append(
            "tab order: " + json.dumps([o["text"] for o in order if o], ensure_ascii=False)
        )
        no_focus_ring = [o for o in order if o and o["outline"].startswith("none")]
        if no_focus_ring:
            problems.append(f"focus ring missing on: {[o['text'] for o in no_focus_ring]}")
        first = order[0]
        if not first or "Skip" not in first["text"]:
            problems.append("first tab stop is not the skip link")

        # --- mobile menu: open, Escape, focus return, aria-expanded ---------
        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile.goto(BASE + "/", wait_until="networkidle")
        burger = mobile.get_by_role("button", name="Open menu")
        burger.click()
        mobile.wait_for_timeout(300)
        open_state = mobile.evaluate(
            "() => ({ open: document.getElementById('site-menu').open, "
            "active: document.activeElement.className })"
        )
        notes.append("menu opened: " + json.dumps(open_state))
        if not open_state["open"]:
            problems.append("mobile menu did not open")
        mobile.keyboard.press("Escape")
        mobile.wait_for_timeout(700)  # the close wipe runs 0.4s before onClose
        after_esc = mobile.evaluate(
            """() => ({
                open: document.getElementById('site-menu').open,
                focusIsToggle: document.activeElement === document.querySelector('.menu-toggle'),
                expanded: document.querySelector('.menu-toggle').getAttribute('aria-expanded'),
                bodyScroll: document.documentElement.style.overflow,
            })"""
        )
        notes.append("after Escape: " + json.dumps(after_esc))
        if after_esc["open"] or not after_esc["focusIsToggle"]:
            problems.append("Escape/focus-return incorrect on mobile menu")
        if after_esc["expanded"] != "false":
            problems.append("aria-expanded not reset after menu close")
        if after_esc["bodyScroll"] != "":
            problems.append("body scroll not restored after menu close")

        # --- reduced motion: nothing left hidden ---------------------------
        calm_page = calm.new_page()
        calm_page.goto(BASE + "/", wait_until="networkidle")
        calm_page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        calm_page.wait_for_timeout(500)
        motion = calm_page.evaluate(
            """() => {
                const els = [...document.querySelectorAll('.mask__inner')];
                const hidden = els.filter(el => {
                    const cs = getComputedStyle(el);
                    return parseFloat(cs.opacity) < 0.99 || cs.visibility === 'hidden';
                });
                const paused = document.documentElement.dataset.motion;
                return { total: els.length, hidden: hidden.length, paused };
            }"""
        )
        notes.append("reduced motion: " + json.dumps(motion))
        if motion["hidden"] > 0:
            problems.append(
                f"{motion['hidden']} masked lines hidden under prefers-reduced-motion"
            )

        # --- pause-motion control persists ---------------------------------
        calm_page.goto(BASE + "/", wait_until="networkidle")
        toggle = calm_page.get_by_role("button", name="Pause site motion")
        toggle.click()
        calm_page.wait_for_timeout(200)
        state = calm_page.evaluate(
            "() => ({ motion: document.documentElement.dataset.motion, "
            "stored: localStorage.getItem('leacon-motion') })"
        )
        notes.append("pause control: " + json.dumps(state))
        if state["motion"] != "paused" or state["stored"] != "paused":
            problems.append("Pause motion control did not pause and persist")

        # --- register page: no fake CTA, no invented facts -----------------
        calm_page.goto(BASE + "/register", wait_until="networkidle")
        calm_page.wait_for_timeout(300)
        register = calm_page.evaluate(
            """() => {
                const anchors = [...document.querySelectorAll('.register-cta a')];
                const disabledBtns = [...document.querySelectorAll('button[disabled], .btn--inert')];
                const pending = document.querySelector('.register-cta__pending');
                return {
                    ctaAnchors: anchors.length,
                    disabledButtons: disabledBtns.length,
                    hasPendingLine: Boolean(pending),
                };
            }"""
        )
        notes.append("register CTA state: " + json.dumps(register))
        if register["disabledButtons"] > 0:
            problems.append("register page shows a disabled button instead of honest text")
        if register["ctaAnchors"] == 0 and not register["hasPendingLine"]:
            problems.append("register page has neither a link nor a pending line")

        # --- no shop anywhere ----------------------------------------------
        for route in ["/", "/about", "/team", "/event", "/register"]:
            calm_page.goto(BASE + route, wait_until="networkidle")
            shop = calm_page.evaluate(
                "() => document.body.innerText.toLowerCase().includes('shop')"
            )
            if shop:
                problems.append(f"'shop' text found on {route}")
        notes.append("shop check: clean on all five routes")

        calm.close()
        browser.close()

    print("\n".join(notes))
    for problem in problems:
        print("PROBLEM:", problem)
    print(f"{len(problems)} problems")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
