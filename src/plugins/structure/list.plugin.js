/**
 * ListPlugin - Handles bulleted and numbered lists
 */
export class ListPlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        // Register commands
        this.editor.commands.register('bulletList', {
            execute: () => {
                this.editor.focus();
                document.execCommand('insertUnorderedList', false, null);
            },
            isActive: () => document.queryCommandState('insertUnorderedList'),
            isEnabled: () => true
        });

        this.editor.commands.register('orderedList', {
            execute: () => {
                this.editor.focus();
                document.execCommand('insertOrderedList', false, null);
            },
            isActive: () => document.queryCommandState('insertOrderedList'),
            isEnabled: () => true
        });

        // Register toolbar items
        this.editor.toolbarManager.registerItem('bulletList', {
            type: 'button',
            command: 'bulletList',
            tooltip: 'Bullet List',
            icon: 'bulletList'
        });

        this.editor.toolbarManager.registerItem('orderedList', {
            type: 'button',
            command: 'orderedList',
            tooltip: 'Numbered List',
            icon: 'orderedList'
        });
    }
}
