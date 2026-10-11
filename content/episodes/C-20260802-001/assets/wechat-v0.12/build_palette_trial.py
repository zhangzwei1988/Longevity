#!/usr/bin/env python3
"""Build the V0.12 website-aligned WeChat palette trial without changing the installed Skill."""

from __future__ import annotations

import importlib.util
from pathlib import Path

from PIL import Image


HERE = Path(__file__).resolve().parent
EPISODE = HERE.parent.parent
SKILL_SCRIPTS = Path("/Users/john/.codex/skills/write-wechat-article/scripts")

OLD_TO_NEW = {
    "#FFFDF5": "#F5F1E8",
    "#F4F0E6": "#EAE3D5",
    "#282923": "#152B24",
    "#6D716A": "#56665F",
    "#686C65": "#56665F",
    "#B7F34A": "#E86F3E",
    "#28634B": "#1E493C",
    "#C74638": "#E86F3E",
    "#F8E7E3": "#F9E1D2",
    "#F1F8DD": "#DFE9DF",
    "#D9D5CA": "#C7C8BE",
    "#E9E6DE": "#D8D3C8",
}

IMAGE_PALETTE = {
    (255, 253, 245): (245, 241, 232),
    (244, 240, 230): (234, 227, 213),
    (40, 41, 35): (21, 43, 36),
    (109, 113, 106): (86, 102, 95),
    (183, 243, 74): (173, 195, 181),
    (40, 99, 75): (30, 73, 60),
    (199, 70, 56): (232, 111, 62),
    (248, 231, 227): (249, 225, 210),
    (241, 248, 221): (223, 233, 223),
    (217, 213, 202): (199, 200, 190),
}


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"cannot load {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def recolor_flat_image(source: Path, output: Path) -> None:
    image = Image.open(source).convert("RGB")
    source_pixels = image.get_flattened_data() if hasattr(image, "get_flattened_data") else image.getdata()
    pixels = [IMAGE_PALETTE.get(pixel, pixel) for pixel in source_pixels]
    image.putdata(pixels)
    output.parent.mkdir(parents=True, exist_ok=True)
    image.save(output, optimize=True)


def build_cover() -> None:
    cover = load_module("trial_compose_cover", SKILL_SCRIPTS / "compose_cover.py")
    cover.INK = "#152B24"
    cover.PAPER = "#F5F1E8"
    cover.GREEN = "#1E493C"
    cover.GREEN_DARK = "#1E493C"
    cover.RED = "#E86F3E"
    source = Image.open(HERE / "cover-background.png")
    title = "健康项目，\n值几万块吗？"
    cover.save(cover.compose(source, (1410, 600), title, "", False), HERE / "cover-2.35x1.jpg")
    cover.save(cover.compose(source, (1080, 1080), title, "", True), HERE / "cover-1x1.jpg")


def build_inline_images() -> None:
    brand = load_module("trial_add_brand_mark", SKILL_SCRIPTS / "add_brand_mark.py")
    brand.PAPER = "#F5F1E8"
    brand.INK = "#152B24"
    brand.MUTED = "#56665F"

    scenes = {
        "inline-01-livestream-source.png": "inline-01-livestream.png",
        "inline-02-payment-pause-source.png": "inline-02-payment-pause.png",
    }
    for source_name, output_name in scenes.items():
        image = Image.open(HERE / "source" / source_name)
        result = brand.add_overlay_mark(image, "多活十年 Lab")
        result.save(HERE / output_name, optimize=True)

    cards = {
        "inline-03-evidence-path-unbranded.png": "inline-03-evidence-path.png",
        "inline-04-acceptance-mismatch-unbranded.png": "inline-04-acceptance-mismatch.png",
        "inline-05-responsibility-map-unbranded.png": "inline-05-responsibility-map.png",
        "homework-card-unbranded.png": "homework-card.png",
    }
    for source_name, output_name in cards.items():
        recolored = HERE / "source" / source_name.replace(".png", "-website-palette.png")
        recolor_flat_image(HERE / "source" / source_name, recolored)
        result = brand.add_footer_mark(Image.open(recolored), "多活十年 Lab", trim_bottom=True)
        result.save(HERE / output_name, optimize=True)


def build_html() -> None:
    renderer = load_module("trial_render_wechat", SKILL_SCRIPTS / "render_wechat.py")
    article = EPISODE / "wechat-article-v0.12-publish.md"
    markdown = article.read_text(encoding="utf-8")
    fragment = renderer.render(markdown, article.parent, False)
    preview_fragment = renderer.render(markdown, article.parent, True)
    preview = renderer.preview_document(preview_fragment)
    for old, new in OLD_TO_NEW.items():
        fragment = fragment.replace(old, new).replace(old.lower(), new)
        preview = preview.replace(old, new).replace(old.lower(), new)
    fragment = fragment.replace("border-bottom:2px dashed #56665F", "border-bottom:2px dashed #ADC3B5")
    preview = preview.replace("border-bottom:2px dashed #56665F", "border-bottom:2px dashed #ADC3B5")
    (HERE / "wechat-fragment.html").write_text(fragment, encoding="utf-8")
    (HERE / "wechat-preview.html").write_text(preview, encoding="utf-8")


def main() -> None:
    build_cover()
    build_inline_images()
    build_html()


if __name__ == "__main__":
    main()
