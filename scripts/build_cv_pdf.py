from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "cv"
OUTPUT_PATH = OUTPUT_DIR / "Sergey_Senchenko_CV_ATS.pdf"

EDUCATION_INSTITUTION = "Tallinn Polytechnic School (Tallinna Polütehnikum)"
EDUCATION_PROGRAM = "IT Specialist"
EDUCATION_YEARS = ""  # set to e.g. "2018-2021" to show years

INK = colors.HexColor("#1C1F20")
MUTED = colors.HexColor("#5E6565")
ACCENT = colors.HexColor("#9D1C1C")
LINE = colors.HexColor("#D7DBDA")


def register_fonts():
    windows_fonts = Path("C:/Windows/Fonts")
    regular = windows_fonts / "calibri.ttf"
    bold = windows_fonts / "calibrib.ttf"
    italic = windows_fonts / "calibrii.ttf"
    if regular.exists() and bold.exists() and italic.exists():
        pdfmetrics.registerFont(TTFont("CVRegular", str(regular)))
        pdfmetrics.registerFont(TTFont("CVBold", str(bold)))
        pdfmetrics.registerFont(TTFont("CVItalic", str(italic)))
        return "CVRegular", "CVBold", "CVItalic"
    return "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"


REGULAR, BOLD, ITALIC = register_fonts()


def footer(canvas, document):
    canvas.saveState()
    canvas.setFont(REGULAR, 7.2)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(
        letter[0] / 2,
        0.35 * inch,
        "Portfolio source code remains private; a technical walkthrough is available during recruitment.",
    )
    canvas.restoreState()


