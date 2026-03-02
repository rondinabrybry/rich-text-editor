# Rich Text Editor Stack (2025)

**Analysis Date:** 2026-03-02

## Core Technologies

**Primary:**
- **Vanilla JavaScript (ESM)**: Decoupled selection management and DOM manipulation.
- **Pure CSS (Advanced Architecture)**: Custom properties for dynamic themes (Glassmorphism layer).

## Runtime & APIs

**Browser APIs:**
- **Selection/Range API**: Primary cursor and formatting control.
- **MutationObserver**: Detecting content changes for real-time validation.
- **Input Events (beforeinput)**: Standardizing keyboard/input behavior before browser execution.

## Frameworks & Tooling

**Editor Core:**
- No external framework (React/Vue/Angular) to minimize weight.
- Custom **Modular Plugin Manager** for extensibility.

**Build & Dev:**
- **Vite/esbuild**: Fast compilation (optional bundle step).
- **Vitest**: Recommended unit testing framework for core logic.

---

*Stack research: 2026-03-02*
