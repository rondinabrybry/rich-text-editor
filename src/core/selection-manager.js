/**
 * SelectionManager - Handles text selection and ranges
 * Provides utilities for getting, setting, and manipulating selections
 */
export class SelectionManager {
    constructor(editor) {
        this.editor = editor;
        this.savedRange = null;
    }

    /**
     * Get the current selection
     * @returns {Selection|null}
     */
    getSelection() {
        return window.getSelection();
    }

    /**
     * Get the current range
     * @returns {Range|null}
     */
    getRange() {
        const selection = this.getSelection();
        if (selection && selection.rangeCount > 0) {
            return selection.getRangeAt(0);
        }
        return null;
    }

    /**
     * Save the current selection
     */
    save() {
        const range = this.getRange();
        if (range) {
            this.savedRange = range.cloneRange();
        }
    }

    /**
     * Restore the saved selection
     */
    restore() {
        if (this.savedRange) {
            const selection = this.getSelection();
            selection.removeAllRanges();
            selection.addRange(this.savedRange);
        }
    }

    /**
     * Clear the saved selection
     */
    clearSaved() {
        this.savedRange = null;
    }

    /**
     * Check if selection is within the editor
     * @returns {boolean}
     */
    isInEditor() {
        const selection = this.getSelection();
        if (!selection || !selection.anchorNode) return false;

        return this.editor.contentArea.contains(selection.anchorNode);
    }

    /**
     * Check if selection is collapsed (cursor only, no selection)
     * @returns {boolean}
     */
    isCollapsed() {
        const selection = this.getSelection();
        return selection ? selection.isCollapsed : true;
    }

    /**
     * Get selected text
     * @returns {string}
     */
    getSelectedText() {
        const selection = this.getSelection();
        return selection ? selection.toString() : '';
    }

    /**
     * Get the selected HTML
     * @returns {string}
     */
    getSelectedHTML() {
        const range = this.getRange();
        if (!range) return '';

        const fragment = range.cloneContents();
        const div = document.createElement('div');
        div.appendChild(fragment);
        return div.innerHTML;
    }

    /**
     * Replace the current selection with content
     * @param {string|Node} content - HTML string or DOM node
     */
    replaceSelection(content) {
        const range = this.getRange();
        if (!range) return;

        range.deleteContents();

        if (typeof content === 'string') {
            const fragment = range.createContextualFragment(content);
            range.insertNode(fragment);
        } else if (content instanceof Node) {
            range.insertNode(content);
        }

        // Move cursor to end of inserted content
        range.collapse(false);

        const selection = this.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    /**
     * Wrap the selection with an element
     * @param {string} tagName - HTML tag name
     * @param {Object} attributes - Element attributes
     * @returns {Element|null} The wrapper element
     */
    wrapSelection(tagName, attributes = {}) {
        const range = this.getRange();
        if (!range || range.collapsed) return null;

        const wrapper = document.createElement(tagName);

        for (const [key, value] of Object.entries(attributes)) {
            wrapper.setAttribute(key, value);
        }

        try {
            range.surroundContents(wrapper);
            return wrapper;
        } catch (error) {
            // surroundContents fails if selection spans multiple elements
            // Fall back to extracting and wrapping
            const contents = range.extractContents();
            wrapper.appendChild(contents);
            range.insertNode(wrapper);
            return wrapper;
        }
    }

    /**
     * Get the parent element of the selection
     * @returns {Element|null}
     */
    getParentElement() {
        const selection = this.getSelection();
        if (!selection || !selection.anchorNode) return null;

        const node = selection.anchorNode;
        return node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    }

    /**
     * Find the closest ancestor matching a selector
     * @param {string} selector - CSS selector
     * @returns {Element|null}
     */
    getClosestElement(selector) {
        const parent = this.getParentElement();
        if (!parent) return null;

        return parent.closest(selector);
    }

    /**
     * Check if the selection is within an element of given tag
     * @param {string} tagName - Tag name to check
     * @returns {boolean}
     */
    isWithinTag(tagName) {
        const element = this.getClosestElement(tagName);
        return element !== null && this.editor.contentArea.contains(element);
    }

    /**
     * Select all content in the editor
     */
    selectAll() {
        const range = document.createRange();
        range.selectNodeContents(this.editor.contentArea);

        const selection = this.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    /**
     * Collapse selection to start or end
     * @param {boolean} toStart - Collapse to start if true, end if false
     */
    collapse(toStart = false) {
        const selection = this.getSelection();
        if (selection && selection.rangeCount > 0) {
            selection.collapseToStart ?
                (toStart ? selection.collapseToStart() : selection.collapseToEnd()) :
                selection.getRangeAt(0).collapse(toStart);
        }
    }

    /**
     * Move cursor to the start of the editor
     */
    moveCursorToStart() {
        const range = document.createRange();
        range.setStart(this.editor.contentArea, 0);
        range.collapse(true);

        const selection = this.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    /**
     * Move cursor to the end of the editor
     */
    moveCursorToEnd() {
        const range = document.createRange();
        range.selectNodeContents(this.editor.contentArea);
        range.collapse(false);

        const selection = this.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
