"""Section-level screenshots for design review: python scripts/shoot_sections.py"""

import pathlib
import sys

from playwright.sync_api import sync_playwright

BASE = "http://localhost:5175"
OUT = pathlib.Path(__file__).resolve().parent.parent / "qa"

SHOTS = [
    ("home-hero", "/", ".hero"),
    ("home-chapters", "/", ".chapters"),
    ("home-recognition", "/", ".recognition"),
    ("home-glimpse", "/", ".glimpse"),
    ("home-partners", "/", ".partners"),
    ("about", "/about", "main"),
    ("team", "/team", "main"),
    ("event-logistics", "/event", "main"),
    ("shop", "/shop", "main"),
    ("register", "/register", "main"),
    ("notfound", "/missing-page", "main"),
]


def main() -> int:
    OUT.mkdir(exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 950})
        for name, route, selector in SHOTS:
            page.goto(BASE + route, wait_until="networkidle")
            page.wait_for_timeout(400)
            # trigger every scroll reveal before capturing
            page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(700)
            page.evaluate("() => window.scrollTo(0, 0)")
            page.wait_for_timeout(300)
            el = page.locator(selector).first
            el.screenshot(path=str(OUT / f"sec-{name}.png"))
            print("captured", name)

        # mobile menu, opened
        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile.goto(BASE + "/", wait_until="networkidle")
        mobile.get_by_role("button", name="Open menu").click()
        mobile.wait_for_timeout(400)
        mobile.screenshot(path=str(OUT / "sec-mobile-menu.png"))
        print("captured mobile-menu")

        browser.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
