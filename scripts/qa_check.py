"""Visual + responsive QA sweep for the LeaCon 2.0 site.

Opens every route at five viewports, records overflow, console errors,
heading structure and screenshot files. Run: python scripts/qa_check.py
"""

import json
import pathlib
import sys

from playwright.sync_api import sync_playwright

BASE = "http://localhost:5175"
ROUTES = ["/", "/about", "/team", "/event", "/shop", "/register", "/missing-page"]
VIEWPORTS = [
    ("360", 360, 800),
    ("390", 390, 844),
    ("768", 768, 1024),
    ("1024", 1024, 900),
    ("1440", 1440, 900),
]
OUT = pathlib.Path(__file__).resolve().parent.parent / "qa"


def main() -> int:
    OUT.mkdir(exist_ok=True)
    report = []

    with sync_playwright() as p:
        browser = p.chromium.launch()

        for label, width, height in VIEWPORTS:
            context = browser.new_context(
                viewport={"width": width, "height": height},
                reduced_motion="reduce" if label == "768" else "no-preference",
            )
            page = context.new_page()
            errors: list[str] = []
            page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
            page.on("pageerror", lambda exc: errors.append(str(exc)))

            for route in ROUTES:
                page.goto(BASE + route, wait_until="networkidle")
                page.wait_for_timeout(150)

                data = page.evaluate(
                    """() => ({
                        title: document.title,
                        h1: [...document.querySelectorAll('h1')].map(h => h.textContent.trim()),
                        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
                        scrollW: document.documentElement.scrollWidth,
                        innerW: window.innerWidth,
                        wide: [...document.querySelectorAll('body *')]
                          .filter(el => el.getBoundingClientRect().right > window.innerWidth + 1)
                          .slice(0, 5)
                          .map(el => el.className && typeof el.className === 'string'
                                ? el.className : el.tagName),
                        focusable: document.querySelectorAll('a[href], button, [tabindex="0"]').length,
                        small: [...document.querySelectorAll('a, button')]
                          .filter(el => {
                            const r = el.getBoundingClientRect()
                            return r.width > 0 && r.height > 0 && r.height < 40
                          })
                          .map(el => (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 28))
                          .slice(0, 8),
                    })"""
                )

                name = route.strip("/").replace("/", "-") or "home"
                page.screenshot(
                    path=str(OUT / f"{name}-{label}.png"),
                    full_page=(label in ("390", "1440")),
                )
                data["route"] = route
                data["viewport"] = label
                data["consoleErrors"] = list(errors)
                errors.clear()
                report.append(data)

            context.close()
        browser.close()

    (OUT / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

    problems = [
        r
        for r in report
        if r["overflow"] or r["consoleErrors"] or len(r["h1"]) != 1
    ]
    # `wide` is informational: elements inside a horizontal scroller legitimately
    # sit outside the viewport without producing document overflow.
    for r in problems:
        print("PROBLEM", r["viewport"], r["route"], json.dumps(r, ensure_ascii=False))
    print(f"checked {len(report)} route/viewport combinations, {len(problems)} problems")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
