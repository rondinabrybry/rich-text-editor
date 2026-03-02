/**
 * HRPlugin - Handles horizontal line insertion
 */
export class HRPlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        // Register command
        this.editor.commands.register('horizontalRule', {
            execute: () => {
                this.editor.focus();
                document.execCommand('insertHorizontalRule', false, null);
            },
            isActive: () => false,
            isEnabled: () => true
        });

        // Register toolbar item
        this.editor.toolbarManager.registerItem('horizontalRule', {
            type: 'button',
            command: 'horizontalRule',
            tooltip: 'Horizontal Line',
            icon: 'horizontalRule'
        });
    }
}
