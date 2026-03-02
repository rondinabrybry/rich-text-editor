import { getIcon } from '../icons/icons.js';

/**
 * ToolbarManager - Creates and manages the editor toolbar
 * Handles button creation, state updates, and user interactions
 */
export class ToolbarManager {
    constructor(editor) {
        this.editor = editor;
        this.toolbar = null;
        this.buttons = new Map();
        this.dropdowns = new Map();

        // Default toolbar configuration
        this.defaultConfig = [
            'bold', 'italic', 'underline', 'strikethrough', '|',
            'heading', 'blockquote', 'codeBlock', '|',
            'bulletList', 'orderedList', '|',
            'indent', 'outdent', '|',
            'alignLeft', 'alignCenter', 'alignRight', '|',
            'horizontalRule', 'link', 'image', 'clearFormatting', '|',
            'undo', 'redo'
        ];

        // Button definitions with icons and tooltips
        this.buttonDefinitions = {
            // Text Formatting
            bold: { icon: 'bold', tooltip: 'Bold (Ctrl+B)', command: 'bold' },
            italic: { icon: 'italic', tooltip: 'Italic (Ctrl+I)', command: 'italic' },
            underline: { icon: 'underline', tooltip: 'Underline (Ctrl+U)', command: 'underline' },
            strikethrough: { icon: 'strikethrough', tooltip: 'Strikethrough', command: 'strikethrough' },
            subscript: { icon: 'subscript', tooltip: 'Subscript', command: 'subscript' },
            superscript: { icon: 'superscript', tooltip: 'Superscript', command: 'superscript' },

            // Block Formatting
            heading: {
                icon: 'heading',
                tooltip: 'Heading',
                type: 'dropdown',
                items: [
                    { label: 'Heading 1', command: 'heading', value: 'h1' },
                    { label: 'Heading 2', command: 'heading', value: 'h2' },
                    { label: 'Heading 3', command: 'heading', value: 'h3' },
                    { label: 'Heading 4', command: 'heading', value: 'h4' },
                    { label: 'Heading 5', command: 'heading', value: 'h5' },
                    { label: 'Heading 6', command: 'heading', value: 'h6' },
                    { label: 'Paragraph', command: 'paragraph', value: 'p' }
                ]
            },
            paragraph: { icon: 'paragraph', tooltip: 'Paragraph', command: 'paragraph' },
            blockquote: { icon: 'blockquote', tooltip: 'Block Quote', command: 'blockquote' },
            codeBlock: { icon: 'codeBlock', tooltip: 'Code Block', command: 'codeBlock' },
            horizontalRule: { icon: 'horizontalRule', tooltip: 'Horizontal Line', command: 'horizontalRule' },

            // Lists
            bulletList: { icon: 'bulletList', tooltip: 'Bullet List', command: 'bulletList' },
            orderedList: { icon: 'orderedList', tooltip: 'Numbered List', command: 'orderedList' },
            indent: { icon: 'indent', tooltip: 'Increase Indent', command: 'indent' },
            outdent: { icon: 'outdent', tooltip: 'Decrease Indent', command: 'outdent' },

            // Alignment
            alignLeft: { icon: 'alignLeft', tooltip: 'Align Left', command: 'alignLeft' },
            alignCenter: { icon: 'alignCenter', tooltip: 'Align Center', command: 'alignCenter' },
            alignRight: { icon: 'alignRight', tooltip: 'Align Right', command: 'alignRight' },
            alignJustify: { icon: 'alignJustify', tooltip: 'Justify', command: 'alignJustify' },

            // Media
            link: { icon: 'link', tooltip: 'Insert Link (Ctrl+K)', command: 'link' },
            unlink: { icon: 'unlink', tooltip: 'Remove Link', command: 'unlink' },
            image: { icon: 'image', tooltip: 'Insert Image', command: 'image' },
            video: { icon: 'video', tooltip: 'Insert Video', command: 'video' },

            // Table
            table: { icon: 'table', tooltip: 'Insert Table', command: 'table' },

            // Colors
            textColor: {
                icon: 'textColor',
                tooltip: 'Text Color',
                type: 'colorPicker',
                command: 'textColor'
            },
            backgroundColor: {
                icon: 'backgroundColor',
                tooltip: 'Background Color',
                type: 'colorPicker',
                command: 'backgroundColor'
            },

            // History
            undo: { icon: 'undo', tooltip: 'Undo (Ctrl+Z)', command: 'undo' },
            redo: { icon: 'redo', tooltip: 'Redo (Ctrl+Y)', command: 'redo' },

            // Utilities
            fullscreen: { icon: 'fullscreen', tooltip: 'Fullscreen', command: 'fullscreen' },
            sourceCode: { icon: 'sourceCode', tooltip: 'View Source', command: 'sourceCode' },
            clearFormatting: { icon: 'clearFormatting', tooltip: 'Clear Formatting', command: 'clearFormatting' },
            findReplace: { icon: 'findReplace', tooltip: 'Find & Replace', command: 'findReplace' },

            // Font
            fontFamily: {
                icon: 'fontFamily',
                tooltip: 'Font Family',
                type: 'dropdown',
                items: [
                    { label: 'Arial', command: 'fontFamily', value: 'Arial, sans-serif' },
                    { label: 'Georgia', command: 'fontFamily', value: 'Georgia, serif' },
                    { label: 'Times New Roman', command: 'fontFamily', value: 'Times New Roman, serif' },
                    { label: 'Courier New', command: 'fontFamily', value: 'Courier New, monospace' },
                    { label: 'Verdana', command: 'fontFamily', value: 'Verdana, sans-serif' }
                ]
            },
            fontSize: {
                icon: 'fontSize',
                tooltip: 'Font Size',
                type: 'dropdown',
                items: [
                    { label: 'Small', command: 'fontSize', value: '12px' },
                    { label: 'Normal', command: 'fontSize', value: '16px' },
                    { label: 'Large', command: 'fontSize', value: '20px' },
                    { label: 'Extra Large', command: 'fontSize', value: '24px' }
                ]
            }
        };
    }

