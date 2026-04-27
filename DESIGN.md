# Namou Design

## Color

OKLCH-driven, single accent, tinted neutrals. No `#000` or `#fff` as raw values.

| Token | Hex | OKLCH | Role |
|---|---|---|---|
| `--bg` | `#FFFFFF` | `oklch(100% 0 0)` | Page background — keep pure white only on body, every panel/surface uses tinted neutral |
| `--bg-alt` | `#F5F5F5` | `oklch(96.1% 0 0)` | Section backgrounds, card surfaces |
| `--ink` | `#121212` | `oklch(13.5% 0 0)` | Primary type, headings |
| `--ink-soft` | `#3A3A3A` | `oklch(33% 0 0)` | Secondary type, body in dim contexts |
| `--rule` | `#E2E2E2` | `oklch(89% 0 0)` | Hairlines, dividers |
| `--accent` | `#00B073` | `oklch(67% 0.158 160)` | Single brand accent — buttons, links, marks, one stat per section |
| `--accent-deep` | `#003D2E` | `oklch(28% 0.054 160)` | Structural anchor — nav, footer, accent panels, contrast surfaces |

**Strategy: Restrained.** Tinted neutrals + one accent ≤10% of any view. Never both `--accent` and `--accent-deep` on the same component as decoration; pick one role per surface.

## Typography

**Stack.**
- Display + body: `"DM Sans", system-ui, sans-serif` — variable weight 400/500/600/700.
- Accent: `"Instrument Serif", Georgia, serif` — italic, used for **one phrase per page maximum**.
- Numerals (rare, only for sourced stats): `"DM Mono", ui-monospace, monospace`.

**Body never uses monospace.** Monospace is reserved for: data labels in stat blocks, code-like values (sqft, AED). Never paragraphs.

**Scale.**
- Base: `16px` (do not override `html { font-size }`)
- Body: `1rem / 1.55`
- Small: `0.875rem`
- Eyebrow / label: `0.75rem`, letter-spacing `0.08em`, uppercase
- H3: `clamp(1.25rem, 1.5vw, 1.5rem) / 1.25`
- H2: `clamp(1.875rem, 3vw, 2.5rem) / 1.15`
- H1 / display: `clamp(2.5rem, 6vw, 5rem) / 1.05`, weight 600

**Italic-serif rule.** One `<span class="serif">` per page, on a single noun or phrase that is the page's emotional center. Common targets: "Ras Al Khaimah" on home, "your land" on sell, "every side of the deal" on a hero. Never on body copy. Never on CTAs. Audit by grepping each page — if `class="serif"` appears more than once, remove all but one.

## Layout

- Container: max 1200px, side padding `clamp(20px, 4vw, 40px)`.
- Section vertical rhythm: `clamp(72px, 10vw, 144px)` top/bottom — vary, don't lock to a single value.
- Grid: 12-col when needed, but most sections use flex with `space-evenly` for natural distribution.
- **Bleed pattern.** Use `width: 100vw; margin-left: calc(50% - 50vw)` (NOT `position: relative + transform`). Body must not have `overflow-x: hidden` when bleeding — clip on the bleeding container instead.
- **No nested cards.** A card with another card inside is always wrong. Flatten.
- **No identical card grids.** If a section has 3+ cards with same shape, they need at least one differentiator (size, asymmetric placement, varied content density).

## Components

**Button.** Solid `--accent` background, white text, `padding: 14px 22px`, `border-radius: 999px`, weight 600, no shadow, no gradient. Hover: darken accent 6% via `oklch(60% 0.158 160)`. Focus: 2px outline `--accent-deep` offset 2px.

**Nav.** Pill, `--accent-deep` background, white text, fixed top with `top: 16px`, `border-radius: 999px`, side padding `24px`. Mobile collapses to a single button revealing a sheet from top.

**Card.** No `border-left` accent stripes. No glassmorphism. Background: `--bg-alt` or `--bg` with full `1px solid --rule` border. Padding: `clamp(20px, 3vw, 32px)`. Heading uses display weight 600.

**Filter bar (Buy page).**
- Inputs are pill-shaped (`border-radius: 999px`), 1px `--rule` border, focus: `--accent` border + 2px outline.
- Min/Max validation: when min > max, both fields show `--rule` → red border + inline message "Min can't exceed max".
- Active filters render below as removable chips (`× Type: Plot`, `× Area: Al Marjan`).
- "Clear all" link, right-aligned, only renders when ≥1 filter is active.
- Empty state: when no plots match, show 3 alternative plots ("Closest matches") plus a "Clear filters" button.

**Stat block.** Number large (DM Sans 500, `clamp(2.5rem, 5vw, 4rem)`), label small below in eyebrow style. Source citation in `--ink-soft` `0.75rem` directly under label, never as a tooltip.

**Leader card (Sell page).** Real photo, not initials. Square, `--rule` border, `border-radius: 12px`. Name + role + one-line credentials. Below: phone CTA (`tel:`) AND schedule-a-video-call CTA, side by side, primary = video call.

## Motion

- Ease: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart) — default for all transitions.
- Durations: 200ms (interactions), 400ms (section reveals), 600ms (heroes).
- Never animate `width`, `height`, `top`, `left`. Use `transform` and `opacity`.
- No bounce, no elastic, no spring. Restrained, decisive movement.
- Reveal section scrubs with `IntersectionObserver`, not scroll listeners.

## Surface backgrounds

- Hero (`/`): site-plan line drawing, `--bg`, charcoal lines. No photographs.
- Buy: clean white, photographs only inside cards (plot photos when available).
- Sell: white + `--bg-alt` panels. One photograph: leader portrait.
- JV: editorial. The corniche photograph anchors the hero — no overlay tints, the photo speaks.
- Broker: white + deck screenshots in a 6-tile grid.

## Anti-patterns to never reintroduce

- `body { font-family: monospace }`
- `html { font-size: 24px }` or any other root-scale override
- Dark theme variants
- Italic-serif on more than one phrase per page
- "Back to v1" / "v2" footer links
- Dynamic Island / iPhone notch decorations as primary chrome (one mockup OK, never as page furniture)
- "Book my video call" / "Book a listing call" / "Book a JV video call" / any CTA verb other than "Schedule a video call"
