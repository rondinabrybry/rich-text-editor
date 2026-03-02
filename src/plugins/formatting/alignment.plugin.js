/**
 * AlignmentPlugin - Handles text alignment (Left, Center, Right, Justify)
 */
export class AlignmentPlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        const alignments = [
            { id: 'alignLeft', command: 'justifyLeft', tooltip: 'Align Left', icon: 'alignLeft' },
            { id: 'alignCenter', command: 'justifyCenter', tooltip: 'Align Center', icon: 'alignCenter' },
            { id: 'alignRight', command: 'justifyRight', tooltip: 'Align Right', icon: 'alignRight' },
            { id: 'alignJustify', command: 'justifyFull', tooltip: 'Justify', icon: 'alignJustify' }
        ];

        for (const align of alignments) {
            // Register command
            this.editor.commands.register(align.id, {
                execute: () => {
                    this.editor.focus();
                    document.execCommand(align.command, false, null);
                },
                isActive: () => document.queryCommandState(align.command),
                isEnabled: () => true
            });

            // Register toolbar item
            this.editor.toolbarManager.registerItem(align.id, {
                type: 'button',
                command: align.id,
                tooltip: align.tooltip,
                icon: align.icon
            });
        }
    }
}
