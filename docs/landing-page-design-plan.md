# Inview Landing Page: Design and Structure Plan

Status: proposal, nothing built yet. Scope: `apps/landing-page`.

## 1. Design direction

The reference screenshot (a bento-style product page) gives us the pattern to borrow, not the content:

- Big, calm section headings with one line of muted copy underneath.
- Soft rounded panels in a bento layout (mixed sizes, one idea per panel).
- Panels carry a small product mockup, not an icon or stock illustration.
- Lots of white space. Colour comes from the mockups and one accent, not from backgrounds.
- A quiet comparison table as a "proof" element.

We apply the same language to the existing hero (blue `bg-primary` rounded block, white mockup cards).

### Tokens (use what exists, add nothing new)

| Item             | Value                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Accent           | `--primary` (blue, oklch 66.5% 0.182 249.7) from `packages/ui`                                 |
| Page background  | `background` (white)                                                                           |
| Panel background | white card on `muted` (very light grey-blue) sections, alternating                             |
| Radius           | `rounded-2xl` for panels, `rounded-full` for buttons and pills                                 |
| Shadow           | none or a single very soft shadow; borders `border-border` preferred                           |
| Font             | Plus Jakarta Sans (already loaded in `layout.tsx`)                                             |
| Heading scale    | h1 `text-4xl → lg:text-7xl` (hero only), h2 `text-3xl md:text-5xl`, h3 `text-lg font-semibold` |
| Body             | `text-base md:text-lg`, `text-muted-foreground`, `max-w-2xl`, `text-pretty`                    |
| Section spacing  | `py-20 md:py-32`, container `max-w-6xl`, `px-5 sm:px-10` (matches hero)                        |
| Eyebrow label    | small uppercase `text-xs tracking-wide text-primary` above each h2                             |

Rules: one h1 per page, h2 per section, h3 inside cards. Primary button is the only filled blue element in each section. Contrast target is WCAG AA (known issue: white on `--primary` is about 3:1, so on blue backgrounds use only large or bold text, or darken `--primary`).

### Component plan

Shared components in `apps/landing-page/components/`, one file per section, each under about 200 lines:

`SiteHeader`, `HeroSection` (exists), `ProblemSection`, `HowItWorksSection`, `FeaturesSection`, `AudienceSection`, `WaitlistSection`, `FaqSection`, `SiteFooter`, plus small shared pieces: `SectionHeading` (eyebrow, h2, subcopy), `BentoCard`, `ChannelBadge` (Instagram, WhatsApp, Messenger).

Mockups are the existing SVGs in `public/landing-page-mockup/`. Where a section needs a new visual (follow-up queue, draft, order confirmed), build it as small HTML/Tailwind cards, not new heavy SVGs. The current SVGs are 136–205 KB each, so optimise them before reuse.

Anchors for navigation: `#how-it-works`, `#features`, `#faq`, `#waitlist`. The hero buttons currently point at `#get-started` and `#demo`; repoint "Get Started" to `#waitlist`.

## 2. Page flow

1. Header (sticky, exists as nav)
2. Hero
3. Problem
4. How it works
5. Features
6. Who it's for
7. Waitlist
8. FAQ
9. Footer

The story: pain (3), walkthrough (4), what you get (5), is it for me (6), act (7), objections (8). The single call to action everywhere is joining the waitlist.

## 3. Section by section

### 1–2. Header and hero (exists)

- Header: logo, links to How it works, FAQ, and a "Join the waitlist" button.
- Hero: keep the current copy and V-shaped mockup strip. Change "Get Started" to "Join the waitlist" (→ `#waitlist`). "Watch Demo" has no demo behind it; remove it until a video exists, or replace it with a "See how it works" link to `#how-it-works`.

### 3. Problem: "I'll check and get back to you."

Job: make the shop owner recognise their own day in one scroll.

Layout: full-width, light `muted` background, centred narrow column (`max-w-3xl`).

- Eyebrow: "The problem".
- Large quote as the h2: "I'll check and get back to you."
- Story paragraph in three short beats, each its own line or paragraph so it reads like messages arriving: the size question, the WhatsApp delivery question, the Instagram story reply.
- Below: a small stack of three overlapping chat bubbles (Instagram, WhatsApp, Messenger badges) fading in as you scroll, with the first one marked "Waiting on us".
- Closing line in primary colour: the "Inview keeps the stock checks, delivery questions and missing order details... in one place" sentence.

Mobile: same, single column, bubbles stack vertically. No horizontal scroll.

### 4. How it works

Job: show one enquiry's journey in four steps.

Layout: heading "From the first question to a confirmed order." with subcopy "Follow one enquiry as it moves through Inview."

- Desktop: a 4-step vertical timeline on the left (step number, title, copy), and a sticky mockup panel on the right that swaps to the matching visual as each step scrolls into view (the sticky-scroll pattern). Mobile: steps stacked, each with its mockup directly under its text (no sticky).
- Step visuals, taken from the "What to show" column:
  1. The shopper asks: Afthah's Instagram DM with an Instagram label.
  2. Follow-up stays open: queue row "Stock check promised · Waiting on us" next to the original seller reply.
  3. Check, review, reply: "Stock checked by seller" chip above an editable draft with a Send button.
  4. Confirm the order: "Delivery address missing" then "Order confirmed".
- Reuse the existing Queue, Reply and Conversation mockups for steps 2, 3 and 1 where possible; step 4 needs a new small card.

