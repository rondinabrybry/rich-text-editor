import { Modal } from '../../ui/modal.js';
import { getIcon } from '../../icons/icons.js';

/**
 * SearchReplacePlugin - Find and replace functionality
 */
export class SearchReplacePlugin {
    constructor(editor) {
        this.editor = editor;
        this.modal = null;
    }

    init() {
        this.editor.toolbarManager.registerItem('findReplace', {
            type: 'button',
            icon: getIcon('search') || '<span style="font-size:14px">🔍</span>',
            tooltip: 'Find and Replace',
            command: 'findReplace'
        });

        this.editor.commands.register('findReplace', {
            execute: () => this.openModal(),
            isActive: () => false
        });
    }

    openModal() {
        // Save selection? Maybe not needed for find

        const content = document.createElement('div');
        content.innerHTML = `
            <div class="rte-form-group">
                <label class="rte-form-label">Find what</label>
                <input type="text" class="rte-form-input" id="rte-find-input">
            </div>
            <div class="rte-form-group">
                <label class="rte-form-label">Replace with</label>
                <input type="text" class="rte-form-input" id="rte-replace-input">
            </div>
            <div class="rte-form-group">
                <label class="rte-form-checkbox">
                    <input type="checkbox" id="rte-match-case">
                    <span>Match case</span>
                </label>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 15px;">
                <button type="button" class="rte-btn rte-btn-secondary" id="rte-find-next">Find Next</button>
                <div>
                    <button type="button" class="rte-btn rte-btn-secondary" id="rte-replace">Replace</button>
                    <button type="button" class="rte-btn rte-btn-secondary" id="rte-replace-all">Replace All</button>
                </div>
            </div>
        `;

        this.modal = new Modal({
            title: 'Find and Replace',
            content: content,
            width: '400px',
            buttons: [
                {
                    text: 'Close',
                    onClick: () => this.modal.close()
                }
            ]
        });

        // Bind events
        const findInput = content.querySelector('#rte-find-input');
        const replaceInput = content.querySelector('#rte-replace-input');
        const matchCase = content.querySelector('#rte-match-case');
        const btnFind = content.querySelector('#rte-find-next');
        const btnReplace = content.querySelector('#rte-replace');
        const btnReplaceAll = content.querySelector('#rte-replace-all');

        const getFlags = () => matchCase.checked ? 'g' : 'gi';
        // Note: window.find doesn't easily support regex or flags in the same way, 
        // but let's try to use window.find for highlighting selection first.

        btnFind.addEventListener('click', () => {
            const query = findInput.value;
            if (!query) return;

            // window.find(aString, aCaseSensitive, aBackwards, aWrapAround, aWholeWord, aSearchInFrames, aShowDialog)
            const found = window.find(query, matchCase.checked, false, true, false, false, false);

            if (!found) {
                alert('Text not found');
            }
        });

        btnReplace.addEventListener('click', () => {
            // To replace, we must have a selection that matches the find input
            const selection = this.editor.selection.getSelectedText();
            const query = findInput.value;
            const replacement = replaceInput.value;

            if (!query) return;

            // If current selection matches query (accounting for case sensitivity)
            let matches = false;
            if (matchCase.checked) {
                matches = selection === query;
            } else {
                matches = selection.toLowerCase() === query.toLowerCase();
            }

            if (matches) {
                document.execCommand('insertText', false, replacement);
                // Find next
                window.find(query, matchCase.checked, false, true, false, false, false);
            } else {
                // Try to find first
                const found = window.find(query, matchCase.checked, false, true, false, false, false);
                if (found) {
                    // We just found it, user clicks replace again to replace it
                } else {
                    alert('Text not found');
                }
            }
        });

        btnReplaceAll.addEventListener('click', () => {
            const query = findInput.value;
            const replacement = replaceInput.value;
            if (!query) return;

            // This is tricky with contenteditable.
            // Easiest is to traverse text nodes or use regex on HTML (dangerous)
            // Safer: Use a loop with window.find until no more matches

            // Reset cursor to start
            this.editor.selection.restore({ start: 0, end: 0 }); // Simplification
            const sel = window.getSelection();
            sel.collapse(this.editor.contentArea, 0);

            let count = 0;
            while (window.find(query, matchCase.checked, false, false, false, false, false)) {
                // Check if selection is inside editor
                if (!this.editor.contentArea.contains(window.getSelection().anchorNode)) break;

                document.execCommand('insertText', false, replacement);
                count++;
            }

            alert(`Replaced ${count} occurrences.`);
        });

        this.modal.open();
    }
}
