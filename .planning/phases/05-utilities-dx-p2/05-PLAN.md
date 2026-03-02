---
requirements: [REQ-10, REQ-11]
phase: 05
goal: Enhance DX and final formatting controls.
---

# Plan: Phase 05 — Utilities & DX

Implementing a robust history system, formatting reset, and comprehensive keyboard shortcut management.

## Wave 1: Utility Plugins & DX Refinement

**Task 05.1: History Plugin Activation**
- Review `src/plugins/history/history.plugin.js`.
- Register `undo` and `redo` commands in the plugin.
- Register toolbar items for undo and redo in the plugin.
- Add `snapshot()` call on toolbar interaction to ensure history point.

**Task 05.2: Clear Formatting Plugin**
- Create `src/plugins/formatting/clear-format.plugin.js`.
- Implement `clearFormatting` command (`removeFormat`).
- Register toolbar item with `icon: 'clearFormatting'`.

**Task 05.3: Shortcut Manager Integration**
- Refactor `src/core/rte.js#handleKeydown` to check if a plugin wants to handle a specific key.
- Alternatively, maintain a clean switch-case that calls registered commands directly.
- Ensure all common Word shortcuts (Ctrl+B, I, U, Z, Y, K) are handled.
- Add shortcut for `clearFormatting` (e.g., Ctrl+\\ or Alt+0).

**Task 05.4: Plugin Registration**
- Register `HistoryPlugin` and `ClearFormatPlugin` in `RTE.registerDefaultPlugins()`.
- Update `getDefaultPluginsList` in `src/core/rte.js`.

**Task 05.5: Core Cleanup**
- Remove remaining monolithic `undo`, `redo`, and `clearFormatting` registrations from `registerCoreCommands` in `src/core/rte.js`.

## Wave 2: Verification & Finishing Touches

**Task 05.6: Verification & Polish**
- Test undo levels (e.g., 5-10 actions).
- Test clearing mixed formatting (e.g., Bold + Color).

## Verification Criteria
- [ ] Multiple undo/redo levels work as expected.
- [ ] Clear Formatting reverts text styling (Bold, Italic, Underline, Color).
- [ ] Keyboard shortcuts (Ctrl+B, I, U, Z, Y, K, Tab, Alt+1/2/3) work reliably.
- [ ] Active state for undo/redo correctly reflects stack position (buttons disabled when at limits).

---
*Generated: 2026-03-02*
