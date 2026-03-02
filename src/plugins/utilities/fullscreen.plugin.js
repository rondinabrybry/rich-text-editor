import { getIcon } from '../../icons/icons.js';

/**
 * FullscreenPlugin - Toggle fullscreen mode
 */
export class FullscreenPlugin {
    constructor(editor) {
        this.editor = editor;
        this.isFullscreen = false;
        this.placeholder = null; // To hold space in document flow
    }

    init() {
        this.editor.toolbarManager.registerItem('fullscreen', {
            type: 'button',
            icon: getIcon('maximize') || '⛶',
            tooltip: 'Toggle Fullscreen',
            command: 'fullscreen'
        });

        this.editor.commands.register('fullscreen', {
            execute: () => this.toggleFullscreen(),
            isActive: () => this.isFullscreen
        });
    }

    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;

        if (this.isFullscreen) {
            // Add placeholder to prevent page jump
            this.placeholder = document.createElement('div');
            this.placeholder.style.height = this.editor.container.offsetHeight + 'px';
            this.editor.container.parentNode.insertBefore(this.placeholder, this.editor.container);

            this.editor.container.classList.add('rte-fullscreen');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            this.editor.container.classList.remove('rte-fullscreen');
            document.body.style.overflow = '';

            if (this.placeholder) {
                this.placeholder.parentNode.removeChild(this.placeholder);
                this.placeholder = null;
            }
        }
    }
}