def build_pdf():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=letter,
        leftMargin=0.78 * inch,
        rightMargin=0.78 * inch,
        topMargin=0.66 * inch,
        bottomMargin=0.66 * inch,
        title="Sergey Senchenko - Technical Designer CV",
        author="Sergey Senchenko",
        subject="Technical Designer, Gameplay Scripter, and Level Designer",
    )

    styles = getSampleStyleSheet()
    name_style = ParagraphStyle(
        "Name",
        parent=styles["Normal"],
        fontName=BOLD,
        fontSize=23,
        leading=24,
        textColor=INK,
        spaceAfter=1,
    )
    role_style = ParagraphStyle(
        "Role",
        parent=styles["Normal"],
        fontName=BOLD,
        fontSize=11.2,
        leading=13,
        textColor=ACCENT,
        spaceAfter=4,
    )
    contact_style = ParagraphStyle(
        "Contact",
        parent=styles["Normal"],
        fontName=REGULAR,
        fontSize=9.1,
        leading=11,
        textColor=MUTED,
        spaceAfter=5,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading1"],
        fontName=BOLD,
        fontSize=11.1,
        leading=12.5,
        textColor=ACCENT,
        spaceBefore=8,
        spaceAfter=3.5,
        keepWithNext=True,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName=REGULAR,
        fontSize=9.6,
        leading=11.6,
        textColor=INK,
        spaceAfter=2,
    )
    role_heading_style = ParagraphStyle(
        "RoleHeading",
        parent=styles["Normal"],
        fontName=BOLD,
        fontSize=10.3,
        leading=11.6,
        textColor=INK,
        spaceAfter=0,
        keepWithNext=True,
    )
    metadata_style = ParagraphStyle(
        "Metadata",
        parent=styles["Normal"],
        fontName=ITALIC,
        fontSize=8.8,
        leading=10,
        textColor=MUTED,
        spaceAfter=2.5,
        keepWithNext=True,
    )
    bullet_style = ParagraphStyle(
        "Bullet",
        parent=body_style,
        fontName=REGULAR,
        fontSize=9.25,
        leading=11.0,
        leftIndent=0,
        firstLineIndent=0,
        spaceAfter=2,
    )
    impact_style = ParagraphStyle(
        "Impact",
        parent=body_style,
        fontName=BOLD,
        fontSize=9.0,
        leading=10.8,
        textColor=INK,
        spaceBefore=2,
        spaceAfter=1,
    )
    skill_style = ParagraphStyle(
        "Skill",
        parent=body_style,
        fontName=REGULAR,
        fontSize=9.3,
        leading=11.0,
        spaceAfter=2,
    )

    story = [
        Paragraph("SERGEY SENCHENKO", name_style),
        Paragraph("Technical Designer | Gameplay Scripter | Level Designer", role_style),
        Paragraph(
            'Tallinn, Estonia | Open to remote opportunities | '
            '<link href="mailto:SergeyJuze@gmail.com" color="#6B1D1D">SergeyJuze@gmail.com</link><br/>'
            'Portfolio: <link href="https://juze1234.github.io/" color="#6B1D1D">juze1234.github.io</link> | '
            'LinkedIn: <link href="https://www.linkedin.com/in/sergey-senchenko-951aa837b/" color="#6B1D1D">linkedin.com/in/sergey-senchenko-951aa837b</link> | '
            'GitHub: <link href="https://github.com/Juze1234" color="#6B1D1D">github.com/Juze1234</link> | '
            'Project videos: <link href="https://www.youtube.com/@MetroWARrpOFF" color="#6B1D1D">youtube.com/@MetroWARrpOFF</link>',
            contact_style,
        ),
        HRFlowable(width="100%", thickness=1.2, color=ACCENT, spaceBefore=0, spaceAfter=4),
        Paragraph("PROFESSIONAL SUMMARY", section_style),
        Paragraph(
            "Technical designer and gameplay scripter with two years of hands-on experience leading development "
            "of a multiplayer DayZ project. Experience includes Enforce Script, server-authoritative gameplay systems, "
            "data-driven player customization, persistent identity and progression, level design, asset integration, "
            "and end-to-end QA. Comfortable owning features from concept through implementation, testing, and "
            "player-facing iteration.",
            body_style,
        ),
        Paragraph("EXPERIENCE", section_style),
        Paragraph("Lead Developer / Technical Designer - Metro W.A.R. RP", role_heading_style),
        Paragraph("Independent DayZ project | 2024-Present | Two-person team", metadata_style),
    ]

    bullets = [
        "Lead development across gameplay scripting, technical design, model integration, game design, multiplayer economy, and QA; collaborate with a second developer focused primarily on world and map production.",
        "Designed and implemented a config-driven player customization and loadout workflow with real-time preview, persistent profile rules, and server-side eligibility validation.",
        "Built synchronized interactive world systems covering power state, switches, lighting, control panels, player feedback, and gated interactions.",
        "Developed persistent player identity, economy, access control, private storage, environmental hazards, and progression-supporting systems.",
        "Extended HypeTrain Core for multiplayer node-based traversal through model integration, simulation tuning, custom rail paths, and automatic alignment.",
        "Contributed level design across underground and surface environments, shaping onboarding, exploration routes, economy touchpoints, atmosphere, and encounter flow.",
        "Own hands-on QA alongside development: reproduce issues, trace client-server failures, validate configuration edge cases, and iterate systems through multiplayer testing and player feedback.",
    ]
    story.append(
        ListFlowable(
            [ListItem(Paragraph(item, bullet_style), leftIndent=0) for item in bullets],
            bulletType="bullet",
            start="circle",
            leftIndent=13.5,
            bulletFontName=BOLD,
            bulletFontSize=5.5,
            bulletColor=ACCENT,
            bulletOffsetY=1.5,
            spaceBefore=0,
            spaceAfter=1,
        )
    )
    story.append(
        Paragraph(
            '<font color="#9D1C1C"><b>PROJECT IMPACT</b></font>  '
            "2 years in development | 900+ community members | Full 80-player server during the latest major test | "
            "Next closed beta in preparation",
            impact_style,
        )
    )
    story.extend(
        [
            Paragraph("SKILLS", section_style),
            Paragraph("<b>Programming:</b> Enforce Script; client-server RPC; data persistence; config-driven systems; debugging", skill_style),
            Paragraph("<b>Game development:</b> Technical design; gameplay systems; multiplayer design; game economy; level design; onboarding; hands-on QA", skill_style),
            Paragraph("<b>Tools:</b> DayZ Tools; Object Builder; Terrain Builder; Blender; Substance Painter; Adobe Photoshop", skill_style),
            Paragraph("EDUCATION", section_style),
            Paragraph(
                f"<b>{EDUCATION_INSTITUTION}</b> - {EDUCATION_PROGRAM}"
                + (f" | {EDUCATION_YEARS}" if EDUCATION_YEARS else ""),
                body_style,
            ),
            Paragraph("LANGUAGES", section_style),
            Paragraph("Russian - Native | English - Professional working proficiency | Estonian - Basic", body_style),
        ]
    )

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUTPUT_PATH)


if __name__ == "__main__":
    build_pdf()
