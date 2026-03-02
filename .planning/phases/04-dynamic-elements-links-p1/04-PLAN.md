---
requirements: [REQ-08, REQ-09]
phase: 04
goal: Enable interactivity through link modals and image integration.
---

# Plan: Phase 04 — Dynamic Elements & Links

Implementing advanced hyperlink and image management via modular modal-driven plugins.

## Wave 1: Link & Image Plugin Refinement

**Task 04.1: Link Plugin Activation**
- Review `src/plugins/media/link.plugin.js`.
- Register the `link` and `unlink` commands in the plugin.
- Register toolbar items for link (Ctrl+K) and unlink via `ToolbarManager.registerItem`.

**Task 04.2: Image Plugin Activation**
- Review `src/plugins/media/image.plugin.js`.
- Register the `image` command in the plugin.
- Ensure the image tab switching and file upload (DataURL) logic is robust.
- Add image resize handle CSS (if missing) to `src/styles/rte.css`.

**Task 04.3: Plugin Registration**
- Register `LinkPlugin` and `ImagePlugin` in `src/core/rte.js`'s `registerDefaultPlugins`.
- Update `getDefaultPluginsList` to include `link` and `image`.

**Task 04.4: Core Refactoring**
- Remove placeholder `link`, `unlink`, and `image` registrations from `registerCoreCommands` in `src/core/rte.js`.

## Wave 2: Toolbar & UX Refinement

**Task 04.5: Selection Manager Updates**
- Ensure `SelectionManager.save()` and `restore()` correctly handles the range for link manipulation.
- Ensure `SelectionManager.isWithinTag('a')` is used for the active state of the link button.

**Task 04.6: Verification & Polish**
- Test image resizing across browsers (ensuring handles are positioned correctly).
- Test file uploads for large images (ensuring DataURL is handled).

## Verification Criteria
- [ ] Users can insert/edit links with text, URL, and "New Tab" via modal.
- [ ] Unlink works for current selection.
- [ ] Images can be inserted by URL or File Upload (Base64).
- [ ] Image resize handles appear on selection and work via drag.
- [ ] Clean HTML output: `<a>` and `<img>` tags are semantic and correctly structured.
- [ ] Active state for Link correctly highlights when the cursor is inside a link.

---
*Generated: 2026-03-02*
