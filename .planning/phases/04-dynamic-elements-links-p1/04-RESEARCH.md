# Research: Phase 04 — Dynamic Elements & Links

## Objective
Enable interactivity through advanced hyperlink management and image integration using modular modal-driven plugins.

## Strategies

### Hyperlink Management (LinkPlugin)
- **API**: Use `Modal` class to prompt for URL, text, and target.
- **Update Logic**: When a link is selected, the modal should pre-populate with existing link data.
- **Insertion**: Use `insertHTML` to have full control over attributes (like `target="_blank"`).
- **Removal**: Use `document.execCommand('unlink')` for clean removal.

### Image Integration (ImagePlugin)
- **Insertion**: Support both URL-based insertion and Local File Upload (via `FileReader` and Base64/DataURL).
- **Attributes**: Support Alt text, Width, and Height via modal.
- **Resizing**: Implement interactive resize handles that appear when an image is clicked.
- **UX**: Use a tabbed modal (URL vs Upload) for a modern, user-friendly experience.

### Technical Implementation

#### Modal Persistence
- Use `SelectionManager.save()` and `restore()` to ensure the cursor position/selection is maintained after the modal interaction.
- The `Modal` class (already implemented in `src/ui/modal.js`) provides a consistent backdrop and button interface.

#### Image Resize Handles
- Resizing logic should calculate dimensions based on mouse movement relative to the image bounding box.
- An overlay with handles is safer than direct image manipulation during drag to avoid excessive browser reflows.

## Success Criteria
- [ ] Users can insert/edit links with custom text and optional "Open in new tab".
- [ ] Image insertion via URL works seamlessly.
- [ ] Image upload (via file picker) works by converting to DataURL.
- [ ] Images can be resized via drag handles.
- [ ] Active states on the toolbar correctly reflect when a link or image is selected.

## References
- MDN: [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
- MDN: [insertHTML](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#inserthtml)
- Project Code: `src/plugins/media/link.plugin.js` (Existing base)
- Project Code: `src/plugins/media/image.plugin.js` (Existing base)
