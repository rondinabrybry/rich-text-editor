---
wave: 1
depends_on: []
files_modified:
  - src/plugins/formatting/bold.plugin.js
  - src/plugins/formatting/italic.plugin.js
  - src/plugins/formatting/underline.plugin.js
  - src/plugins/formatting/strikethrough.plugin.js
  - src/plugins/formatting/font.plugin.js
  - src/plugins/formatting/color.plugin.js
  - src/plugins/index.js
autonomous: true
---

# Plan: Phase 1 — Typography Essentials

Implement the core typographic formatting suite for the Word-style rich text editor.

## Requirements
- **REQ-01**: Implement Bold, Italic, Underline, and Strikethrough formatting.
- **REQ-02**: Support Font Family and Font Size selection from the toolbar.
- **REQ-03**: Support Text Color and Background Highlight selection.

## Context
We are building a zero-dependency, modular editor. Features should be implemented as plugins that register themselves with the `PluginManager` and `ToolbarManager`.

## Tasks

### Wave 1: Typography Plugins (Core Logic)

<task id="01.1" wave="1">
Create individual plugins for basic formatting:
- `src/plugins/formatting/bold.plugin.js`: Toggle Bold.
- `src/plugins/formatting/italic.plugin.js`: Toggle Italic.
- `src/plugins/formatting/underline.plugin.js`: Toggle Underline.
- `src/plugins/formatting/strikethrough.plugin.js`: Toggle Strikethrough.
Each plugin should expose a standardized `init` method and a command for execution.
</task>

<task id="01.2" wave="1">
Create the Font management plugin:
- `src/plugins/formatting/font.plugin.js`: Handle Font Family and Font Size.
- Implement selection caching to prevent selection loss when the toolbar dropdown is opened.
</task>

<task id="01.3" wave="1">
Create the Color management plugin:
- `src/plugins/formatting/color.plugin.js`: Handle Text Color and Background Highlight.
- Implement a simple color picker UI or a list of preset standard colors.
</task>

<task id="01.4" wave="1">
Register all new formatting plugins in `src/plugins/index.js`.
</task>

### Wave 2: Toolbar Integration & Interaction

<task id="01.5" wave="2">
Update `ToolbarManager` or individual plugins to register buttons and dropdowns for the typography suite:
- Toolbar Icons (Bold, Italic, U, S).
- Dropdowns (Font Family, Font Size).
- Color picker buttons.
</task>

## Verification Criteria
- [ ] Clicking Bold icon applied `<b>` or `font-weight: bold` to selected text.
- [ ] Font family selection changes the font of the selection.
- [ ] Color picker correctly applies `foreColor` and `hiliteColor`.
- [ ] Background highlighting is clear and distinguishable from text color.
- [ ] All formatting commands successfully restore selection if focus shifts.

## must_haves
- All typography features must work via the toolbar without using external UI libraries.
- Formatted content must render correctly in the editor and be exportable as clean HTML.
- Keyboard shortcuts for Bold (Ctrl+B), Italic (Ctrl+I), and Underline (Ctrl+U) should be supported (can be deferred to Phase 5 or implemented now).

---

*Plan generated: 2026-03-02*
