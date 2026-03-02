/**
 * ItalicPlugin - Toggle italic formatting
 */
export class ItalicPlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        // Register command
        this.editor.commands.register('italic', {
            execute: () => {
                this.editor.focus();
                document.execCommand('italic', false, null);
            },
            isActive: () => document.queryCommandState('italic'),
            isEnabled: () => true
        });

        // Register toolbar item
        this.editor.toolbarManager.registerItem('italic', {
            type: 'button',
            command: 'italic',
            tooltip: 'Italic (Ctrl+I)',
            icon: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M10 5v3h2.2l-3.4 8H6v3h8v-3h-2.2l3.4-8H18V5h-8z"/></svg>'
        });
    }
}
