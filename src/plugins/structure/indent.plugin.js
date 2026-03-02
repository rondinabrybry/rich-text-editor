/**
 * IndentPlugin - Handles text indentation and list item nesting
 */
export class IndentPlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        // Register commands
        this.editor.commands.register('indent', {
            execute: () => {
                this.editor.focus();
                document.execCommand('indent', false, null);
            },
            isActive: () => false,
            isEnabled: () => true
        });

        this.editor.commands.register('outdent', {
            execute: () => {
                this.editor.focus();
                document.execCommand('outdent', false, null);
            },
            isActive: () => false,
            isEnabled: () => true
        });

        // Register toolbar items
        this.editor.toolbarManager.registerItem('indent', {
            type: 'button',
            command: 'indent',
            tooltip: 'Increase Indent',
            icon: 'indent'
        });

        this.editor.toolbarManager.registerItem('outdent', {
            type: 'button',
            command: 'outdent',
            tooltip: 'Decrease Indent',
            icon: 'outdent'
        });
    }
}
