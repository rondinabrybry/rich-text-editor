/**
 * Font Plugins - Font Family and Size management
 */

export class FontFamilyPlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        const fonts = [
            { label: 'Default', value: 'inherit' },
            { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
            { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
            { label: 'Courier New', value: '"Courier New", Courier, monospace' },
            { label: 'Georgia', value: 'Georgia, serif' },
            { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
            { label: 'Impact', value: 'Impact, Charcoal, sans-serif' },
            { label: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' }
        ];

        this.editor.toolbarManager.registerItem('fontFamily', {
            type: 'dropdown',
            tooltip: 'Font Family',
            width: '120px',
            items: fonts.map(f => ({
                label: `<span style="font-family: ${f.value}">${f.label}</span>`,
                value: f.value,
                onClick: () => this.editor.execute('fontName', f.value)
            }))
        });

        this.editor.commands.register('fontName', {
            execute: (value) => {
                this.editor.focus();
                document.execCommand('fontName', false, value);
            },
            isActive: () => false, // Hard to detect exact font stack
            isEnabled: () => true
        });
    }
}

export class FontSizePlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        const sizes = [
            { label: 'Tiny', value: '10px' },
            { label: 'Small', value: '13px' },
            { label: 'Normal', value: '16px' },
            { label: 'Big', value: '20px' },
            { label: 'Large', value: '24px' },
            { label: 'Huge', value: '32px' },
            { label: 'Giant', value: '48px' }
        ];

        this.editor.toolbarManager.registerItem('fontSize', {
            type: 'dropdown',
            tooltip: 'Font Size',
            width: '80px',
            items: sizes.map(s => ({
                label: s.label,
                value: s.value,
                onClick: () => this.editor.execute('fontSize', s.value)
            }))
        });

        this.editor.commands.register('fontSize', {
            execute: (value) => {
                this.editor.focus();
                // Safe way to apply font size using SelectionManager
                this.editor.selection.wrapSelection('span', { style: `font-size: ${value}` });
                this.editor.events.emit('content:change');
            },
            isActive: () => false,
            isEnabled: () => true
        });
    }
}
