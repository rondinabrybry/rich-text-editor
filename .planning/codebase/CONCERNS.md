# Codebase Concerns

**Analysis Date:** 2026-03-02

## Tech Debt

**Testing:**
- Issue: Total lack of automated unit or integration tests.
- Impact: Regressions are easy to introduce during refactoring.
- Fix approach: Integrate Vitest for unit tests of managers and Playwright for E2E editor behavior.

**Legacy APIs:**
- Issue: Dependency on `document.execCommand` in some core logic.
- Impact: `execCommand` is deprecated and inconsistent across browsers.
- Fix approach: Transition fully to modern Selection and Range APIs + custom DOM manipulation.

## Fragile Areas

**Selection Management:**
- Files: `src/core/selection-manager.js`
- Why fragile: Handling cursor position across complex DOM structures (tables, media) is notoriously difficult in `contenteditable`.

---

*Concerns audit: 2026-03-02*
