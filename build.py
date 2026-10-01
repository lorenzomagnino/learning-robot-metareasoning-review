"""Combine the page layout and sections into the static index.html."""

import argparse
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SECTIONS = ("hero", "abstract", "method", "semi-mdp", "planner-statistics", "results", "conclusion")


def render():
    sections = "".join(
        (ROOT / "sections" / f"{name}.html").read_text(encoding="utf-8")
        for name in SECTIONS
    )
    return (ROOT / "page.html").read_text(encoding="utf-8").replace(
        "{{sections}}", sections
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Check index.html is up to date")
    args = parser.parse_args()
    page = render()
    target = ROOT / "index.html"
    if args.check:
        if not target.exists() or target.read_text(encoding="utf-8") != page:
            raise SystemExit("index.html is out of date; run python3 build.py")
        print("index.html is up to date")
    else:
        target.write_text(page, encoding="utf-8")
