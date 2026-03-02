/**
 * BlockFormatPlugin - Handles headers and paragraph formatting
 */
export class BlockFormatPlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        // Register commands
        this.editor.commands.register('heading', {
            execute: (value) => {
                this.editor.focus();
                document.execCommand('formatBlock', false, value);
            },
            isActive: (value) => {
                return document.queryCommandValue('formatBlock') === value;
            },
            isEnabled: () => true
        });

        this.editor.commands.register('paragraph', {
            execute: () => {
                this.editor.focus();
                document.execCommand('formatBlock', false, 'p');
            },
            isActive: () => {
                const val = document.queryCommandValue('formatBlock');
                return val === 'p' || val === 'div';
            },
            isEnabled: () => true
        });

        // Register toolbar item
        this.editor.toolbarManager.registerItem('heading', {
            type: 'dropdown',
            icon: 'heading',
            tooltip: 'Styles',
            items: [
                { label: 'Heading 1', command: 'heading', value: 'h1' },
                { label: 'Heading 2', command: 'heading', value: 'h2' },
                { label: 'Heading 3', command: 'heading', value: 'h3' },
                { label: 'Paragraph', command: 'paragraph', value: 'p' }
            ]
        });
    }
}
