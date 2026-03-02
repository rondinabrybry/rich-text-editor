/**
 * UnderlinePlugin - Toggle underline formatting
 */
export class UnderlinePlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        // Register command
        this.editor.commands.register('underline', {
            execute: () => {
                this.editor.focus();
                document.execCommand('underline', false, null);
            },
            isActive: () => document.queryCommandState('underline'),
            isEnabled: () => true
        });

        this.editor.toolbarManager.registerItem('underline', {
            type: 'button',
            command: 'underline',
            tooltip: 'Underline (Ctrl+U)',
            icon: 'underline'
        });
    }
}