    /**
     * Create the toolbar
     * @param {Array} config - Toolbar configuration
     */
    create(config = null) {
        const toolbarConfig = config || this.editor.options.toolbar || this.defaultConfig;

        this.toolbar = document.createElement('div');
        this.toolbar.className = 'rte-toolbar';
        this.toolbar.setAttribute('role', 'toolbar');
        this.toolbar.setAttribute('aria-label', 'Text formatting');

        for (const item of toolbarConfig) {
            if (item === '|') {
                this.createSeparator();
            } else if (typeof item === 'string') {
                this.createButton(item);
            } else if (typeof item === 'object') {
                this.createButton(item.name, item);
            }
        }

        return this.toolbar;
    }

    /**
     * Create a toolbar separator
     */
    createSeparator() {
        const separator = document.createElement('div');
        separator.className = 'rte-toolbar-separator';
        separator.setAttribute('role', 'separator');
        this.toolbar.appendChild(separator);
    }

    /**
     * Register a new toolbar item
     * @param {string} name - Item name
     * @param {Object} config - Item configuration
     */
    registerItem(name, config) {
        this.buttonDefinitions[name] = config;

        // Check for placeholders or existing buttons to replace
        if (this.toolbar) {
            // Note: existing simple buttons have data-command. Dropdowns might need identifying class.
            // Simplified: Look for placeholders OR existing items tracked in this.buttons

            let target = this.toolbar.querySelector(`.rte-toolbar-placeholder[data-name="${name}"]`);
            if (!target && this.buttons.has(name)) {
                target = this.buttons.get(name);
                // If it's a dropdown, the button is inside the wrapper. usage: this.buttons.set(name, button)
                // We need the wrapper to replace.
                if (this.dropdowns.has(name)) {
                    target = this.dropdowns.get(name).wrapper;
                } else if (target.parentNode.classList.contains('rte-color-picker-wrapper')) {
                    target = target.parentNode;
                }
            }

            if (target) {
                const element = this.createButtonElement(name, config);
                if (element) {
                    target.parentNode.replaceChild(element, target);

                    // Specific logic to store reference (copied from createButton)
                    const type = config.type || 'button';
                    if (type === 'dropdown') {
                        const btn = element.querySelector('.rte-dropdown-trigger');
                        const menu = element.querySelector('.rte-dropdown-menu');
                        this.buttons.set(name, btn);
                        this.dropdowns.set(name, { wrapper: element, button: btn, menu });
                    } else if (type === 'colorPicker') {
                        const btn = element.querySelector('button');
                        this.buttons.set(name, btn);
                    } else {
                        // Ensure data-command is set for lookups
                        if (!element.hasAttribute('data-command')) {
                            element.setAttribute('data-command', config.command || name);
                        }
                        this.buttons.set(name, element);
                    }
                }
                this.updateStates();
            }
        }
    }

