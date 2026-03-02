/**
 * HistoryPlugin - Custom Undo/Redo Stack
 */
export class HistoryPlugin {
    constructor(editor) {
        this.editor = editor;
        this.stack = [];
        this.position = -1;
        this.limit = 100;
        this.isLocked = false;

        // Debounce snapshot
        this.timeout = null;
    }

    init() {
        // We override the default undo/redo commands
        this.editor.commands.register('undo', {
            execute: () => this.undo(),
            isActive: () => false,
            isEnabled: () => this.canUndo()
        });

        this.editor.commands.register('redo', {
            execute: () => this.redo(),
            isActive: () => false,
            isEnabled: () => this.canRedo()
        });

        // Listen for changes
        this.editor.on('content:change', () => {
            this.record();
        });

        // Initial snapshot
        this.snapshot();
    }

    /**
     * Record a change (debounced)
     */
    record() {
        if (this.isLocked) return;

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.snapshot();
        }, 300); // 300ms debounce
    }

    /**
     * Take an immediate snapshot
     */
    snapshot() {
        const html = this.editor.getContent();

        // If same as current, ignore
        if (this.position > -1 && this.stack[this.position] === html) {
            return;
        }

        // If we were back in time, remove future
        if (this.position < this.stack.length - 1) {
            this.stack = this.stack.slice(0, this.position + 1);
        }

        this.stack.push(html);
        if (this.stack.length > this.limit) {
            this.stack.shift();
        } else {
            this.position++;
        }

        // Update button states if possible (via events or checking command state)
    }

    undo() {
        if (this.canUndo()) {
            this.isLocked = true;
            this.position--;
            const html = this.stack[this.position];
            this.editor.setContent(html);
            this.isLocked = false;
        }
    }

    redo() {
        if (this.canRedo()) {
            this.isLocked = true;
            this.position++;
            const html = this.stack[this.position];
            this.editor.setContent(html);
            this.isLocked = false;
        }
    }

    canUndo() {
        return this.position > 0;
    }

    canRedo() {
        return this.position < this.stack.length - 1;
    }
}
