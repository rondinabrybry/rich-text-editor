# Coding Conventions

**Analysis Date:** 2026-03-02

## Naming Patterns

**Files:**
- `hyphenated-names.js` (e.g., `plugin-manager.js`)

**Functions:**
- `camelCase` (e.g., `initializeEditor`, `handleClick`)

**Classes:**
- `PascalCase` (e.g., `RTE`, `PluginManager`)

## Code Style

**Formatting:**
- Manual (Standard JS style observed: 4-space indentation, semicolons used)

## Error Handling

**Patterns:**
- `try-catch` blocks in managers and async operations (like media uploads).
- Fail-safe checks for DOM elements (e.g., `if (!element) return`).

## Logging

**Framework:** Browser `console.error` for critical issues, `console.log` for debug (optional).

## Function Design

**Exports:**
- Default and Named exports used (ESM).
- `export default class ...` for main classes.

---

*Convention analysis: 2026-03-02*
