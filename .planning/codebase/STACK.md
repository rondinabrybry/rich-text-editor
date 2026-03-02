# Technology Stack

**Analysis Date:** 2026-03-02

## Languages

**Primary:**
- JavaScript (ES6+ Modules) - All application code in `src/`

**Secondary:**
- HTML/CSS - Demo and styling in `demo/` and `src/styles/`

## Runtime

**Environment:**
- Browser (Modern evergreen browsers)

**Package Manager:**
- npm (Version 10.x detected)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Vanilla JavaScript (Pure JS, no external frameworks like React/Vue)

**Testing:**
- Not detected (Placeholder: No tests yet)

**Build/Dev:**
- `npx serve` - Simple dev server for local development

## Key Dependencies

**Critical:**
- None (Building a zero-dependency rich text editor)

**Infrastructure:**
- Browser APIs: `contenteditable`, `Selection API`, `Range API`, `document.execCommand` (legacy but used for some operations)

## Configuration

**Environment:**
- No environment variables required (Client-side only)

**Build:**
- No build step (Direct ES module loading in browser)

## Platform Requirements

**Development:**
- Any OS with Node.js (for `serve`)

**Production:**
- Any static file hosting (GitHub Pages, Netlify, Vercel, or raw server)

---

*Stack analysis: 2026-03-02*
