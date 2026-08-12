from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "cv"
OUTPUT_PATH = OUTPUT_DIR / "Sergey_Senchenko_CV.pdf"

PAGE_W, PAGE_H = letter
SIDEBAR_W = 168

EDUCATION_INSTITUTION = "Tallinn Polytechnic School"
EDUCATION_PROGRAM = "IT Specialist"
EDUCATION_YEARS = ""  # set to e.g. "2018-2021" to show years

PAPER = colors.HexColor("#F3F1EC")
PAPER_DARK = colors.HexColor("#E6E2DA")
INK = colors.HexColor("#141819")
SIDEBAR = colors.HexColor("#111516")
SIDEBAR_SOFT = colors.HexColor("#A7ADAB")
WHITE = colors.HexColor("#F7F6F2")
ACCENT = colors.HexColor("#D74338")
MUTED = colors.HexColor("#68706E")
LINE = colors.HexColor("#CBC7BE")


def register_fonts():
    font_dir = Path("C:/Windows/Fonts")
    pdfmetrics.registerFont(TTFont("Segoe", str(font_dir / "segoeui.ttf")))
    pdfmetrics.registerFont(TTFont("SegoeSemi", str(font_dir / "seguisb.ttf")))
    pdfmetrics.registerFont(TTFont("SegoeBold", str(font_dir / "segoeuib.ttf")))
    pdfmetrics.registerFont(TTFont("SegoeLight", str(font_dir / "segoeuil.ttf")))


register_fonts()


def fit_lines(text, width, font_name, font_size):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = word if not current else current + " " + word
        if pdfmetrics.stringWidth(candidate, font_name, font_size) <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c, text, x, y, width, font="Segoe", size=8.6, leading=11, color=INK, max_lines=None):
    lines = fit_lines(text, width, font, size)
    if max_lines is not None:
        lines = lines[:max_lines]
    c.setFont(font, size)
    c.setFillColor(color)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_tracking(c, text, x, y, font="SegoeSemi", size=7.3, color=MUTED, char_space=1.1):
    obj = c.beginText(x, y)
    obj.setFont(font, size)
    obj.setFillColor(color)
    obj.setCharSpace(char_space)
    obj.textLine(text)
    c.drawText(obj)
    # Character spacing is a persistent PDF text-state value. Reset it so
    # tracked labels do not affect body copy drawn afterwards.
    reset = c.beginText(0, 0)
    reset.setCharSpace(0)
    c.drawText(reset)


def draw_main_heading(c, label, y):
    x = SIDEBAR_W + 27
    draw_tracking(c, label.upper(), x, y, font="SegoeBold", size=7.5, color=ACCENT, char_space=1.25)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.55)
    c.line(x + 112, y + 2.2, PAGE_W - 28, y + 2.2)
    return y - 18


def draw_sidebar_heading(c, label, y):
    draw_tracking(c, label.upper(), 23, y, font="SegoeBold", size=7.1, color=ACCENT, char_space=1.35)
    c.setStrokeColor(colors.HexColor("#353A3A"))
    c.setLineWidth(0.55)
    c.line(23, y - 7, SIDEBAR_W - 22, y - 7)
    return y - 23


def draw_sidebar_pair(c, label, value, y, value_color=WHITE):
    c.setFont("Segoe", 6.5)
    c.setFillColor(SIDEBAR_SOFT)
    c.drawString(23, y, label.upper())
    c.setFont("SegoeSemi", 8.2)
    c.setFillColor(value_color)
    c.drawString(23, y - 12, value)
    return y - 30


