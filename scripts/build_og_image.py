"""Generate the 1200x630 Open Graph cards used for link previews.

Uses a station frame from the project as the backdrop with the site's accent colour
and typography, so a shared link looks like the site it points at. One card per
language, matching the /en and /ru routes.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "projects" / "metro-war" / "vdnkh" / "platform.jpg"

W, H = 1200, 630
ACCENT = (226, 74, 52)
INK = (9, 11, 12)
FONTS = Path("C:/Windows/Fonts")

CARDS = {
    "og-image.jpg": {
        "kicker": "SERGEY",
        "name": "SENCHENKO",
        "roles": "TECHNICAL DESIGNER  ·  GAMEPLAY SCRIPTER  ·  LEVEL DESIGNER",
        "tagline": "Gameplay systems — from concept to implementation.",
        "footer": "METRO W.A.R. RP  ·  DAYZ  ·  2 YEARS IN DEVELOPMENT",
        "name_size": 84,
        "roles_size": 23,
    },
    "og-image-ru.jpg": {
        "kicker": "СЕРГЕЙ",
        "name": "СЕНЧЕНКО",
        "roles": "ТЕХНИЧЕСКИЙ ДИЗАЙНЕР  ·  ГЕЙМПЛЕЙ  ·  ЛЕВЕЛ-ДИЗАЙН",
        "tagline": "Игровые системы — от концепта до реализации.",
        "footer": "METRO W.A.R. RP  ·  DAYZ  ·  2 ГОДА РАЗРАБОТКИ",
        "name_size": 84,
        "roles_size": 23,
    },
}


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / name), size)


def build(filename: str, card: dict) -> None:
    dest = ROOT / "public" / filename
    with Image.open(SOURCE) as src:
        src = src.convert("RGB")
        scale = max(W / src.width, H / src.height)
        resized = src.resize((round(src.width * scale), round(src.height * scale)), Image.LANCZOS)
        left = (resized.width - W) // 2
        top = (resized.height - H) // 2
        canvas = resized.crop((left, top, left + W, top + H))

    # The type sits on a near-solid panel on the left; the right keeps the scene visible.
    # A light wash covers the whole card so both halves read as one image.
    solid_until, fade_until, floor = 0.50, 0.80, 0.42
    mask = Image.new("L", (W, 1))
    for x in range(W):
        pos = x / W
        if pos <= solid_until:
            alpha = 0.95
        elif pos >= fade_until:
            alpha = floor
        else:
            ratio = (pos - solid_until) / (fade_until - solid_until)
            alpha = 0.95 - (0.95 - floor) * (ratio * ratio * (3 - 2 * ratio))
        mask.putpixel((x, 0), int(alpha * 255))
    canvas = Image.composite(Image.new("RGB", (W, H), INK), canvas, mask.resize((W, H)))

    draw = ImageDraw.Draw(canvas)
    draw.rectangle([72, 168, 158, 173], fill=ACCENT)
    draw.text((72, 205), card["kicker"], font=font("seguisb.ttf", 30), fill=(150, 156, 155))
    draw.text((70, 240), card["name"], font=font("segoeuib.ttf", card["name_size"]), fill=(247, 246, 242))
    draw.text((72, 348), card["roles"], font=font("seguisb.ttf", card["roles_size"]), fill=ACCENT)
    draw.text((72, 404), card["tagline"], font=font("segoeui.ttf", 27), fill=(190, 195, 194))
    draw.line([(72, 500), (W - 72, 500)], fill=(70, 76, 78), width=1)
    draw.text((72, 522), card["footer"], font=font("seguisb.ttf", 19), fill=(140, 146, 145))
    draw.text((W - 72, 522), "JUZE1234.GITHUB.IO", font=font("seguisb.ttf", 19), fill=(140, 146, 145), anchor="ra")

    canvas.save(dest, "JPEG", quality=90, optimize=True, progressive=True)
    print(f"{dest.name}  {dest.stat().st_size / 1024:.0f} KB  {W}x{H}")


if __name__ == "__main__":
    for filename, card in CARDS.items():
        build(filename, card)
