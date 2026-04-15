#!/usr/bin/env python3
"""Convert assets/*.png to WebP (quality ~82), resize if max edge > 1920px. Removes PNG after success."""
from __future__ import annotations

import os
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "assets"
MAX_EDGE = 1920
QUALITY = 82
# Keep as PNG for broad favicon / legacy support (referenced in index.html).
SKIP_CONVERT = frozenset({"favicon-transparent.png", "favicon.png"})


def to_webp(src: Path) -> Path | None:
    dst = src.with_suffix(".webp")
    im = Image.open(src)
    if im.mode == "P":
        im = im.convert("RGBA")
    elif im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    w, h = im.size
    if max(w, h) > MAX_EDGE:
        ratio = MAX_EDGE / max(w, h)
        new_size = (max(1, int(w * ratio)), max(1, int(h * ratio)))
        im = im.resize(new_size, Image.Resampling.LANCZOS)
    im.save(dst, "WEBP", quality=QUALITY, method=6)
    return dst


def main() -> int:
    if not ROOT.is_dir():
        print("assets/ not found", file=sys.stderr)
        return 1
    count = 0
    for path in sorted(ROOT.rglob("*.png")):
        if "fonts" in path.parts:
            continue
        if path.name in SKIP_CONVERT:
            continue
        try:
            to_webp(path)
            path.unlink()
            print(path.relative_to(ROOT.parent), "->", path.with_suffix(".webp").name)
            count += 1
        except OSError as e:
            print("FAIL", path, e, file=sys.stderr)
            return 1
    print(f"Converted {count} files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
