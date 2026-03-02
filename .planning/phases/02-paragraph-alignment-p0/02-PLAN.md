---
requirements: [REQ-04, REQ-05]
phase: 02
goal: Enable basic document structure through headers, alignment, and paragraphs.
---

# Plan: Phase 02 — Paragraph & Alignment

Implementing core document structure features (Headers, Alignment, Paragraphs) as modular plugins.

## Wave 1: Block Formatting & Alignment Plugins

**Task 02.1: Header & Paragraph Plugin**
- Create `src/plugins/formatting/block-format.plugin.js`.
- Implement `BlockFormatPlugin` to register commands for `h1`, `h2`, `h3`, and `p`.
- Register the `styles` dropdown in the `ToolbarManager`.

**Task 02.2: Alignment Plugin**
- Create `src/plugins/formatting/alignment.plugin.js`.
- Implement `AlignmentPlugin` to register commands for `justifyLeft`, `justifyCenter`, `justifyRight`, and `justifyFull`.
- Register alignment buttons in the `ToolbarManager`.

**Task 02.3: Plugin Registration**
- Export new plugins from `src/plugins/index.js`.
- Register `blockFormat` and `alignment` plugins in `src/core/rte.js`'s `registerDefaultPlugins`.

**Task 02.4: Core Refactoring**
- Remove monolithic `heading`, `paragraph`, and `align*` commands from `registerCoreCommands` in `src/core/rte.js`.
- Ensure keyboard shortcuts for headers (if any) are correctly mapped (e.g., Ctrl+Alt+1 for H1).

## Wave 2: Toolbar & UX Refinement

**Task 02.5: Toolbar State Sync**
- Ensure `updateStates` in `ToolbarManager` correctly handles the active state for the `styles` dropdown (if possible) and alignment buttons.
- alignment buttons should toggle correctly.

## Verification Criteria
- [ ] Users can apply and toggle H1, H2, H3, and Paragraph formatting.
- [ ] Text alignment (Left, Center, Right, Justify) works correctly on the current block.
- [ ] Toolbar icons for alignment show the active state correctly.
- [ ] Formatting is preserved when switching blocks (e.g., hitting Enter preserves alignment/styling of the newline or resets it as per browser defaults).
- [ ] Clean HTML output for all paragraph-level formats.
- [ ] Keyboard shortcuts for block formatting (if implemented).

---
*Generated: 2026-03-02*
