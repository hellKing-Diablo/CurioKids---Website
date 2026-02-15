# Project Memory — CurioKids Website

## About This File
This file helps Claude Code remember context between sessions. It also serves as a log of prompts and changes for Yagnik.

---

## Project Overview
- **Name**: CurioKids — Educational & Community Events Platform
- **Type**: Static website (no backend/server)
- **Tech Stack**: HTML, CSS (Bootstrap 5), Vanilla JS, jQuery 3.3.1, FontAwesome 6, Google Fonts (Poppins)
- **Root folder**: `Workup-Starter/`

## Key Files
| File | Purpose |
|------|---------|
| `index.html` | Landing page (hero banner, services, gallery, calendar preview, blog feed) |
| `about.html` | About page |
| `services.html` | Workshops & Events listing with filtering |
| `calendar.html` | Full calendar view |
| `post.html` | Dynamic event/workshop detail page (uses `?id=X` URL param) |
| `contact.html` | Contact page |
| `assets/css/style-starter.css` | Bootstrap 5 + all custom styles (~20k lines) |
| `assets/css/events.css` | Calendar & event card styles |
| `assets/js/events-data.js` | Central data store for all events (JSON-like) |
| `assets/js/calendar.js` | Custom calendar renderer (compact & full modes) |
| `assets/js/post.js` | Loads event detail from URL param, renders gallery & comments |
| `assets/js/services.js` | Services page filtering (workshops vs events) |
| `assets/js/theme-change.js` | Light/Dark mode toggle with localStorage |
| `products.html` | Dedicated products page with detail & purchase modals |
| `assets/js/products-data.js` | Central data store for all products (JSON-like) |
| `assets/js/products.js` | Products page logic (cards, detail modal, purchase modal) |

## Features Implemented
- Dynamic event/workshop system with 4 sample events
- Custom calendar component (month navigation, event highlighting, click-to-view)
- Event detail pages with gallery, comments, related events
- Services page with category filtering
- Light/Dark theme toggle (persisted in localStorage)
- Responsive design (desktop, tablet, mobile)
- Hero banner, gallery carousel, scroll-to-top button
- School partnership CTA section
- Decorative background strips between sections
- Products system: 2 DIY kits with detail modals, purchase flow UI, homepage product section with mascots

## Theme / Design Notes
- CSS custom properties for theming (`--primary-color`, `--heading-color`, etc.)
- Banner was updated to match card theme palette (latest commit)
- Mobile-specific hero images exist

---

## Session Log

### Session 1 (pre-CLAUDE.md) — Dates unknown
**Summary**: Multiple sessions occurred before this file was created. Based on git history, work included:
- Heavy feature implementation: calendar, posts, service page
- Added background strips
- Features & credits sections
- Changed banner to match card theme palette

**No prompts were recorded** (this file didn't exist yet).

---

### Session 2 — 2026-02-15
**Prompts**:
1. "hello claude i used you before in this project is there any memory of past thing we did with you for this project?"
2. "yea just create a claude.md file to save notes for future session both for you and me also keep my prompts in there so i can know what i typed also is there any way for me to see my previous prompts that i did on this website?"

**Changes made**:
- Created this `CLAUDE.md` file for project memory & prompt logging
- Added navbar background image placeholder in `style-starter.css` (lines ~18912 & ~18922)
  - Image path: `assets/images/navbar-bg.png` — user needs to add this image
  - Applied to both `header` and `header.nav-fixed` states
  - No layout/feature changes, just background-image CSS properties added

---

### Session 3 — 2026-02-15
**Prompts**:
1. (Plan mode) User approved a detailed implementation plan for product feature: homepage product section, dedicated products page, purchase flow UI.
2. "Implement the following plan: [full product feature implementation plan]"

**Changes made**:
- **Created 3 new files**:
  - `assets/js/products-data.js` — `window.PRODUCTS_DATA` array with 2 dummy products ("DIY Science Experiment Kit" at INR 500, "Creative Arts & Craft DIY Kit" at INR 450)
  - `assets/js/products.js` — IIFE rendering product cards, detail modal (with gallery, reviews, tags), purchase modal (address form with HTML5 validation, success state)
  - `products.html` — Full products page with inner-banner, products grid, `#productDetailModal` (large, scrollable), `#purchaseModal` (address form, success message)
- **Modified `index.html`** — Added Products nav link, products section (with dino/girl mascots) between gallery and strip 2, products-data script + inline JS to populate homepage grid
- **Modified 5 other pages** — Added "Products" nav link to `about.html`, `services.html`, `calendar.html`, `contact.html`, `post.html`
- **Modified `assets/css/events.css`** — Appended product card styles (`.product-card` + BEM children), home products wrapper with mascots, product detail/purchase modal styles, responsive breakpoints at 991px/768px/480px
- **Updated `CLAUDE.md`** — Added new files to Key Files table, updated Features Implemented, added this session log

---

<!-- INSTRUCTIONS FOR CLAUDE: When starting a new session, read this file first. At the end of each session (or when the user asks), update the Session Log with the user's prompts and a summary of changes made. -->
