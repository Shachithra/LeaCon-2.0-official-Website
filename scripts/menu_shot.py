"""Open the menu overlay and screenshot it (mobile + tablet; the toggle only exists below 1024px)."""
import os

from playwright.sync_api import sync_playwright

BASE = os.environ.get("LEACON_BASE", "http://localhost:5176")
OUT = os.path.join(os.path.dirname(__file__), "..", "qa", "v2")

with sync_playwright() as p:
    browser = p.chromium.launch()
    for label, vp in (("m", {"width": 390, "height": 844}), ("t", {"width": 768, "height": 1024})):
        ctx = browser.new_context(viewport=vp, reduced_motion="no-preference")
        page = ctx.new_page()
        page.add_init_script("sessionStorage.setItem('leacon-entry-seen', '1')")
        page.goto(BASE + "/", wait_until="networkidle")
        page.get_by_role("button", name="Open menu").first.click()
        page.wait_for_timeout(1600)
        page.screenshot(path=os.path.join(OUT, f"menu-{label}.png"))
        print(f"menu-{label}: captured, overlay=", page.locator(".menu-overlay").count())
        ctx.close()
    browser.close()
