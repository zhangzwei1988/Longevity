#!/usr/bin/env python3
"""Render the project-owned Jiannian editorial trial theme into WeChat-safe HTML."""

from __future__ import annotations

import argparse
import html
import re
from pathlib import Path


FONT = "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif"
PAPER = "#F5F1E8"
PAPER_DEEP = "#EAE3D5"
INK = "#152B24"
GREEN = "#1E493C"
SAGE = "#ADC3B5"
MINT = "#DFE9DF"
ORANGE = "#E86F3E"
ORANGE_SOFT = "#F6C5AA"
ORANGE_PALE = "#F9E1D2"
MUTED = "#56665F"
LINE = "#C7C8BE"
APPENDIX_TITLES = {"附录｜来源与说明", "来源与说明"}
SEMANTIC_TAG_RE = re.compile(r"^\[(证据|拆坑|风险|行动|边界)\]\s*")


def leaf(text: str) -> str:
    return f'<span leaf="">{html.escape(text)}</span>'


def inline_markup(text: str, *, emphasis: str = "highlight") -> str:
    parts = re.split(r"(\*\*.+?\*\*)", text.strip())
    rendered: list[str] = []
    for part in parts:
        if not part:
            continue
        if part.startswith("**") and part.endswith("**"):
            content = part[2:-2]
            if emphasis == "plain":
                style = f"font-weight:700;color:{INK};"
            elif emphasis == "appendix":
                style = f"font-weight:700;color:{INK};"
            else:
                style = f"font-weight:700;color:{GREEN};background:linear-gradient(transparent 68%,{MINT} 68%);"
            rendered.append(f'<strong style="{style}">{leaf(content)}</strong>')
        else:
            rendered.append(leaf(part))
    return "".join(rendered)


def paragraph(text: str, *, appendix: bool = False) -> str:
    if appendix:
        return (
            f'<p style="margin:0 0 10px;font-size:13px;line-height:1.75;letter-spacing:0.01em;color:{MUTED};">'
            f'{inline_markup(text, emphasis="appendix")}</p>'
        )
    return (
        f'<p style="margin:0 0 16px;font-size:17px;line-height:1.85;letter-spacing:0.02em;color:{INK};">'
        f'{inline_markup(text)}</p>'
    )


def chapter(title: str, index: int) -> str:
    if index % 2:
        marker = f'border-top:4px solid {ORANGE};'
    else:
        marker = f'border-top:3px dashed {SAGE};'
    return (
        '<section style="margin:42px 0 18px;">'
        f'<p style="margin:0 0 9px;line-height:1;"><span style="display:inline-block;width:42px;{marker}"><span leaf=""><br></span></span></p>'
        f'<h2 style="margin:0;font-size:20px;line-height:1.45;font-weight:700;color:{INK};">{leaf(title)}</h2>'
        f'<p style="margin:10px 0 0;line-height:1;border-bottom:1px solid {LINE};"><span leaf=""><br></span></p>'
        '</section>'
    )


def callout(lines: list[str]) -> str:
    cleaned = [SEMANTIC_TAG_RE.sub("", line.strip()) for line in lines]
    joined = " ".join(cleaned).lstrip()
    is_checklist = len(cleaned) >= 4 and all(item.startswith("**") for item in cleaned)
    if is_checklist:
        body = "".join(
            f'<p style="margin:0 0 11px;font-size:16px;line-height:1.75;color:{INK};">'
            f'{inline_markup(item, emphasis="plain")}</p>'
            for item in cleaned
        )
        return (
            f'<section style="margin:0 0 28px;padding:16px 17px 8px;border-top:3px solid {GREEN};'
            f'border-bottom:1px solid {LINE};background:{PAPER};">{body}</section>'
        )

    if joined.startswith("✋"):
        style = f'border-left:4px solid {ORANGE};background:{ORANGE_PALE};border-radius:0 4px 4px 0;'
    elif joined.startswith("🔍"):
        style = (
            f'border-left:3px solid {INK};border-top:1px dashed {SAGE};'
            f'border-bottom:1px dashed {SAGE};background:{PAPER_DEEP};'
        )
    elif joined.startswith("🧾"):
        style = (
            f'border-left:4px solid {ORANGE};border-top:1px dashed {ORANGE_SOFT};'
            f'border-bottom:1px dashed {ORANGE_SOFT};background:{ORANGE_PALE};'
        )
    elif joined.startswith("✅"):
        style = f'border-left:4px solid {GREEN};background:{MINT};border-radius:0 4px 4px 0;'
    else:
        style = f'border-left:3px solid {SAGE};background:{PAPER_DEEP};'

    body = "".join(
        f'<p style="margin:{"0" if i == 0 else "8px 0 0"};font-size:16px;line-height:1.8;color:{INK};">'
        f'{inline_markup(item, emphasis="plain")}</p>'
        for i, item in enumerate(cleaned)
    )
    return f'<section style="margin:22px 0 26px;padding:15px 17px;{style}">{body}</section>'


