import { ColorPicker } from '../../ui/color-picker.js';
import { getOffset } from '../../utils/dom-utils.js';

/**
 * ColorPlugin - Advanced color management
 */
export class ColorPlugin {
    constructor(editor) {
        this.editor = editor;
        this.activePicker = null;
        this.activeButton = null;
    }

    init() {
        // Register toolbar overrides
        this.editor.toolbarManager.registerItem('textColor', {
            type: 'button',
            icon: `<span style="border-bottom: 3px solid currentColor">A</span>`,
            tooltip: 'Text Color',
            command: 'textColor'
        });

        this.editor.toolbarManager.registerItem('backgroundColor', {
            type: 'button',
            icon: `<span style="background-color: #ddd; padding: 0 2px; border-radius: 2px;">A</span>`,
            tooltip: 'Highlight Color',
            command: 'backgroundColor'
        });

        // Register commands
        this.editor.commands.register('textColor', {
            execute: (color, btn) => this.openPicker('foreColor', btn),
            isActive: () => false,
            isEnabled: () => true
        });

        this.editor.commands.register('backgroundColor', {
            execute: (color, btn) => this.openPicker('hiliteColor', btn),
            isActive: () => false,
            isEnabled: () => true
        });

        // Close picker on outside click
        document.addEventListener('click', (e) => {
            if (this.activePicker &&
                !this.activePicker.contains(e.target) &&
                (!this.activeButton || !this.activeButton.contains(e.target))) {
                this.closePicker();
            }
        });
    }

    /**
     * Open color picker
     * @param {string} command - 'foreColor' or 'hiliteColor'
     * @param {HTMLElement} button - The button that triggered it
     */
    openPicker(command, button) {
        if (this.activePicker) {
            this.closePicker();
            // If clicking same button, just close
            if (this.activeButton === button) {
                return;
            }
        }

        this.activeButton = button;

        const picker = new ColorPicker({
            onChange: (color) => {
                this.editor.focus();
                document.execCommand(command, false, color);
                this.closePicker();
                this.editor.events.emit('content:change');
            }
        });

        const element = picker.getElement();
        element.style.position = 'absolute';
        element.style.zIndex = '1000';
        element.style.background = '#fff';
        element.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        element.style.border = '1px solid #e5e7eb';
        element.style.borderRadius = '8px';
        element.style.padding = '12px';

        document.body.appendChild(element);
        this.activePicker = element;

        // Position it
        if (button) {
            const rect = button.getBoundingClientRect();
            const top = rect.bottom + window.scrollY + 8;
            const left = rect.left + window.scrollX;

            element.style.top = `${top}px`;
            element.style.left = `${left}px`;

            // Adjust if off screen (simplified)
            const pickerRect = element.getBoundingClientRect();
            if (pickerRect.right > window.innerWidth) {
                element.style.left = `${window.innerWidth - pickerRect.width - 20}px`;
            }
        } else {
            // Center if no button (fallback)
            element.style.top = '50%';
            element.style.left = '50%';
            element.style.transform = 'translate(-50%, -50%)';
        }
    }

    closePicker() {
        if (this.activePicker) {
            if (this.activePicker.parentNode) {
                this.activePicker.parentNode.removeChild(this.activePicker);
            }
            this.activePicker = null;
            this.activeButton = null;
        }
    }
}
