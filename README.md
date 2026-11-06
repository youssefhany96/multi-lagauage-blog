# Multilingual Blog

A bilingual English/Arabic blog on the Next.js App Router, with locale-based routing
and standards-based language negotiation.

## What it does

- Every route is namespaced under a locale segment: `/en/...` and `/ar/...`
- A visitor arriving without a locale is redirected to their best match, negotiated
  from the `Accept-Language` header
- Per-locale posts, categories and tags
- Search, and a language switcher

## Stack

Next.js App Router, TypeScript, Tailwind CSS, `@formatjs/intl-localematcher` and
`negotiator` for locale matching.

## Running locally

```bash
npm install
npm run dev    # http://localhost:3000
npm run build

Technical decisions

The locale lives in the URL, not in a cookie or a store

Pages sit under src/app/[lang]/, so the language is a route parameter. Every page
renders for a language that's known before rendering starts, each language has its
own shareable URL, and nothing has to read client state to decide what to display.
A cookie-based approach gives one URL two meanings depending on who opens it.

Negotiation is standards-based, not a guess

src/middleware.ts parses the full Accept-Language header with negotiator and
matches it against the supported locales using @formatjs/intl-localematcher,
falling back to the configured default. That handles weighted preferences and
regional variants — ar-EG matching ar — rather than reading the first header
value and hoping.

Supported locales are declared once, in i18.config.ts, and the Locale type is
derived from that array. Adding a language is a one-line change that the type system
then enforces everywhere.

Content is per-locale, not a key-value translation table

posts_en.json and posts_ar.json hold complete articles rather than translated
strings. UI labels and editorial content are different problems: a translated
article can have a different structure, a different set of sections, or no
counterpart at all. Forcing them through one key-value mechanism makes both awkward.

Assumptions and limitations

- Content is local JSON, not a CMS. The data layer in src/lib/api.ts is the
  seam where a real content source would be swapped in.
- Two locales. The configuration generalises; the content doesn't yet.
- No pagination on the post list.