    /**
     * Create a toolbar button (internal helper to separate element creation)
     * @param {string} name 
     * @param {Object} config 
     */
    createButtonElement(name, config) {
        const type = config.type || 'button';

        if (type === 'dropdown') {
            return this.createDropdown(name, config);
        } else if (type === 'colorPicker') {
            return this.createColorButton(name, config);
        } else {
            return this.createSimpleButton(name, config);
        }
    }

    /**
     * Create a toolbar button
     * @param {string} name - Button name
     * @param {Object} customConfig - Custom button configuration
     */
    createButton(name, customConfig = null) {
        const definition = this.buttonDefinitions[name];

        if (!definition && !customConfig) {
            // Create placeholder
            const placeholder = document.createElement('span');
            placeholder.className = 'rte-toolbar-placeholder';
            placeholder.setAttribute('data-name', name);
            placeholder.style.display = 'none';
            this.toolbar.appendChild(placeholder);
            return;
        }

        const config = { ...definition, ...customConfig };
        const element = this.createButtonElement(name, config);

        if (element) {
            this.toolbar.appendChild(element);
        }
    }

    /**
     * Create a simple button
     * @param {string} name - Button name
     * @param {Object} config - Button configuration
     * @returns {HTMLElement}
     */
    createSimpleButton(name, config) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'rte-toolbar-button';
        button.setAttribute('data-command', config.command || name);
        button.setAttribute('title', config.tooltip || name);
        button.setAttribute('aria-label', config.tooltip || name);
        button.innerHTML = getIcon(config.icon);

        button.addEventListener('click', (e) => {
            e.preventDefault();
            this.editor.commands.execute(config.command || name);
            this.updateStates();
        });

