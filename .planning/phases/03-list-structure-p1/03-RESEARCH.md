# Research: Phase 03 — List & Structure

## Objective
Support organized content through bulleted/numbered lists, indent/outdent (nesting), and horizontal lines.

## Strategies

### List Formatting (UL & OL)
- **API**: Use `document.execCommand('insertUnorderedList')` and `insertOrderedList`.
- **Plugin Structure**: Create a `ListPlugin` to register these commands.
- **Consistency**: These commands are highly standardized across browsers for basic document structure.

### Indentation & Nesting
- **API**: Use `document.execCommand('indent')` and `outdent`.
- **Lists**: Calling `indent` while a list item is selected results in nesting (creating a sub-list).
- **Paragraphs**: Calling `indent` on a paragraph usually adds a `margin-left` style (based on `styleWithCSS` setting).
- **Key Handling**: We should support the `Tab` and `Shift+Tab` keys for indentation when focus is inside the editor.

### Horizontal Line (HR)
- **API**: Use `document.execCommand('insertHorizontalRule')`.
- **Plugin Structure**: Create an `HRPlugin` to register this command.
- **Success Criteria**: HR is inserted at the cursor position and breaks any current paragraph.

### Implementation Considerations

#### Selection Management
- Ensure `SelectionManager` is used when inserting HR or lists to maintain the correct document position.
- Toolbar buttons for lists (UL/OL) should show an active state when the selection is inside a list.

#### Tab Key Shortcut
- Handle `keydown` for `Tab` to trigger `indent`.
- Handle `keydown` for `Shift+Tab` to trigger `outdent`.
- Prevent default tab behavior (losing focus) when inside the editor.

## Success Criteria
- [ ] Users can create bulleted (UL) and numbered (OL) lists.
- [ ] List items can be nested using indent/outdent buttons or Tab/Shift+Tab.
- [ ] Horizontal lines can be inserted at any point in the document.
- [ ] Active state for list buttons correctly reflects the current selection context.

## References
- MDN: [execCommand('insertUnorderedList')](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#insertunorderedlist)
- MDN: [execCommand('indent')](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#indent)
- MDN: [execCommand('insertHorizontalRule')](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#inserthorizontalrule)
