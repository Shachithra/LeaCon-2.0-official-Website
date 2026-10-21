"""Capture every route at three widths for design review.

    python scripts/capture_all.py

Starts from the Vite dev server on port 5176 (override with LEACON_BASE).
Writes to qa/v2/. The entry sequence is marked as seen so pages settle to
their final state; one extra capture shows the entry sequence itself.
"""

import os
import pathlib

from playwright.sync_api import sync_playwright

BASE = os.environ.get("LEACON_BASE", "http://localhost:5176")
OUT = pathlib.Path(__file__).resolve().parent.parent / "qa" / "v2"

ROUTES = [
    ("/", "home"),
    ("/about", "about"),
    ("/team", "team"),
    ("/event", "event"),
    ("/register", "register"),
    ("/no-such-page", "404"),
]

WIDTHS = [(390, 844, "m"), (768, 1024, "t"), (1440, 900, "d")]


def settle(page) -> None:
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(800)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(400)


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    problems: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch()

        for width, height, tag in WIDTHS:
            context = browser.new_context(
                viewport={"width": width, "height": height},
                reduced_motion="no-preference",
            )
            context.add_init_script("sessionStorage.setItem('leacon-entry-seen','1')")
            page = context.new_page()
            errors: list[str] = []
            page.on(
                "console",
                lambda m: errors.append(m.text) if m.type == "error" else None,
            )
            page.on("pageerror", lambda e: errors.append(str(e)))

            for route, name in ROUTES:
                errors.clear()
                page.goto(BASE + route, wait_until="networkidle")
                settle(page)
                page.screenshot(path=str(OUT / f"{name}-{tag}.png"), full_page=True)
                overflow = page.evaluate(
                    "document.documentElement.scrollWidth > window.innerWidth + 1"
                )
                line = f"{name}-{tag}: overflow={overflow}"
                if errors:
                    line += f" errors={errors}"
                    problems.append(line)
                print(line)
                if overflow:
                    problems.append(line)

            context.close()

        # One capture of the entry sequence itself (first visit, motion on)
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            reduced_motion="no-preference",
        )
        page = context.new_page()
        page.goto(BASE + "/", wait_until="domcontentloaded")
        page.wait_for_timeout(1600)
        page.screenshot(path=str(OUT / "entry-d.png"))
        print("entry-d: captured")
        context.close()

        browser.close()

    print("\n--- problems ---")
    print("\n".join(problems) if problems else "none")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
