/**
 * CodeBlockPlugin - Handles structural code blocks (pre)
 */
export class CodeBlockPlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        // Register command
        this.editor.commands.register('codeBlock', {
            execute: () => {
                this.editor.focus();
                document.execCommand('formatBlock', false, 'pre');
            },
            isActive: () => this.editor.selection.isWithinTag('pre'),
            isEnabled: () => true
        });

        // Register toolbar item
        this.editor.toolbarManager.registerItem('codeBlock', {
            type: 'button',
            command: 'codeBlock',
            tooltip: 'Code Block',
            icon: 'codeBlock'
        });
    }
}
