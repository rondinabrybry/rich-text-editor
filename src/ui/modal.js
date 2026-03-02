import { getIcon } from '../icons/icons.js';

/**
 * Modal - Reusable modal dialog component
 */
export class Modal {
    constructor(options = {}) {
        this.options = {
            title: options.title || 'Modal',
            content: options.content || '',
            width: options.width || '500px',
            closable: options.closable !== false,
            closeOnOverlay: options.closeOnOverlay !== false,
            onOpen: options.onOpen || null,
            onClose: options.onClose || null,
            buttons: options.buttons || []
        };

        this.overlay = null;
        this.modal = null;
        this.isOpen = false;

        this.create();
    }

    /**
     * Create the modal DOM structure
     */
    create() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'rte-modal-overlay';

        if (this.options.closeOnOverlay) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close();
                }
            });
        }

        // Create modal
        this.modal = document.createElement('div');
        this.modal.className = 'rte-modal';
        this.modal.style.maxWidth = this.options.width;

        // Header
        const header = document.createElement('div');
        header.className = 'rte-modal-header';

        const title = document.createElement('h3');
        title.className = 'rte-modal-title';
        title.textContent = this.options.title;
        header.appendChild(title);

        if (this.options.closable) {
            const closeBtn = document.createElement('button');
            closeBtn.type = 'button';
            closeBtn.className = 'rte-modal-close';
            closeBtn.innerHTML = getIcon('close');
            closeBtn.addEventListener('click', () => this.close());
            header.appendChild(closeBtn);
        }

        this.modal.appendChild(header);

        // Body
        this.body = document.createElement('div');
        this.body.className = 'rte-modal-body';

        if (typeof this.options.content === 'string') {
            this.body.innerHTML = this.options.content;
        } else if (this.options.content instanceof HTMLElement) {
            this.body.appendChild(this.options.content);
        }

        this.modal.appendChild(this.body);

        // Footer with buttons
        if (this.options.buttons.length > 0) {
            const footer = document.createElement('div');
            footer.className = 'rte-modal-footer';

            for (const btn of this.options.buttons) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = `rte-btn ${btn.primary ? 'rte-btn-primary' : 'rte-btn-secondary'}`;
                button.textContent = btn.text;

                if (btn.onClick) {
                    button.addEventListener('click', () => btn.onClick(this));
                }

                footer.appendChild(button);
            }

            this.modal.appendChild(footer);
        }

        this.overlay.appendChild(this.modal);

        // Handle Escape key
        this.handleKeydown = (e) => {
            if (e.key === 'Escape' && this.options.closable) {
                this.close();
            }
        };
    }

    /**
     * Set modal content
     * @param {string|HTMLElement} content
     */
    setContent(content) {
        if (typeof content === 'string') {
            this.body.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            this.body.innerHTML = '';
            this.body.appendChild(content);
        }
    }

    /**
     * Get modal body element
     * @returns {HTMLElement}
     */
    getBody() {
        return this.body;
    }

    /**
     * Open the modal
     */
    open() {
        if (this.isOpen) return;

        document.body.appendChild(this.overlay);
        document.addEventListener('keydown', this.handleKeydown);

        // Trigger reflow for animation
        this.overlay.offsetHeight;
        this.overlay.classList.add('rte-modal-open');

        this.isOpen = true;

        if (this.options.onOpen) {
            this.options.onOpen(this);
        }

        // Focus first input
        const firstInput = this.body.querySelector('input, textarea, select');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    /**
     * Close the modal
     */
    close() {
        if (!this.isOpen) return;

        this.overlay.classList.remove('rte-modal-open');
        document.removeEventListener('keydown', this.handleKeydown);

        setTimeout(() => {
            if (this.overlay.parentNode) {
                this.overlay.parentNode.removeChild(this.overlay);
            }
        }, 200);

        this.isOpen = false;

        if (this.options.onClose) {
            this.options.onClose(this);
        }
    }

    /**
     * Destroy the modal
     */
    destroy() {
        this.close();
        this.overlay = null;
        this.modal = null;
    }
}

/**
 * Create a form group element
 * @param {Object} options
 * @returns {HTMLElement}
 */
export function createFormGroup(options) {
    const group = document.createElement('div');
    group.className = 'rte-form-group';

    if (options.label) {
        const label = document.createElement('label');
        label.className = 'rte-form-label';
        label.textContent = options.label;
        if (options.id) {
            label.setAttribute('for', options.id);
        }
        group.appendChild(label);
    }

    let input;

    switch (options.type) {
        case 'textarea':
            input = document.createElement('textarea');
            input.className = 'rte-form-textarea';
            input.rows = options.rows || 3;
            break;
        case 'select':
            input = document.createElement('select');
            input.className = 'rte-form-select';
            for (const opt of options.options || []) {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.label;
                input.appendChild(option);
            }
            break;
        case 'checkbox':
            const checkWrapper = document.createElement('label');
            checkWrapper.className = 'rte-form-checkbox';
            input = document.createElement('input');
            input.type = 'checkbox';
            checkWrapper.appendChild(input);
            const checkLabel = document.createElement('span');
            checkLabel.textContent = options.checkboxLabel || '';
            checkWrapper.appendChild(checkLabel);
            group.appendChild(checkWrapper);
            if (options.id) input.id = options.id;
            if (options.checked) input.checked = true;
            return group;
        default:
            input = document.createElement('input');
            input.type = options.type || 'text';
            input.className = 'rte-form-input';
    }

    if (options.id) input.id = options.id;
    if (options.placeholder) input.placeholder = options.placeholder;
    if (options.value) input.value = options.value;
    if (options.required) input.required = true;

    group.appendChild(input);

    return group;
}

/**
 * Show a confirmation dialog
 * @param {Object} options
 * @returns {Promise<boolean>}
 */
export function confirm(options) {
    return new Promise((resolve) => {
        const modal = new Modal({
            title: options.title || 'Confirm',
            content: `<p>${options.message || 'Are you sure?'}</p>`,
            width: '400px',
            buttons: [
                {
                    text: options.cancelText || 'Cancel',
                    onClick: () => {
                        modal.close();
                        resolve(false);
                    }
                },
                {
                    text: options.confirmText || 'Confirm',
                    primary: true,
                    onClick: () => {
                        modal.close();
                        resolve(true);
                    }
                }
            ]
        });
        modal.open();
    });
}

/**
 * Show a prompt dialog
 * @param {Object} options
 * @returns {Promise<string|null>}
 */
export function prompt(options) {
    return new Promise((resolve) => {
        const form = document.createElement('div');
        const input = document.createElement('input');
        input.type = options.type || 'text';
        input.className = 'rte-form-input';
        input.placeholder = options.placeholder || '';
        input.value = options.defaultValue || '';

        if (options.label) {
            const label = document.createElement('label');
            label.className = 'rte-form-label';
            label.textContent = options.label;
            form.appendChild(label);
        }
        form.appendChild(input);

        const modal = new Modal({
            title: options.title || 'Input',
            content: form,
            width: '400px',
            buttons: [
                {
                    text: 'Cancel',
                    onClick: () => {
                        modal.close();
                        resolve(null);
                    }
                },
                {
                    text: options.submitText || 'OK',
                    primary: true,
                    onClick: () => {
                        modal.close();
                        resolve(input.value);
                    }
                }
            ]
        });

        modal.open();
    });
}

export default Modal;