def image_block(alt: str, source: str) -> str:
    name = Path(source).name
    return (
        f'<figure style="margin:26px 0 30px;padding:4px 4px 5px;background:{PAPER};'
        f'border-top:1px solid {LINE};border-bottom:1px solid {LINE};">'
        f'<span leaf=""><img src="{html.escape(name, quote=True)}" alt="{html.escape(alt, quote=True)}" '
        'style="max-width:100%;height:auto;display:block;margin:0 auto;"></span></figure>'
    )


def render(markdown: str) -> str:
    lines = markdown.splitlines()
    output: list[str] = []
    paragraph_lines: list[str] = []
    index = 0
    h2_index = 0
    appendix_open = False

    def flush_paragraph() -> None:
        if not paragraph_lines:
            return
        body = " ".join(item.strip() for item in paragraph_lines)
        output.append(paragraph(body, appendix=appendix_open))
        paragraph_lines.clear()

    while index < len(lines):
        stripped = lines[index].strip()
        if not stripped:
            flush_paragraph()
            index += 1
            continue

        image_match = re.fullmatch(r"!\[([^]]*)\]\(([^)]+)\)", stripped)
        if image_match:
            flush_paragraph()
            output.append(image_block(image_match.group(1), image_match.group(2)))
            index += 1
            continue

        if stripped.startswith("## "):
            flush_paragraph()
            h2_index += 1
            output.append(chapter(stripped[3:].strip(), h2_index))
            index += 1
            continue

        if stripped.startswith("### "):
            flush_paragraph()
            title = stripped[4:].strip()
            if title in APPENDIX_TITLES:
                appendix_open = True
                output.append(
                    f'<section style="margin:38px 0 0;padding:16px 14px 7px;border-top:1px solid {LINE};'
                    f'background:{PAPER_DEEP};color:{MUTED};">'
                    f'<h3 style="margin:0 0 10px;font-size:14px;line-height:1.6;font-weight:600;'
                    f'letter-spacing:0.06em;color:{MUTED};">{leaf(title)}</h3>'
                )
            else:
                output.append(
                    f'<p style="margin:28px 0 14px;padding-left:11px;border-left:3px solid {GREEN};'
                    f'font-size:17px;line-height:1.6;font-weight:700;color:{INK};">{leaf(title)}</p>'
                )
            index += 1
            continue

        if stripped.startswith(">"):
            flush_paragraph()
            quote_lines: list[str] = []
            while index < len(lines) and lines[index].lstrip().startswith(">"):
                quote_lines.append(lines[index].lstrip()[1:].strip())
                index += 1
            output.append(callout(quote_lines))
            continue

        if stripped in {"---", "***"}:
            flush_paragraph()
            output.append(
                f'<p style="margin:30px 0;line-height:1;border-bottom:1px solid {LINE};"><span leaf=""><br></span></p>'
            )
            index += 1
            continue

        paragraph_lines.append(stripped)
        index += 1

    flush_paragraph()
    if appendix_open:
        output.append("</section>")
    return (
        f'<section style="box-sizing:border-box;width:100%;max-width:100%;margin:0;padding:0 2px;'
        f'background:{PAPER};color:{INK};font-family:{FONT};word-break:break-word;overflow-wrap:anywhere;">'
        + "".join(output)
        + "</section>"
    )


def make_preview(fragment: str, title: str, template_path: Path) -> str:
    template = template_path.read_text(encoding="utf-8")
    preview = template.replace("{{TITLE}}", title).replace("<!--GZH_CONTENT-->", fragment)
    preview = preview.replace("background:#eef0f2", f"background:{PAPER_DEEP}")
    preview = preview.replace("background:#059669", f"background:{GREEN}")
    preview = preview.replace("background:#047857", f"background:{INK}")
    preview = preview.replace("rgba(5,150,105,.28)", "rgba(30,73,60,.24)")
    preview = preview.replace(
        ".gzh-stage{max-width:700px;margin:78px auto 64px;padding:0 8px;}",
        ".gzh-stage{box-sizing:border-box;width:375px;max-width:calc(100% - 16px);margin:78px auto 64px;padding:24px 18px 36px;background:#F5F1E8;box-shadow:0 8px 30px rgba(21,43,36,.10);}",
    )
    return preview


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--fragment", required=True, type=Path)
    parser.add_argument("--preview", required=True, type=Path)
    parser.add_argument(
        "--preview-template",
        default=Path("/Users/john/.codex/skills/gzh-design/assets/preview-template.html"),
        type=Path,
    )
    args = parser.parse_args()
    fragment = render(args.input.read_text(encoding="utf-8"))
    args.fragment.parent.mkdir(parents=True, exist_ok=True)
    args.fragment.write_text(fragment, encoding="utf-8")
    args.preview.write_text(
        make_preview(fragment, "健年刊读 V0.13", args.preview_template),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
