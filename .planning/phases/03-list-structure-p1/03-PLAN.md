---
requirements: [REQ-06, REQ-07]
phase: 03
goal: Support organized content (List & Structure) through plugins.
---

# Plan: Phase 03 — List & Structure

Implementing core list and structural formatting (UL, OL, HR, Indentation, Blockquote, Code Block) as modular plugins.

## Wave 1: Organizing Structural Plugins

**Task 03.1: List Plugin**
- Create `src/plugins/structure/list.plugin.js`.
- Implement `ListPlugin` to register `bulletList` and `orderedList` commands.
- Register toolbar items for bullet and numbered lists.

**Task 03.2: Indent Plugin**
- Create `src/plugins/structure/indent.plugin.js`.
- Implement `IndentPlugin` to register `indent` and `outdent` commands.
- Register toolbar items for indentation.

**Task 03.3: HR Plugin**
- Create `src/plugins/structure/hr.plugin.js`.
- Implement `HRPlugin` to register `horizontalRule` command.
- Register toolbar item for horizontal line.

**Task 03.4: Quote & Code Plugins**
- Create `src/plugins/structure/quote.plugin.js` and `code-block.plugin.js`.
- Move `blockquote` and `codeBlock` command registrations from `rte.js`.
- Register respective toolbar items if missing.

**Task 03.5: Plugin Registration**
- Create `src/plugins/structure/index.js` (if helpful) and export from `src/plugins/index.js`.
- Register all structural plugins in `src/core/rte.js`'s `registerDefaultPlugins`.

**Task 03.6: Core Refactoring & Keyboard Handling**
- Remove monolithic structural commands from `src/core/rte.js`.
- Add `Tab` and `Shift+Tab` key handlers to `src/core/rte.js` (or a dedicated shortcut manager) to trigger `indent` and `outdent`.

## Wave 2: Toolbar & DX Integration

**Task 03.7: Active State & Icon Check**
- Confirm correct icons are being used for all structural elements.
- Ensure active state for lists works as expected on the toolbar.

## Verification Criteria
- [ ] Users can create and toggle bulleted (UL) and numbered (OL) lists.
- [ ] Nested lists can be created via indent/outdent buttons and Tab keys.
- [ ] Horizontal lines (HR) are inserted correctly.
- [ ] Blockquote and Code blocks are applied correctly to the selected text.
- [ ] Keyboard shortcuts (Tab, Shift+Tab) for indentation work.
- [ ] Clean HTML output for all structural elements.

---
*Generated: 2026-03-02*