Accessibility: steps are an ordered list (`<ol>`). Do not hide the non-active visuals from screen readers; give each visual its own alt text, and keep the scroll-swap optional (respect `prefers-reduced-motion` by showing all four visuals stacked).

### 5. Features: "Know what's waiting and who's handling it."

Job: four capabilities, scannable in under 10 seconds.

Layout: bento grid, the closest match to the reference image.

- Desktop: 2×2 grid with unequal widths (two wide + two narrow, then flipped on the second row). Each card: white, `rounded-2xl`, border, mockup on top or bottom, h3, short copy.
- Mobile: single column, same order.

| Card                                           | Visual                                                                         |
| ---------------------------------------------- | ------------------------------------------------------------------------------ |
| See the next action in each chat               | Inbox mockup crop showing product, size, delivery preference and open question |
| Hand off a follow-up with the details attached | Queue row with an assignee avatar and the promise attached                     |
| Start with a draft you can edit                | Draft reply with an "Edit" and "Send" state                                    |
| See where work is piling up                    | The existing Report card (copy note says to reuse it from the hero)            |

Use the copy as written; do not shorten the card text.

### 6. Who it's for: "Built for shops that sell through chat."

Job: let the right shops self-select and set honest expectations (Sri Lankan fashion and accessories first).

Layout: two columns on desktop. Left: heading plus the paragraph. Right: three stacked rows, each with an icon-in-a-circle, a bold lead ("Clothing boutiques", "Jewellery and accessories shops", "Small teams sharing replies") and the sentence. Mobile: single column.

Optional: a small "Starting in Sri Lanka" pill above the heading to echo the hero badge.

### 7. Waitlist: "Try Inview with your shop."

Job: the one conversion point. Keep it short and friendly.

Layout: a large blue (`bg-primary`) rounded panel that echoes the hero, with the heading and paragraph on the left and a white form card on the right. Mobile: heading first, form below.

Form (labels visible, not placeholders only):

| Field                           | Control                                                  | Required           |
| ------------------------------- | -------------------------------------------------------- | ------------------ |
| Your name                       | text                                                     | yes                |
| Shop name                       | text                                                     | yes                |
| WhatsApp number                 | `+94` prefix, editable number field                      | yes                |
| Where do customers message you? | checkbox group: Instagram, WhatsApp, Messenger, Other    | yes (at least one) |
| What do you sell?               | select or chips: Clothing, Jewellery, Accessories, Other | yes                |
| Shop link                       | URL, optional                                            | no                 |

- Button: "Join the waitlist". Under it: the WhatsApp-contact note with a Privacy Policy link.
- States: loading (button disabled, spinner), success (replaces the form: "You're on the waitlist..."), error (inline message, form kept filled), per-field validation errors with `aria-describedby`. Success and error messages use `role="status"` / `role="alert"`.

Open decisions before building (these need an owner):

1. Where do submissions go (Supabase table, Google Sheet, email)? Needs a server action or API route, plus spam protection (honeypot or Turnstile) and rate limiting.
2. A Privacy Policy page must exist before launch because we collect phone numbers.
3. Phone validation rules for Sri Lankan numbers (`+94`, 9 digits after the code).

### 8. FAQ

Job: remove the last objections.

Layout: centred `max-w-3xl`, shadcn-style accordion (one item open at a time, keyboard accessible, first item open by default). Six questions as written. Link "Join the waitlist" at the bottom.

Add `FAQPage` JSON-LD from the same data array so the markup and the visible copy cannot drift.

### 9. Footer and search preview

Footer: wordmark "Inview", links (How it works, FAQ, Privacy), the line "The sales inbox for shops that sell through chat.", copyright. Light background, small type.

Metadata in `app/layout.tsx` (or `page.tsx`):

- Title: "Inview | A sales inbox for shops that sell through chat"
- Meta description and Open Graph / Twitter title and description as in the copy.
- Add an Open Graph image (can be a crop of the hero mockups).

## 4. Cross-cutting requirements

- Responsive checks at 320, 768, 1024 and 1440px for every section.
- Motion: subtle fade/translate on scroll using the `motion` package already in `packages/ui`; disabled under `prefers-reduced-motion`. Lenis smooth scroll already exists.
- Performance: only the hero Inview image gets `priority`; below-the-fold images lazy-load with explicit `sizes`; optimise SVGs; no layout shift (images keep aspect ratio).
- Accessibility: skip link, visible focus rings, one h1, ordered headings, alt text, form labels, AA contrast.
- Light theme only for launch; the dark-mode tokens exist but the blue-on-white design has not been checked in dark.

## 5. Copy to confirm before launch

These claims need a quick truth-check by the team:

- "Inview is in development" and "early access": keep this wording everywhere; do not imply it is live.
- Hero says it "puts promising buying enquiries first"; the features copy describes follow-ups, not ranking. Confirm the product ranks enquiries, or soften the hero line.
- Channel names: say "Instagram, WhatsApp and Messenger" consistently (FAQ says "Facebook Messenger").
- The copy sheet says "Use this section for the reporting card from your current hero." That is an instruction, not page copy; do not publish it.
- "We'll share pricing before you decide" is a promise; confirm.

## 6. Suggested build order

1. `SectionHeading`, `BentoCard`, `ChannelBadge`, anchors, header links.
2. Waitlist section and its backend (highest value, most unknowns).
3. Problem, then How it works.
4. Features, Who it's for.
5. FAQ with JSON-LD, footer, metadata and OG image.
6. Polish pass: motion, responsive checks, accessibility check, performance check.

Each step is a small, reviewable change that leaves the page working.
