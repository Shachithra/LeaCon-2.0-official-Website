"""Capture the entry sequence mid-run (first visit, motion allowed)."""

import os
import pathlib

from playwright.sync_api import sync_playwright

BASE = os.environ.get("LEACON_BASE", "http://localhost:5176")
OUT = pathlib.Path(__file__).resolve().parent.parent / "qa" / "v2"


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            reduced_motion="no-preference",
        )
        page = context.new_page()
        page.goto(BASE + "/", wait_until="domcontentloaded")
        page.wait_for_timeout(1700)
        phase = page.evaluate(
            "document.querySelector('.entry')?.dataset.phase ?? 'gone'"
        )
        page.screenshot(path=str(OUT / "entry-d.png"))
        print(f"entry phase at 1.7s: {phase}")
        browser.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
