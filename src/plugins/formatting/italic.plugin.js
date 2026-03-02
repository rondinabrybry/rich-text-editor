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

        this.editor.toolbarManager.registerItem('italic', {
            type: 'button',
            command: 'italic',
            tooltip: 'Italic (Ctrl+I)',
            icon: 'italic'
        });
    }
}
