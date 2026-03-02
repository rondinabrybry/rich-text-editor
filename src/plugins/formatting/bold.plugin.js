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

        // Register toolbar item
        this.editor.toolbarManager.registerItem('bold', {
            type: 'button',
            command: 'bold',
            tooltip: 'Bold (Ctrl+B)',
            icon: '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M15.6 11.8c1 .7 1.6 1.8 1.6 3.1 0 2.4-1.9 4.3-4.2 4.3H7V5h6.1c2.1 0 3.8 1.7 3.8 3.8 0 1.2-.6 2.3-1.3 3zm-2.5-4.3H9.5v3.5h3.6c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5zm.5 9h-4.1v4h4.1c1.1 0 2-.9 2-2s-.9-2-2-2z"/></svg>'
        });
    }
}
