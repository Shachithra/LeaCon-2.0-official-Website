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
        page = browser.new_page(viewport={"width": 1280, "height": 900})
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
                            outline: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor,
                            visible: el.getBoundingClientRect().width > 0,
                        };
                    }"""
                )
            )
        notes.append("tab order: " + json.dumps([o["text"] for o in order if o], ensure_ascii=False))
        no_focus_ring = [o for o in order if o and o["outline"].startswith("none")]
        if no_focus_ring:
            problems.append(f"focus ring missing on: {[o['text'] for o in no_focus_ring]}")

        # --- mobile menu: open, Escape, focus return ------------------------
        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile.goto(BASE + "/", wait_until="networkidle")
        burger = mobile.get_by_role("button", name="Open menu")
        burger.click()
        mobile.wait_for_timeout(300)
        open_state = mobile.evaluate(
            "() => ({ open: document.getElementById('site-menu').open, active: document.activeElement.className })"
        )
        notes.append("menu opened: " + json.dumps(open_state))
        if not open_state["open"]:
            problems.append("mobile menu did not open")
        mobile.keyboard.press("Escape")
        mobile.wait_for_timeout(300)
        after_esc = mobile.evaluate(
            """() => ({
                open: document.getElementById('site-menu').open,
                focusIsBurger: document.activeElement === document.querySelector('.burger'),
                expanded: document.querySelector('.burger').getAttribute('aria-expanded'),
                bodyScroll: document.documentElement.style.overflow,
            })"""
        )
        notes.append("after Escape: " + json.dumps(after_esc))
        if after_esc["open"] or not after_esc["focusIsBurger"] or after_esc["expanded"] != "false":
            problems.append("Escape/focus-return/aria-expanded incorrect on mobile menu")
        if after_esc["bodyScroll"] != "":
            problems.append("body scroll not restored after menu close")

        # --- reduced motion --------------------------------------------------
        calm = browser.new_context(
            viewport={"width": 1280, "height": 900}, reduced_motion="reduce"
        )
        calm_page = calm.new_page()
        calm_page.goto(BASE + "/", wait_until="networkidle")
        calm_page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        calm_page.wait_for_timeout(500)
        motion = calm_page.evaluate(
            """() => {
                const els = [...document.querySelectorAll('.reveal')];
                const hidden = els.filter(el => parseFloat(getComputedStyle(el).opacity) < 0.99);
                const durations = [...new Set(els.map(el => getComputedStyle(el).transitionDuration))];
                return { total: els.length, hidden: hidden.length, durations };
            }"""
        )
        notes.append("reduced motion: " + json.dumps(motion))
        if motion["hidden"] > 0:
            problems.append(f"{motion['hidden']} reveal elements hidden under prefers-reduced-motion")

        # --- content visible without JS-driven reveal (no-JS proxy) ----------
        calm_page.goto(BASE + "/register", wait_until="networkidle")
        calm_page.wait_for_timeout(300)
        inert = calm_page.evaluate(
            """() => {
                const el = document.querySelector('.btn--inert');
                const cs = getComputedStyle(el);
                return { text: el.textContent.trim(), color: cs.color, bg: cs.backgroundColor,
                         disabled: el.getAttribute('aria-disabled'), cursor: cs.cursor };
            }"""
        )
        notes.append("register CTA state: " + json.dumps(inert))
        if inert["disabled"] != "true":
            problems.append("register CTA is not marked aria-disabled while the link is missing")

        calm.close()
        browser.close()

    print("\n".join(notes))
    for problem in problems:
        print("PROBLEM:", problem)
    print(f"{len(problems)} problems")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
