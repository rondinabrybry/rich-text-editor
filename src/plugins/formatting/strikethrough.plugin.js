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

        // Register toolbar item
        this.editor.toolbarManager.registerItem('strikethrough', {
            type: 'button',
            command: 'strikethrough',
            tooltip: 'Strikethrough',
            icon: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/></svg>'
        });
    }
}
