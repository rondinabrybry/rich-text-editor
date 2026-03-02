# Research: Phase 02 — Paragraph & Alignment

## Objective
Enable basic document structure through headers, text alignment, and paragraph-level formatting within the modular plugin architecture.

## Strategies

### Block Formatting (Headers & Paragraphs)
- **API**: Use `document.execCommand('formatBlock', false, tag)` where tag is `h1`, `h2`, `h3`, or `p`.
- **Plugin Structure**: Create a `BlockFormatPlugin` (or individual plugins like `HeaderPlugin` and `ParagraphPlugin`) to register these commands.
- **UI**: A dropdown in the toolbar is the standard "Word" UI for styles/headers.

### Text Alignment
- **API**: Use `document.execCommand('justifyLeft')`, `justifyCenter`, `justifyRight`, and `justifyFull`.
- **Plugin Structure**: Create an `AlignmentPlugin` to register all four alignment types.
- **UI**: A button group in the toolbar with icons for each alignment state.

### Implementation Considerations

#### Selection Persistence
- As established in Phase 01, use the `SelectionManager` to ensure the editor doesn't lose focus when interacting with toolbar elements.
- `execCommand` handles block-level formatting automatically by wrapping the current block or selection in the specified tag.

#### Clean HTML
- `formatBlock` is generally well-behaved, but we should ensure it doesn't create nested headers (e.g., `<h1><h2>...`) if used incorrectly.
- Alignment usually applies a `text-align` style to the parent block element (like `div` or `p`).

## Success Criteria
- [ ] Users can apply H1, H2, and H3 styling to the current block.
- [ ] Users can revert headers back to standard paragraphs.
- [ ] Text can be aligned (Left, Center, Right, Justify).
- [ ] Active state for alignment buttons correctly reflects the current block's alignment.

## References
- MDN: [execCommand('formatBlock')](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#formatblock)
- MDN: [execCommand('justifyLeft')](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#justifyleft)
