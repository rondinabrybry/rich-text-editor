/**
 * StrikethroughPlugin - Toggle strikethrough formatting
 */
export class StrikethroughPlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        // Register command
        this.editor.commands.register('strikethrough', {
            execute: () => {
                this.editor.focus();
                document.execCommand('strikethrough', false, null);
            },
            isActive: () => document.queryCommandState('strikethrough'),
            isEnabled: () => true
        });

        this.editor.toolbarManager.registerItem('strikethrough', {
            type: 'button',
            command: 'strikethrough',
            tooltip: 'Strikethrough',
            icon: 'strikethrough'
        });
    }
}
