/**
 * BoldPlugin - Toggle bold formatting
 */
export class BoldPlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        // Register command
        this.editor.commands.register('bold', {
            execute: () => {
                this.editor.focus();
                document.execCommand('bold', false, null);
            },
            isActive: () => document.queryCommandState('bold'),
            isEnabled: () => true
        });

        this.editor.toolbarManager.registerItem('bold', {
            type: 'button',
            command: 'bold',
            tooltip: 'Bold (Ctrl+B)',
            icon: 'bold'
        });
    }
}
