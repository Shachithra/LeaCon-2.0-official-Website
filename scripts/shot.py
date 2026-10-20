"""Screenshot the LeaCon site for design review.

    python scripts/shot.py <route> [width] [height] [outfile]

Defaults to the Vite dev server on port 5176. Writes to qa/ when no
outfile is given. Uses reduced-motion off so the reveal states settle.
"""

import os
import pathlib
import sys

from playwright.sync_api import sync_playwright

BASE = os.environ.get("LEACON_BASE", "http://localhost:5176")
OUT = pathlib.Path(__file__).resolve().parent.parent / "qa"


def main() -> int:
    route = sys.argv[1] if len(sys.argv) > 1 else "/"
    width = int(sys.argv[2]) if len(sys.argv) > 2 else 1440
    height = int(sys.argv[3]) if len(sys.argv) > 3 else 900
    name = sys.argv[4] if len(sys.argv) > 4 else "shot"

    OUT.mkdir(exist_ok=True)
    errors: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": width, "height": height})
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(BASE + route, wait_until="networkidle")
        page.wait_for_timeout(400)
        # settle every reveal before capturing the full page
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(700)
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(300)

        path = OUT / f"{name}.png"
        full = (sys.argv[5] if len(sys.argv) > 5 else "full") != "view"
        page.screenshot(path=str(path), full_page=full)

        overflow = page.evaluate(
            "document.documentElement.scrollWidth > window.innerWidth + 1"
        )
        browser.close()

    print(f"saved {path}")
    print(f"horizontal overflow: {overflow}")
    print(f"console errors: {errors or 'none'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
