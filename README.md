# TOM FORD Eyewear — Unofficial Korean Introduction

A single-page Korean introduction (`lang="ko"`) to TOM FORD Eyewear: the optical frames and sunglasses made under licence by Marcolin since 2005.

> This is an unofficial fan / educational page. It is not affiliated with TOM FORD, Marcolin or The Estée Lauder Companies. TOM FORD and related names are trademarks of their owners.

## Contents

- Hero with key figures (2005 first collection, US$250M perpetual licence fee, 125+ countries)
- Brand story and a 17-step licence and ownership timeline (2005 Marcolin licence, 2010 / 2011 renewals, 2022 perpetual licence, 2023 ELC acquisition, 2024 Haider Ackermann, 2025 20th anniversary, 2025–26 VSP Vision acquisition of Marcolin as reported)
- Design signatures: metal "T" hinge, materials and shapes, Private Collection, Blue Block, how to read model codes
- Iconic models: Snowdon FT0237, Henry FT0248, Marko FT0144, FT108, Whitney FT0009, Cary FT0058, FT5401, Private Collection FT5848-P – FT5851-P
- Tom Ford on screen: Bond films 2008 / 2012 / 2015 (indicative, fan-site based); *No Time to Die* (not TOM FORD); *A Single Man* and *Nocturnal Animals* (unverified)
- Price range (indicative) and a full sources list

Content source: `output/research/tom-ford-eyewear/tom-ford-eyewear-research-2026-11-05.md` (main project). Design direction: `references/web/tom-ford-eyewear/tom-ford-eyewear-reference-2026-11-05.md`.

## Structure

```
index.html
css/style.css
js/main.js
assets/images/favicon.svg
lib/fonts/<font>/   self-hosted web fonts + licence files
```

Plain HTML / CSS / JS, no build step. Open `index.html` or serve the folder as static files.

## Libraries

No JavaScript libraries are used. Motion is CSS transitions / keyframes plus a small `IntersectionObserver` in `js/main.js`; `prefers-reduced-motion` turns it off.

Self-hosted fonts (WOFF2, downloaded with pinned versions from jsDelivr's npm mirror; the CSS was trimmed to the weights used and woff fallbacks removed; font files unmodified):

| Font | Version | Licence | Download URL | Use |
|---|---|---|---|---|
| Playfair Display (`@fontsource/playfair-display`) | 5.3.0 | SIL OFL 1.1 (`lib/fonts/playfair-display/LICENSE`) | `https://cdn.jsdelivr.net/npm/@fontsource/playfair-display@5.3.0/` (latin 400 / 600, normal / italic) | Latin display: hero, model names, numerals |
| Noto Serif KR (`@fontsource/noto-serif-kr`) | 5.3.1 | SIL OFL 1.1 (`lib/fonts/noto-serif-kr/LICENSE`) | `https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-kr@5.3.1/` (weight 600, all unicode-range slices) | Korean headings |
| Pretendard (`pretendard`) | 1.3.9 | SIL OFL 1.1 (`lib/fonts/pretendard/LICENSE.txt`) | `https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/` (dynamic subset, weights 400 / 600) | Body text and labels |

## Images and credits

- No official TOM FORD logos, product photos or campaign images are used.
- All eyewear drawings (frame silhouettes, hinge, lens and material panels) are original inline SVG / CSS illustrations made for this page. They are schematic, not product drawings.
- No third-party images are used.

## Deployment

- Repository: https://github.com/wonbanzzok-cell/tom_ford_eyewear
- Live page (GitHub Pages): _to be added after deployment_
