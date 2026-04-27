---
register: brand
---

# Namou Properties

## Product Purpose

Namou is a Ras Al Khaimah, UAE real-estate operator that runs four motions on one site: international buyers (Buy), local landowners selling or partnering on plots (Sell), JV investors backing development plays (Invest), and brokers running clients through Namou's deck (Brokers). Every motion converges on one outcome: a scheduled video call with the founding team. The site is the funnel; the call is the conversion.

The business sells trust, location intelligence, and execution. It does not sell listings. Visitors are not browsing inventory — they are evaluating an operator. The site has to read like an operator who knows the ground, not like a marketplace.

## Users

**International buyer.** Lives outside the UAE, has heard "Wynn Al Marjan" or "Ras Al Khaimah growth story", wants to understand the market, the plots Namou represents, and whether Namou is worth a call. Lands on `/featured-property`. Reads filters as a way to triangulate price-per-sqft and area, not as a search tool. Will abandon if the page looks like every other off-plan site.

**RAK landowner.** Owns land in RAK, considering listing exclusively or non-exclusively. Lands on `/landowner`. Compares Namou's exclusive vs non-exclusive offer. Trust signal: the leader photo, the named founder, the local references. Will not call if the page feels like a lead form.

**JV investor.** Family office, regional developer, capital partner. Lands on `/jv`. Wants to see deal sizes, IRR ranges, the three plays (Sell-Out / Income / Hospitality), and proof Namou has run them before. Will judge the page by how specific the numbers are.

**Broker.** Runs international clients. Lands on `/broker`. Wants the deck, the commission split, the speed of response. Visual proof of the deck (screenshots) carries more weight than any copy.

## Brand Voice

Editorial, restrained, accent-driven. Sentences are short and confident. The page is mostly quiet, then says one thing loudly. Numbers carry weight; adjectives don't. One serif italic accent per page, on a single phrase that deserves it — never as a decorative tic.

The site speaks like the founder, not like a marketing agency. Direct, slightly understated, occasionally specific in a way that proves local knowledge ("Al Marjan", "Mina Al Arab", "RAK Central" — named, not "prime locations").

## Tone

Confident, low-noise, operator-not-broker. No urgency tactics, no countdown timers, no "limited inventory" language. The CTA is always the same: schedule a video call. One verb, one outcome, one button style across all five pages.

## Anti-References

- **Off-plan listing sites with aerial drone heros.** Bayut/Property Finder/Damac landing pages — generic skylines, gradient overlays, "Live the dream" hero copy. Namou is not that.
- **Crypto-finance navy + gold + glass.** The "premium" color reflex (navy 900 + gold accents + frosted cards) is exactly what every Dubai property site does. Avoid.
- **Hero-metric SaaS template.** Big number, small label, supporting stats grid. Reads as B2B SaaS, not real estate.
- **Italic-serif everywhere.** One serif italic phrase per page is editorial. Three is a tic. Five is AI slop.
- **Glassmorphism cards.** Backdrop-filter blur as decoration. Banned outside one or two specific high-contrast moments.
- **Generic "schedule a call" CTAs that read as forms.** The CTA must look like a single deliberate moment on the page, not a footer trinket.

## Strategic Principles

1. **One CTA, one verb.** "Schedule a video call." Across every page, every section. No "Book a deck walkthrough" / "Book my video call" / "Book a listing call" — one phrase only.
2. **Numbers earn the page.** If a section has a stat, the stat is sourced (Khaleej Times, PwC, Knight Frank, u.ae). If a stat isn't sourced, it doesn't go on the page.
3. **Local specificity over generic property language.** Named neighborhoods, named projects, named operators. Never "prime locations" or "luxury living".
4. **The page reads, then the page asks.** Information first, CTA last. Each page is a brief, not a pitch.
5. **One accent color carries identity.** `#00B073` (Namou green) is the only saturated color. `#003D2E` (deep green) anchors structural moments — nav, footer, accent panels — not just nav. Tinted neutrals everywhere else.
6. **Editorial typography, not display typography.** DM Sans body, DM Sans display, Instrument Serif italic for one phrase per page max. No monospace body. No 24px base font size.

## Surfaces

- `/` — overview / hero / why RAK / reveal section / lanes / FAQ
- `/featured-property` — Buy: filters + property grid + on-call deck preview
- `/landowner` — Sell: stats, exclusive vs non-exclusive comparison, listing tree, leader card
- `/jv` — Invest: three strategies (Sell-Out / Income / Hospitality), simulator preview, chat mockup
- `/broker` — Brokers: tree, benefits, deck tour grid

A `/v2` route is being built as a critique-remediation pass. Same content, fixed execution: locked CTA copy, DM Sans body, italic-serif rationed, filter UX rebuilt, color drift across surfaces, persona red flags closed.