def draw_metric(c, x, y, width, number, label):
    c.setFillColor(PAPER_DARK)
    c.roundRect(x, y, width, 44, 2, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    c.rect(x, y, 3, 44, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("SegoeBold", 16)
    c.drawString(x + 11, y + 20, number)
    draw_tracking(c, label.upper(), x + 11, y + 9, font="SegoeSemi", size=5.7, color=MUTED, char_space=0.7)


def draw_bullet(c, text, x, y, width):
    c.setFillColor(ACCENT)
    c.rect(x, y - 3, 3.5, 3.5, fill=1, stroke=0)
    return draw_wrapped(c, text, x + 11, y, width - 11, font="Segoe", size=8.2, leading=10.2, color=INK) - 3


def draw_system_row(c, number, title, description, x, y, width):
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.line(x, y + 6, x + width, y + 6)
    c.setFont("SegoeBold", 8.2)
    c.setFillColor(ACCENT)
    c.drawString(x, y - 8, number)
    c.setFont("SegoeSemi", 9.1)
    c.setFillColor(INK)
    c.drawString(x + 28, y - 8, title)
    end_y = draw_wrapped(c, description, x + 28, y - 20, width - 28, font="Segoe", size=7.5, leading=9.2, color=MUTED)
    return end_y - 1


def draw_method_card(c, number, title, description, x, y, width):
    c.setFillColor(PAPER_DARK)
    c.roundRect(x, y, width, 46, 2, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    c.setFont("SegoeBold", 7.2)
    c.drawString(x + 11, y + 31, number)
    c.setFillColor(INK)
    c.setFont("SegoeSemi", 8.6)
    c.drawString(x + 11, y + 18, title)
    draw_wrapped(c, description, x + 11, y + 7, width - 22, font="Segoe", size=6.4, leading=7.6, color=MUTED, max_lines=2)


def add_link(c, text, url, x, y, font="SegoeSemi", size=8.2, color=WHITE):
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString(x, y, text)
    width = pdfmetrics.stringWidth(text, font, size)
    c.linkURL(url, (x, y - 2, x + width, y + size + 1), relative=0)


def build_pdf():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(
        str(OUTPUT_PATH),
        pagesize=letter,
        pageCompression=1,
    )
    c.setTitle("Sergey Senchenko - Technical Designer CV")
    c.setAuthor("Sergey Senchenko")
    c.setSubject("Technical Designer, Gameplay Scripter, and Level Designer portfolio CV")

    # Page foundation.
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(SIDEBAR)
    c.rect(0, 0, SIDEBAR_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    c.rect(0, PAGE_H - 9, SIDEBAR_W, 9, fill=1, stroke=0)

    # Sidebar identity mark.
    c.setStrokeColor(ACCENT)
    c.setLineWidth(1.4)
    c.rect(23, PAGE_H - 91, 48, 48, fill=0, stroke=1)
    c.setFillColor(WHITE)
    c.setFont("SegoeBold", 18)
    c.drawCentredString(47, PAGE_H - 74, "SS")
    draw_tracking(c, "PORTFOLIO CV / 2026", 23, PAGE_H - 113, font="SegoeSemi", size=6.3, color=SIDEBAR_SOFT, char_space=1.0)

    # Sidebar details.
    sy = PAGE_H - 151
    sy = draw_sidebar_heading(c, "Contact", sy)
    sy = draw_sidebar_pair(c, "Location", "Tallinn, Estonia", sy)
    contact_links = [
        ("EMAIL", "SergeyJuze@gmail.com", "mailto:SergeyJuze@gmail.com"),
        ("PORTFOLIO", "juze1234.github.io", "https://juze1234.github.io/"),
        ("LINKEDIN", "LinkedIn profile", "https://www.linkedin.com/in/sergey-senchenko-951aa837b/"),
        ("GITHUB", "github.com/Juze1234", "https://github.com/Juze1234"),
        ("PROJECT FOOTAGE", "Metro W.A.R. channel", "https://www.youtube.com/@MetroWARrpOFF"),
    ]
    for label, text, url in contact_links:
        c.setFont("Segoe", 6.5)
        c.setFillColor(SIDEBAR_SOFT)
        c.drawString(23, sy, label)
        add_link(c, text, url, 23, sy - 12)
        sy -= 26

    sy -= 8
    sy = draw_sidebar_heading(c, "Core stack", sy)
    core_items = [
        "Enforce Script",
        "Client-server RPC",
        "Persistent data",
        "Config-driven systems",
        "Multiplayer debugging",
        "Hands-on QA",
    ]
    c.setFont("Segoe", 8.0)
    for item in core_items:
        c.setFillColor(ACCENT)
        c.rect(23, sy - 2, 3, 3, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.drawString(34, sy, item)
        sy -= 16

    sy -= 7
    sy = draw_sidebar_heading(c, "Tools", sy)
    tools = ["DayZ Tools", "Object Builder", "Terrain Builder", "Blender", "Substance Painter", "Adobe Photoshop"]
    c.setFont("Segoe", 8.0)
    c.setFillColor(WHITE)
    for tool in tools:
        c.drawString(23, sy, tool)
        sy -= 15

    sy -= 8
    sy = draw_sidebar_heading(c, "Languages", sy)
    sy = draw_sidebar_pair(c, "Russian", "Native", sy)
    sy = draw_sidebar_pair(c, "English", "Professional", sy)
    sy = draw_sidebar_pair(c, "Estonian", "Basic", sy)

    c.setFillColor(colors.HexColor("#252A2A"))
    c.rect(23, 33, SIDEBAR_W - 45, 52, fill=1, stroke=0)
    draw_tracking(c, "SOURCE POLICY", 33, 70, font="SegoeBold", size=5.9, color=ACCENT, char_space=1.0)
    draw_wrapped(c, "Full source stays private. Technical walkthrough available during recruitment.", 33, 58, SIDEBAR_W - 65, font="Segoe", size=6.5, leading=8.2, color=SIDEBAR_SOFT)

    # Main masthead.
    mx = SIDEBAR_W + 27
    mw = PAGE_W - mx - 28
    draw_tracking(c, "SERGEY", mx, PAGE_H - 54, font="SegoeSemi", size=9, color=MUTED, char_space=2.8)
    c.setFont("SegoeBold", 29)
    c.setFillColor(INK)
    c.drawString(mx, PAGE_H - 88, "SENCHENKO")
    c.setFillColor(ACCENT)
    c.rect(mx, PAGE_H - 108, 34, 3, fill=1, stroke=0)
    draw_tracking(
        c,
        "TECHNICAL DESIGN / GAMEPLAY SCRIPTING / LEVEL DESIGN",
        mx + 45,
        PAGE_H - 111,
        font="SegoeSemi",
        size=6.6,
        color=INK,
        char_space=0.55,
    )

    y = PAGE_H - 145
    y = draw_main_heading(c, "Profile", y)
    y = draw_wrapped(
        c,
        "Technical designer and gameplay scripter with seven years building multiplayer gameplay systems on DayZ. The last two spent leading a project end to end: Enforce Script, server-authoritative logic, data-driven customization, progression and economy, level design, asset integration, and QA. Comfortable taking a feature from concept through implementation, testing, and iteration.",
        mx,
        y,
        mw,
        font="Segoe",
        size=8.5,
        leading=10.7,
        color=INK,
    )

    y -= 8
    metric_gap = 7
    metric_w = (mw - metric_gap * 3) / 4
    metric_y = y - 43
    for index, metric in enumerate(
        [("07", "Years dev"), ("900+", "Community"), ("80", "CCU test"), ("02", "Team")]
    ):
        draw_metric(c, mx + index * (metric_w + metric_gap), metric_y, metric_w, metric[0], metric[1])
    y = metric_y - 20

    y = draw_main_heading(c, "Experience", y)
    c.setFont("SegoeBold", 13.2)
    c.setFillColor(INK)
    c.drawString(mx, y, "Lead Developer / Technical Designer")
    c.setFont("SegoeSemi", 8.2)
    c.setFillColor(ACCENT)
    c.drawRightString(PAGE_W - 28, y + 1, "2024 - PRESENT")
    y -= 14
    c.setFont("Segoe", 8.2)
    c.setFillColor(MUTED)
    c.drawString(mx, y, "Metro W.A.R. RP  |  Independent DayZ project  |  Two-person team")
    y -= 18
    experience = [
        "Lead gameplay scripting, technical design, model integration, server economy, and QA; collaborate with a second developer focused mainly on world and map production.",
        "Design reusable, data-driven gameplay systems spanning customization, identity, permissions, world state, and multiplayer feedback.",
        "Shape onboarding and exploration across underground and surface environments, connecting player flow, economy, traversal, hazards, and atmosphere.",
        "Reproduce issues across client-server flows, harden edge cases, and iterate systems through multiplayer playtests and player feedback.",
    ]
    for item in experience:
        y = draw_bullet(c, item, mx, y, mw)

    y -= 7
    c.setFont("SegoeBold", 11)
    c.setFillColor(INK)
    c.drawString(mx, y, "Gameplay Scripter")
    c.setFont("SegoeSemi", 8.2)
    c.setFillColor(ACCENT)
    c.drawRightString(PAGE_W - 28, y + 1, "2019 - 2024")
    y -= 13
    c.setFont("Segoe", 8.2)
    c.setFillColor(MUTED)
    c.drawString(mx, y, "S.T.A.L.K.E.R. RP  |  Independent DayZ project")
    y -= 17
    y = draw_bullet(
        c,
        "Owned the gameplay scripting for a persistent roleplay server: 300+ community members and a full 80-player server before the project was wound down.",
        mx,
        y,
        mw,
    )

    y -= 3
    y = draw_main_heading(c, "Core capabilities", y)
    system_rows = [
        ("01", "Gameplay systems & UI", "Config-driven player customization, real-time preview, persistent profile rules, and server-side validation."),
        ("02", "Multiplayer architecture", "Server-authoritative world state, synchronized interactions, permissions, and player-facing feedback."),
        ("03", "Progression & economy", "Persistent identity, trading, access control, private storage, and long-term player progression."),
        ("04", "World & level design", "Onboarding, exploration routes, traversal, environmental hazards, atmosphere, and encounter flow."),
    ]
    for row in system_rows:
        y = draw_system_row(c, row[0], row[1], row[2], mx, y, mw)

    y -= 6
    y = draw_main_heading(c, "Delivery loop", y)
    method_gap = 7
    method_w = (mw - method_gap * 2) / 3
    method_y = y - 45
    methods = [
        ("01", "DESIGN", "Player goals, rules, flows"),
        ("02", "BUILD", "Server-authoritative systems"),
        ("03", "TEST", "Reproduce, verify, iterate"),
    ]
    for index, method in enumerate(methods):
        draw_method_card(c, method[0], method[1], method[2], mx + index * (method_w + method_gap), method_y, method_w)
    y = method_y - 22

    y = draw_main_heading(c, "Education", y)
    c.setFont("SegoeBold", 9.6)
    c.setFillColor(INK)
    c.drawString(mx, y, EDUCATION_INSTITUTION)
    if EDUCATION_YEARS:
        c.setFont("SegoeSemi", 8.2)
        c.setFillColor(ACCENT)
        c.drawRightString(PAGE_W - 28, y + 1, EDUCATION_YEARS)
    c.setFont("Segoe", 8.2)
    c.setFillColor(MUTED)
    c.drawString(mx, y - 13, EDUCATION_PROGRAM)

    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.line(mx, 39, PAGE_W - 28, 39)
    c.setFont("Segoe", 6.8)
    c.setFillColor(MUTED)
    c.drawString(mx, 27, "Technical design / gameplay scripting / level design")
    c.setFont("SegoeSemi", 6.8)
    c.setFillColor(ACCENT)
    c.drawRightString(PAGE_W - 28, 27, "TALLINN / REMOTE")

    c.showPage()
    c.save()
    print(OUTPUT_PATH)


if __name__ == "__main__":
    build_pdf()
