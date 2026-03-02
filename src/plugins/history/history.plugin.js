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
        // Register commands to override core undo/redo
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

        // Register toolbar items
        this.editor.toolbarManager.registerItem('undo', {
            type: 'button',
            command: 'undo',
            tooltip: 'Undo (Ctrl+Z)',
            icon: 'undo'
        });

        this.editor.toolbarManager.registerItem('redo', {
            type: 'button',
            command: 'redo',
            tooltip: 'Redo (Ctrl+Y)',
            icon: 'redo'
        });

        // Listen for internal changes
        this.editor.events.on('content:change', () => {
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
        const html = this.editor.data.getContent();

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

        // Trigger UI update for toolbar button states
        this.editor.toolbarManager.updateStates();
    }

    undo() {
        if (this.canUndo()) {
            this.isLocked = true;
            this.position--;
            const html = this.stack[this.position];
            this.editor.data.setContent(html, false); // Don't sanitize when restoring from history
            this.isLocked = false;
            this.editor.toolbarManager.updateStates();
        }
    }

    redo() {
        if (this.canRedo()) {
            this.isLocked = true;
            this.position++;
            const html = this.stack[this.position];
            this.editor.data.setContent(html, false); // Don't sanitize when restoring from history
            this.isLocked = false;
            this.editor.toolbarManager.updateStates();
        }
    }

    canUndo() {
        return this.position > 0;
    }

    canRedo() {
        return this.position < this.stack.length - 1;
    }
}