        this.buttons.set(name, button);
        return button;
    }

    /**
     * Create a dropdown button
     * @param {string} name - Button name
     * @param {Object} config - Button configuration
     * @returns {HTMLElement}
     */
    createDropdown(name, config) {
        const wrapper = document.createElement('div');
        wrapper.className = 'rte-toolbar-dropdown';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'rte-toolbar-button rte-dropdown-trigger';
        button.setAttribute('title', config.tooltip || name);
        button.setAttribute('aria-haspopup', 'true');
        button.setAttribute('aria-expanded', 'false');
        button.innerHTML = `${getIcon(config.icon)}${getIcon('dropdownArrow')}`;

        const menu = document.createElement('div');
        menu.className = 'rte-dropdown-menu';
        menu.setAttribute('role', 'menu');

        for (const item of config.items || []) {
            const menuItem = document.createElement('button');
            menuItem.type = 'button';
            menuItem.className = 'rte-dropdown-item';
            menuItem.setAttribute('role', 'menuitem');
            menuItem.textContent = item.label;
            menuItem.addEventListener('click', (e) => {
                e.preventDefault();
                this.editor.commands.execute(item.command, item.value);
                this.closeAllDropdowns();
                this.updateStates();
            });
            menu.appendChild(menuItem);
        }

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleDropdown(wrapper, button);
        });

        wrapper.appendChild(button);
        wrapper.appendChild(menu);

        this.buttons.set(name, button);
        this.dropdowns.set(name, { wrapper, button, menu });

        return wrapper;
    }

    /**
     * Create a color picker button
     * @param {string} name - Button name
     * @param {Object} config - Button configuration
     * @returns {HTMLElement}
     */
    createColorButton(name, config) {
        const wrapper = document.createElement('div');
        wrapper.className = 'rte-toolbar-dropdown rte-color-picker-wrapper';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'rte-toolbar-button';
        button.setAttribute('title', config.tooltip || name);
        button.innerHTML = getIcon(config.icon);

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.className = 'rte-color-input';
        colorInput.value = '#000000';

        colorInput.addEventListener('input', (e) => {
            this.editor.commands.execute(config.command, e.target.value);
            this.updateStates();
        });

        button.addEventListener('click', (e) => {
            e.preventDefault();
            colorInput.click();
        });

        wrapper.appendChild(button);
        wrapper.appendChild(colorInput);

        this.buttons.set(name, button);

        return wrapper;
    }

    /**
     * Toggle a dropdown menu
     * @param {HTMLElement} wrapper - Dropdown wrapper
     * @param {HTMLElement} button - Trigger button
     */
    toggleDropdown(wrapper, button) {
        const isOpen = wrapper.classList.contains('rte-dropdown-open');

        this.closeAllDropdowns();

        if (!isOpen) {
            wrapper.classList.add('rte-dropdown-open');
            button.setAttribute('aria-expanded', 'true');
        }
    }

    /**
     * Close all open dropdowns
     */
    closeAllDropdowns() {
        for (const { wrapper, button } of this.dropdowns.values()) {
            wrapper.classList.remove('rte-dropdown-open');
            button.setAttribute('aria-expanded', 'false');
        }
    }

    /**
     * Update button states based on current selection
     */
    updateStates() {
        const states = this.editor.commands.getStates();

        for (const [name, button] of this.buttons) {
            const definition = this.buttonDefinitions[name];
            if (!definition) continue;

            const commandName = definition.command || name;
            const state = states[commandName];

            if (state) {
                button.classList.toggle('rte-button-active', state.active);
                button.disabled = !state.enabled;
                button.classList.toggle('rte-button-disabled', !state.enabled);
            }

            // Handle dropdown active items
            if (this.dropdowns.has(name)) {
                const { menu } = this.dropdowns.get(name);
                const items = Array.from(menu.children);
                const dropdownConfig = this.buttonDefinitions[name];

                if (dropdownConfig && dropdownConfig.items) {
                    items.forEach((menuItem, index) => {
                        const itemConfig = dropdownConfig.items[index];
                        if (itemConfig) {
                            const itemState = this.editor.commands.getState(
                                itemConfig.command,
                                itemConfig.value
                            );
                            menuItem.classList.toggle('rte-dropdown-item-active', itemState.active);
                        }
                    });
                }
            }
        }
    }

    /**
     * Initialize toolbar event listeners
     */
    init() {
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.toolbar.contains(e.target)) {
                this.closeAllDropdowns();
            }
        });

        // Update states on selection change
        document.addEventListener('selectionchange', () => {
            if (this.editor.selection.isInEditor()) {
                this.updateStates();
            }
        });

        // Initial state update
        this.updateStates();
    }

    /**
     * Get the toolbar element
     * @returns {HTMLElement}
     */
    getElement() {
        return this.toolbar;
    }

    /**
     * Enable/disable the entire toolbar
     * @param {boolean} enabled
     */
    setEnabled(enabled) {
        for (const button of this.buttons.values()) {
            button.disabled = !enabled;
        }
    }

    /**
     * Destroy the toolbar
     */
    destroy() {
        if (this.toolbar && this.toolbar.parentNode) {
            this.toolbar.parentNode.removeChild(this.toolbar);
        }
        this.buttons.clear();
        this.dropdowns.clear();
        this.toolbar = null;
    }
}
