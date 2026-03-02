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

        // Register toolbar item
        this.editor.toolbarManager.registerItem('underline', {
            type: 'button',
            command: 'underline',
            tooltip: 'Underline (Ctrl+U)',
            icon: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 17c3.3 0 6-2.7 6-6V3h-2.5v8c0 1.9-1.6 3.5-3.5 3.5S8.5 12.9 8.5 11V3H6v8c0 3.3 2.7 6 6 6zm-7 2v2h14v-2H5z"/></svg>'
        });
    }
}
