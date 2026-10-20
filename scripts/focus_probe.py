"""Route/focus behaviour probe: python scripts/focus_probe.py"""

import json
import os
import sys

from playwright.sync_api import sync_playwright

BASE = os.environ.get("LEACON_BASE", "http://localhost:5176")


def describe(pg) -> str:
    return pg.evaluate(
        "() => document.activeElement.tagName + '.' + (document.activeElement.className || '') "
        "+ '#' + (document.activeElement.id || '')"
    )


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        page.goto(BASE + "/", wait_until="networkidle")
        page.wait_for_timeout(400)

        print("initial active:", describe(page))

        seq = []
        for _ in range(6):
            page.keyboard.press("Tab")
            seq.append(
                page.evaluate(
                    """() => {
                        const e = document.activeElement;
                        const cs = getComputedStyle(e);
                        return { cls: e.className, txt: (e.textContent || '').trim().slice(0, 26),
                                 outline: cs.outlineStyle };
                    }"""
                )
            )
        print("tab order:", json.dumps(seq, ensure_ascii=False))

        page.get_by_role("link", name="About Us").first.click()
        page.wait_for_timeout(500)
        print("after SPA route change ->", describe(page), "scrollY:", page.evaluate("window.scrollY"))

        page.goto(BASE + "/", wait_until="networkidle")
        page.wait_for_timeout(300)
        page.get_by_role("link", name="Explore the Experience").click()
        page.wait_for_timeout(800)
        print(
            "after in-page hash click -> scrollY:", page.evaluate("window.scrollY"),
            "active:", describe(page),
        )

        # direct load of an in-page anchor URL
        page.goto(BASE + "/#obt", wait_until="networkidle")
        page.wait_for_timeout(600)
        print("direct /#obt load scrollY:", page.evaluate("window.scrollY"))

        browser.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
