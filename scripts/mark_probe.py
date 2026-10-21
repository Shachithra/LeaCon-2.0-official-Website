"""Measure the footer wordmark geometry: box, baseline, ink extents, cut line."""
import json
import os

from playwright.sync_api import sync_playwright

BASE = os.environ.get("LEACON_BASE", "http://localhost:5176")
OUT = os.path.join(os.path.dirname(__file__), "..", "qa")

JS = """
() => {
  const mark = document.querySelector('.site-footer__mark');
  const r = mark.getBoundingClientRect();
  const cs = getComputedStyle(mark);
  const probe = document.createElement('span');
  probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
  mark.appendChild(probe);
  const b = probe.getBoundingClientRect();
  mark.removeChild(probe);
  const c = document.createElement('canvas').getContext('2d');
  c.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const m = c.measureText('LEACON 2.0');
  const boxH = r.height;
  const fontSize = parseFloat(cs.fontSize);
  return {
    fontFamily: cs.fontFamily,
    fontSize,
    boxH,
    baselineFromTop: b.bottom - r.top,
    baselineFrac: (b.bottom - r.top) / boxH,
    capInkAscent: m.actualBoundingBoxAscent,
    capInkDescent: m.actualBoundingBoxDescent,
    inkBottomFromTop: (b.bottom - r.top) - m.actualBoundingBoxDescent,
    textWidth: m.width,
    boxWidth: r.width,
    clipPath: cs.clipPath,
    cutFracKept: 1 - parseFloat((cs.clipPath.match(/([\\d.]+)%/) || [0, 0])[1]) / 100,
  };
}
"""

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="no-preference")
    page = ctx.new_page()
    page.add_init_script("sessionStorage.setItem('leacon-entry-seen', '1')")
    page.goto(BASE + "/", wait_until="networkidle")
    page.wait_for_timeout(500)
    data = page.evaluate(JS)
    print(json.dumps(data, indent=2))
    # element close-up screenshot for visual check
    mark = page.locator(".site-footer__mark")
    mark.scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    mark.screenshot(path=os.path.join(OUT, "mark-after.png"))
    browser.close()
