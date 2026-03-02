# Research: Phase 05 — Utilities & DX

## Objective
Enhance user experience through robust undo/redo history, formatting reset, and comprehensive keyboard shortcut management.

## Strategies

### History Management (HistoryPlugin)
- **API**: Use a custom stack rather than `document.execCommand('undo')` for better reliability and control.
- **Debounced Snapshots**: Snapshotting on every keystroke is expensive; debouncing snapshots (e.g., 300ms) or on specific events (blur, toolbar interaction) is standard practice.
- **Modularization**: Move `undo` and `redo` commands from being core hardcoded methods to becoming features of a loadable history plugin.

### Formatting Reset (ClearFormattingPlugin)
- **API**: Use `document.execCommand('removeFormat')`.
- **Scope**: Reverts bold, italic, underline, strikethrough, colors, and other inline formatting.
- **Block-level**: `removeFormat` sometimes leaves block-level styles (like headers) intact depending on browser. A more aggressive reset might involve wrapping in `<p>` if needed, but `removeFormat` is the standard for "Word" style behavior.

### Keyboard Shortcut Management
- **Centralization**: Currently, shortcuts are handled directly in `rte.js#handleKeydown`.
- **Consistency**: Finalize the mapping:
  - Ctrl+Z / Ctrl+Y (Undo/Redo)
  - Ctrl+B / Ctrl+I / Ctrl+U (Text Styles)
  - Ctrl+K (Link)
  - Tab / Shift+Tab (Indentation/Nesting)
  - Ctrl+Shift+S (Strikethrough - optional)
  - Ctrl+\\ (Clear Formatting - common shortcut)

## Implementation Considerations

### Command States
- Ensure `undo` and `redo` buttons on the toolbar are disabled when no history is available in the stack.

### HTML Sterilization
- When clearing formatting, ensure the resulting HTML is clean and properly balanced.

## Success Criteria
- [ ] Users can undo/redo multiple levels of changes using the toolbar or keyboard.
- [ ] "Clear Formatting" button works on selected text.
- [ ] Centralized keyboard event handling for all registered shortcuts.
- [ ] Milestone 1 requirements 10 and 11 are fully addressed.

## References
- MDN: [execCommand('removeFormat')](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#removeformat)
- Project Code: `src/plugins/history/history.plugin.js` (Already has base implementation)
