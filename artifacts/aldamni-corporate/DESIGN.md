# Design System

## Direction

Polished regional corporate identity: precise, calm, and grounded in the company's actual product
and operations photography. Keep the established forest-green, warm-ivory, and copper palette;
improve hierarchy, spacing, and legibility without changing company facts or adding promotional
claims.

## Color

| Token | Value | Use |
| --- | --- | --- |
| `--ink-green` | `#19352e` | Main dark surface and primary text |
| `--deep-green` | `#172e29` | Hero and high-contrast feature surfaces |
| `--warm-ivory` | `#f6f3eb` | Main page background |
| `--soft-sand` | `#e9e5da` | Company overview surface |
| `--copper` | `#a76844` | Accent, active states, and small decorative rules |
| `--copper-light` | `#d5a274` | Accent on dark surfaces |
| `--text-muted` | `#52635c` | Supporting copy; maintain AA contrast |
| `--line` | `#d4d0c4` | Light-surface dividers |
| `--light-text` | `#f4f1e8` | Text on dark surfaces |

Use copper as a restrained accent, not for small body copy unless contrast is verified. Keep
interactive text at readable sizes and test every foreground/background pairing for WCAG AA.

## Typography

- English display: Manrope, 500–700.
- English body: DM Sans, 400–600.
- Arabic: Noto Sans Arabic, 400–700, with generous line-height.
- Body copy: 15–17px, line-height 1.7–1.9.
- Section headings: fluid 36–60px on desktop; 30–44px on mobile.
- Product titles: 18–22px.
- Interactive labels: at least 12px, with 44px minimum touch height where practical.
- Use logical alignment and spacing properties; set `lang` and `dir` for Arabic.

## Spacing and Layout

- Center content in a fluid container capped around 1,290px.
- Use 18–36px mobile gutters and 36px desktop gutters.
- Section padding: approximately 72–108px desktop and 56–76px mobile.
- Keep related copy groups compact; allow at least 24px between distinct content groups.
- Let product imagery carry visual weight, with consistent crop behavior and no overlapping
  labels.
- Header contains the bilingual company name as text, About and Contact links, and the language
  switch; no logo image in the header.
- The master logo appears as a single brand card in the product showcase, not as a repeated stamp
  on each product card.

## Components

- Buttons and inquiry controls use the same border, type scale, focus treatment, and interaction
  feedback across sections.
- Inquiry options remain direct links to the Kuwait WhatsApp, Syria WhatsApp, and email destinations
  with the existing prefilled professional text.
- Product cards remain image-led and display their category title and supporting label without
  clipping at mobile widths.
- The showcase may auto-scroll, but exposes an accessible pause/resume control and stops for
  reduced-motion preferences.

## Motion

- Keep motion short and functional: approximately 150–250ms for controls and menu changes.
- The product showcase loop remains continuous at a measured speed; users can pause or resume it.
- Disable continuous motion under `prefers-reduced-motion: reduce`.
- No scroll-linked or parallax effects.

## Accessibility

- Preserve semantic landmarks, a single page-level `h1`, descriptive image alternatives, and
  visible keyboard focus.
- Maintain WCAG AA text contrast, especially for muted copy and copper accents.
- Use 44px target heights for primary interactive controls where layout allows.
- Keep Arabic text direction correct while isolating phone numbers, email addresses, and mixed
  Latin/Arabic strings with appropriate bidi handling.
