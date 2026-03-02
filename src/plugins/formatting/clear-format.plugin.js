/**
 * ClearFormatPlugin - Handles format removal
 */
export class ClearFormatPlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        // Register commands
        this.editor.commands.register('clearFormatting', {
            execute: () => {
                this.editor.focus();
                document.execCommand('removeFormat', false, null);
                this.editor.events.emit('content:change');
            },
            isActive: () => false,
            isEnabled: () => true
        });

        // Register toolbar item
        this.editor.toolbarManager.registerItem('clearFormatting', {
            type: 'button',
            command: 'clearFormatting',
            tooltip: 'Clear Formatting (Ctrl+\\)',
            icon: 'clearFormatting'
        });
    }
}
