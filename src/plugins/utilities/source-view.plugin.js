import { getIcon } from '../../icons/icons.js';

/**
 * SourceViewPlugin - View and edit HTML source
 */
export class SourceViewPlugin {
    constructor(editor) {
        this.editor = editor;
        this.isSourceMode = false;
        this.textarea = null;
    }

    init() {
        this.editor.toolbarManager.registerItem('sourceView', {
            type: 'button',
            icon: getIcon('code') || '&lt;/&gt;',
            tooltip: 'Source Code',
            command: 'sourceView'
        });

        this.editor.commands.register('sourceView', {
            execute: () => this.toggleSourceView(),
            isActive: () => this.isSourceMode
        });

        // Create textarea
        this.textarea = document.createElement('textarea');
        this.textarea.className = 'rte-source-view';
        this.textarea.style.display = 'none';

        // Insert after content area
        this.editor.contentArea.parentNode.insertBefore(this.textarea, this.editor.contentArea.nextSibling);
    }

    toggleSourceView() {
        this.isSourceMode = !this.isSourceMode;

        const toolbar = this.editor.container.querySelector('.rte-toolbar');
        const buttons = toolbar.querySelectorAll('button:not([title="Source Code"]), .rte-dropdown-trigger');

        if (this.isSourceMode) {
            // Switch to source
            const html = this.editor.getContent();
            // Prettify? Maybe basic indentation
            this.textarea.value = html; // formatting can be complex, raw is safer for now

            this.editor.contentArea.style.display = 'none';
            this.textarea.style.display = 'block';

            // Disable other buttons
            buttons.forEach(btn => btn.disabled = true);
            this.editor.container.classList.add('rte-source-mode');
        } else {
            // Switch to visual
            const html = this.textarea.value;
            this.editor.setContent(html);

            this.textarea.style.display = 'none';
            this.editor.contentArea.style.display = 'block';

            // Enable buttons
            buttons.forEach(btn => btn.disabled = false);
            this.editor.container.classList.remove('rte-source-mode');
        }
    }
}
