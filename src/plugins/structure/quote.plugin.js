/**
 * QuotePlugin - Handles blockquote formatting
 */
export class QuotePlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        // Register command
        this.editor.commands.register('blockquote', {
            execute: () => {
                this.editor.focus();
                document.execCommand('formatBlock', false, 'blockquote');
            },
            isActive: () => this.editor.selection.isWithinTag('blockquote'),
            isEnabled: () => true
        });

        // Register toolbar item
        this.editor.toolbarManager.registerItem('blockquote', {
            type: 'button',
            command: 'blockquote',
            tooltip: 'Block Quote',
            icon: 'blockquote'
        });
    }
}
