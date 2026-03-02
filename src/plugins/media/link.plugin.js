import { Modal } from '../../ui/modal.js';
import { getIcon } from '../../icons/icons.js';

/**
 * LinkPlugin - Advanced link management
 */
export class LinkPlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        // Register commands
        this.editor.commands.register('link', {
            execute: () => this.openLinkModal(),
            isActive: () => this.editor.selection.isWithinTag('a'),
            isEnabled: () => true
        });

        this.editor.commands.register('unlink', {
            execute: () => this.unlink(),
            isActive: () => false,
            isEnabled: () => this.editor.selection.isWithinTag('a')
        });
    }

    /**
     * Open the link modal
     */
    openLinkModal() {
        const selection = this.editor.selection;
        const selectedText = selection.getSelectedText();
        const range = selection.getRange();

        let existingUrl = '';
        let existingText = selectedText;
        let existingTarget = false;
        let isEdit = false;

        // Check if we are editing an existing link
        const existingLink = selection.getClosestElement('a');
        if (existingLink) {
            existingUrl = existingLink.getAttribute('href');
            existingText = existingLink.textContent;
            existingTarget = existingLink.getAttribute('target') === '_blank';
            isEdit = true;

            // Select the link to ensure we replace it correctly
            const newRange = document.createRange();
            newRange.selectNode(existingLink);
            const sel = selection.getSelection();
            sel.removeAllRanges();
            sel.addRange(newRange);
        }

        // Save selection to restore it after modal closes
        selection.save();

        const content = document.createElement('div');
        content.innerHTML = `
            <div class="rte-form-group">
                <label class="rte-form-label">URL</label>
                <input type="text" class="rte-form-input" id="rte-link-url" placeholder="https://example.com" value="${existingUrl}">
            </div>
            <div class="rte-form-group">
                <label class="rte-form-label">Text to display</label>
                <input type="text" class="rte-form-input" id="rte-link-text" placeholder="Link text" value="${existingText}">
            </div>
            <div class="rte-form-group">
                <label class="rte-form-checkbox">
                    <input type="checkbox" id="rte-link-target" ${existingTarget ? 'checked' : ''}>
                    <span>Open in new tab</span>
                </label>
            </div>
        `;

        const modal = new Modal({
            title: isEdit ? 'Edit Link' : 'Insert Link',
            content: content,
            width: '400px',
            buttons: [
                {
                    text: 'Cancel',
                    onClick: () => {
                        modal.close();
                        selection.restore(); // Restore selection if cancelled
                    }
                },
                {
                    text: 'Save',
                    primary: true,
                    onClick: () => {
                        const url = content.querySelector('#rte-link-url').value;
                        const text = content.querySelector('#rte-link-text').value;
                        const target = content.querySelector('#rte-link-target').checked;

                        if (!url) {
                            alert('Please enter a URL');
                            return;
                        }

                        modal.close();
                        selection.restore();
                        this.insertLink(url, text, target);
                    }
                }
            ]
        });

        modal.open();
    }

    /**
     * Insert or update a link
     * @param {string} url
     * @param {string} text
     * @param {boolean} openInNewTab
     */
    insertLink(url, text, openInNewTab) {
        this.editor.focus();

        // If we have a range, we might be updating an existing link or creating a new one
        // The easiest way is to use execCommand 'createLink' which handles a lot of edge cases
        // But 'createLink' doesn't support target or custom text conveniently if text changed

        const selection = this.editor.selection;

        // Sanitize text to prevent HTML injection if strictly text
        // (Though standard is usually to allow HTML in link text, let's keep it simple)

        if (openInNewTab) {
            // We use a temporary attribute or handle it after creation
            // Standard execCommand doesn't support target.
            // So we'll try to insert raw HTML for full control

            const targetAttr = ' target="_blank" rel="noopener noreferrer"';
            const html = `<a href="${url}"${targetAttr}>${text || url}</a>`;
            this.editor.data.insertHTML(html);
        } else {
            // If just URL, standard command is fine, but if text changed, insertHTML is safer
            const html = `<a href="${url}">${text || url}</a>`;
            this.editor.data.insertHTML(html);
        }
    }

    /**
     * Remove link
     */
    unlink() {
        this.editor.focus();
        document.execCommand('unlink', false, null);
        this.editor.events.emit('content:change');
    }
}
