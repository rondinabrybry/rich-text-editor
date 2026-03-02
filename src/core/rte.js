import { EventManager } from './event-manager.js';
import { PluginManager } from './plugin-manager.js';
import { CommandManager } from './command-manager.js';
import { SelectionManager } from './selection-manager.js';
import { DataManager } from './data-manager.js';
import { ToolbarManager } from './toolbar-manager.js';
import {
    BoldPlugin, ItalicPlugin, UnderlinePlugin, StrikethroughPlugin,
    ColorPlugin, FontFamilyPlugin, FontSizePlugin
} from '../plugins/index.js';

/**
 * RTE - Rich Text Editor
 * Main editor class that orchestrates all components
 */
export class RTE {
    /**
     * Create a new RTE instance
     * @param {string|HTMLElement} target - CSS selector or DOM element
     * @param {Object} options - Editor options
     */
    constructor(target, options = {}) {
        // Resolve target element
        this.originalElement = typeof target === 'string'
            ? document.querySelector(target)
            : target;

        if (!this.originalElement) {
            throw new Error('RTE: Target element not found');
        }

        // Default options
        this.options = {
            toolbar: null, // Use default toolbar
            plugins: [], // Additional plugins to load
            placeholder: 'Start typing...',
            height: 'auto',
            minHeight: 200,
            maxHeight: null,
            readonly: false,
            autofocus: false,
            sanitize: true,
            ...options
        };

        // Initialize managers
        this.events = new EventManager();
        this.plugins = new PluginManager(this);
        this.commands = new CommandManager(this);
        this.selection = new SelectionManager(this);
        this.data = new DataManager(this);
        this.toolbarManager = new ToolbarManager(this);

        // DOM elements
        this.container = null;
        this.toolbar = null;
        this.contentArea = null;
        this.statusBar = null;

        // State
        this.isReady = false;
        this.isFullscreen = false;
        this.isSourceMode = false;

        // Initialize the editor
        this.init();
    }

    /**
     * Initialize the editor
     */
    init() {
        this.createDOM();
        this.registerCoreCommands();
        this.bindEvents();
        this.initToolbar();

        // Register default plugins
        this.registerDefaultPlugins();

        // Load plugins
        const pluginsToLoad = this.options.plugins.length > 0
            ? this.options.plugins
            : this.getDefaultPluginsList();

        this.plugins.initAll(pluginsToLoad);

        // Set initial content
        if (this.originalElement.tagName === 'TEXTAREA') {
            this.data.setContent(this.originalElement.value);
        } else if (this.originalElement.innerHTML.trim()) {
            this.data.setContent(this.originalElement.innerHTML);
        }

        // Mark as ready
        this.isReady = true;
        this.events.emit('ready');

        // Autofocus if enabled
        if (this.options.autofocus) {
            this.focus();
        }
    }

    /**
     * Create the editor DOM structure
     */
    createDOM() {
        // Create container
        this.container = document.createElement('div');
        this.container.className = 'rte-container';

        if (this.options.height !== 'auto') {
            this.container.style.height = typeof this.options.height === 'number'
                ? `${this.options.height}px`
                : this.options.height;
        }

        // Create toolbar
        this.toolbar = this.toolbarManager.create(this.options.toolbar);
        this.container.appendChild(this.toolbar);

        // Create content wrapper
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'rte-content-wrapper';

        // Create content area (editable div)
        this.contentArea = document.createElement('div');
        this.contentArea.className = 'rte-content';
        this.contentArea.setAttribute('contenteditable', !this.options.readonly);
        this.contentArea.setAttribute('role', 'textbox');
        this.contentArea.setAttribute('aria-multiline', 'true');
        this.contentArea.setAttribute('aria-label', 'Rich text editor');
        this.contentArea.setAttribute('data-placeholder', this.options.placeholder);

        // Apply height constraints
        if (this.options.minHeight) {
            this.contentArea.style.minHeight = typeof this.options.minHeight === 'number'
                ? `${this.options.minHeight}px`
                : this.options.minHeight;
        }
        if (this.options.maxHeight) {
            this.contentArea.style.maxHeight = typeof this.options.maxHeight === 'number'
                ? `${this.options.maxHeight}px`
                : this.options.maxHeight;
            this.contentArea.style.overflowY = 'auto';
        }

        // Initial empty content
        this.contentArea.innerHTML = '<p><br></p>';

        contentWrapper.appendChild(this.contentArea);
        this.container.appendChild(contentWrapper);

        // Create status bar
        this.statusBar = document.createElement('div');
        this.statusBar.className = 'rte-status-bar';
        this.container.appendChild(this.statusBar);

        // Insert container after original element and hide original
        if (this.originalElement.tagName === 'TEXTAREA') {
            this.originalElement.style.display = 'none';
            this.originalElement.parentNode.insertBefore(this.container, this.originalElement.nextSibling);
        } else {
            this.originalElement.innerHTML = '';
            this.originalElement.appendChild(this.container);
        }
    }

    /**
     * Register core commands
     */
    registerCoreCommands() {
        // Basic movement and editor-level commands could go here
        // (Most formatting is now handled by plugins)

        // Headings
        this.commands.register('heading', {
            execute: (value) => document.execCommand('formatBlock', false, value),
            isActive: () => false
        });

        // Paragraph
        this.commands.register('paragraph', {
            execute: () => document.execCommand('formatBlock', false, 'p'),
            isActive: () => false
        });

        // Blockquote
        this.commands.register('blockquote', {
            execute: () => document.execCommand('formatBlock', false, 'blockquote'),
            isActive: () => this.selection.isWithinTag('blockquote')
        });

        // Code block
        this.commands.register('codeBlock', {
            execute: () => document.execCommand('formatBlock', false, 'pre'),
            isActive: () => this.selection.isWithinTag('pre')
        });

        // Horizontal rule
        this.commands.register('horizontalRule', {
            execute: () => document.execCommand('insertHorizontalRule', false, null),
            isActive: () => false
        });

        // Lists
        this.commands.register('bulletList', {
            execute: () => document.execCommand('insertUnorderedList', false, null),
            isActive: () => document.queryCommandState('insertUnorderedList')
        });

        this.commands.register('orderedList', {
            execute: () => document.execCommand('insertOrderedList', false, null),
            isActive: () => document.queryCommandState('insertOrderedList')
        });

        this.commands.register('indent', {
            execute: () => document.execCommand('indent', false, null),
            isActive: () => false
        });

        this.commands.register('outdent', {
            execute: () => document.execCommand('outdent', false, null),
            isActive: () => false
        });

        // Alignment
        this.commands.register('alignLeft', {
            execute: () => document.execCommand('justifyLeft', false, null),
            isActive: () => document.queryCommandState('justifyLeft')
        });

        this.commands.register('alignCenter', {
            execute: () => document.execCommand('justifyCenter', false, null),
            isActive: () => document.queryCommandState('justifyCenter')
        });

        this.commands.register('alignRight', {
            execute: () => document.execCommand('justifyRight', false, null),
            isActive: () => document.queryCommandState('justifyRight')
        });

        this.commands.register('alignJustify', {
            execute: () => document.execCommand('justifyFull', false, null),
            isActive: () => document.queryCommandState('justifyFull')
        });

        // Undo/Redo
        this.commands.register('undo', {
            execute: () => document.execCommand('undo', false, null),
            isActive: () => false,
            isEnabled: () => document.queryCommandEnabled('undo')
        });

        this.commands.register('redo', {
            execute: () => document.execCommand('redo', false, null),
            isActive: () => false,
            isEnabled: () => document.queryCommandEnabled('redo')
        });

        // Clear formatting
        this.commands.register('clearFormatting', {
            execute: () => document.execCommand('removeFormat', false, null),
            isActive: () => false
        });

        // Link (placeholder - will be enhanced by link plugin)
        this.commands.register('link', {
            execute: (url) => {
                if (url) {
                    document.execCommand('createLink', false, url);
                } else {
                    const selectedText = this.selection.getSelectedText();
                    const linkUrl = prompt('Enter URL:', 'https://');
                    if (linkUrl) {
                        document.execCommand('createLink', false, linkUrl);
                    }
                }
            },
            isActive: () => this.selection.isWithinTag('a')
        });

        this.commands.register('unlink', {
            execute: () => document.execCommand('unlink', false, null),
            isActive: () => false,
            isEnabled: () => this.selection.isWithinTag('a')
        });

        // Image (placeholder - will be enhanced by image plugin)
        this.commands.register('image', {
            execute: (src) => {
                if (src) {
                    document.execCommand('insertImage', false, src);
                } else {
                    const imageUrl = prompt('Enter image URL:', 'https://');
                    if (imageUrl) {
                        document.execCommand('insertImage', false, imageUrl);
                    }
                }
            },
            isActive: () => false
        });
    }

    /**
     * Bind editor events
     */
    bindEvents() {
        // Content change detection
        this.contentArea.addEventListener('input', () => {
            this.events.emit('content:change');
            this.syncToOriginal();
            this.updatePlaceholder();
        });

        // Focus/blur events
        this.contentArea.addEventListener('focus', () => {
            this.container.classList.add('rte-focused');
            this.events.emit('focus');
        });

        this.contentArea.addEventListener('blur', () => {
            this.container.classList.remove('rte-focused');
            this.events.emit('blur');
        });

        // Keyboard shortcuts
        this.contentArea.addEventListener('keydown', (e) => {
            this.handleKeydown(e);
        });

        // Paste handling
        this.contentArea.addEventListener('paste', (e) => {
            this.handlePaste(e);
        });

        // Update placeholder visibility
        this.updatePlaceholder();
    }

    /**
     * Handle keydown events for shortcuts
     * @param {KeyboardEvent} e
     */
    handleKeydown(e) {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const modifier = isMac ? e.metaKey : e.ctrlKey;

        if (modifier) {
            switch (e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    this.commands.execute('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    this.commands.execute('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    this.commands.execute('underline');
                    break;
                case 'k':
                    e.preventDefault();
                    this.commands.execute('link');
                    break;
                case 'z':
                    if (e.shiftKey) {
                        e.preventDefault();
                        this.commands.execute('redo');
                    }
                    break;
                case 'y':
                    e.preventDefault();
                    this.commands.execute('redo');
                    break;
            }
        }

        this.events.emit('keydown', e);
    }

    /**
     * Handle paste events
     * @param {ClipboardEvent} e
     */
    handlePaste(e) {
        if (this.options.sanitize) {
            e.preventDefault();

            // Get plain text or HTML
            let content = e.clipboardData.getData('text/html');

            if (content) {
                // Sanitize HTML content
                content = this.data.sanitize(content);
                document.execCommand('insertHTML', false, content);
            } else {
                // Fall back to plain text
                content = e.clipboardData.getData('text/plain');
                document.execCommand('insertText', false, content);
            }

            this.events.emit('paste', { content });
        }
    }

    /**
     * Initialize toolbar
     */
    initToolbar() {
        this.toolbarManager.init();
    }

    /**
     * Update placeholder visibility
     */
    updatePlaceholder() {
        const isEmpty = this.data.isEmpty();
        this.contentArea.classList.toggle('rte-empty', isEmpty);
    }

    /**
     * Sync content to original textarea
     */
    syncToOriginal() {
        if (this.originalElement.tagName === 'TEXTAREA') {
            this.originalElement.value = this.getContent();
        }
    }

    // ========== Public API ==========

    /**
     * Get the HTML content
     * @param {boolean} sanitize - Whether to sanitize output
     * @returns {string}
     */
    getContent(sanitize = false) {
        return this.data.getContent(sanitize);
    }

    /**
     * Set the HTML content
     * @param {string} html - HTML content
     * @param {boolean} sanitize - Whether to sanitize input
     */
    setContent(html, sanitize = true) {
        this.data.setContent(html, sanitize);
        this.updatePlaceholder();
    }

    /**
     * Get plain text content
     * @returns {string}
     */
    getText() {
        return this.data.getText();
    }

    /**
     * Set plain text content
     * @param {string} text
     */
    setText(text) {
        this.data.setText(text);
        this.updatePlaceholder();
    }

    /**
     * Check if editor is empty
     * @returns {boolean}
     */
    isEmpty() {
        return this.data.isEmpty();
    }

    /**
     * Clear all content
     */
    clear() {
        this.data.clear();
        this.updatePlaceholder();
    }

    /**
     * Focus the editor
     */
    focus() {
        this.contentArea.focus();
    }

    /**
     * Blur the editor
     */
    blur() {
        this.contentArea.blur();
    }

    /**
     * Check if editor has focus
     * @returns {boolean}
     */
    hasFocus() {
        return document.activeElement === this.contentArea;
    }

    /**
     * Set readonly state
     * @param {boolean} readonly
     */
    setReadonly(readonly) {
        this.options.readonly = readonly;
        this.contentArea.setAttribute('contenteditable', !readonly);
        this.toolbarManager.setEnabled(!readonly);
    }

    /**
     * Check if editor is readonly
     * @returns {boolean}
     */
    isReadonly() {
        return this.options.readonly;
    }

    /**
     * Get word count
     * @returns {number}
     */
    getWordCount() {
        return this.data.getWordCount();
    }

    /**
     * Get character count
     * @param {boolean} excludeSpaces
     * @returns {number}
     */
    getCharacterCount(excludeSpaces = false) {
        return this.data.getCharacterCount(excludeSpaces);
    }

    /**
     * Register an event listener
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    on(event, callback) {
        return this.events.on(event, callback);
    }

    /**
     * Remove an event listener
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    off(event, callback) {
        this.events.off(event, callback);
    }

    /**
     * Execute a command
     * @param {string} command - Command name
     * @param {*} value - Command value
     * @returns {boolean}
     */
    execute(command, value = null) {
        return this.commands.execute(command, value);
    }

    /**
     * Register a custom command
     * @param {string} name - Command name
     * @param {Object} definition - Command definition
     */
    registerCommand(name, definition) {
        this.commands.register(name, definition);
    }

    /**
     * Destroy the editor and clean up
     */
    destroy() {
        // Emit destroy event
        this.events.emit('destroy');

        // Destroy plugins
        this.plugins.destroyAll();

        // Destroy toolbar
        this.toolbarManager.destroy();

        // Clear events
        this.events.clear();

        // Restore original element
        if (this.originalElement.tagName === 'TEXTAREA') {
            this.originalElement.style.display = '';
            this.originalElement.value = this.getContent();
        }

        // Remove container
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }

        // Clear references
        this.container = null;
        this.toolbar = null;
        this.contentArea = null;
        this.statusBar = null;
        this.isReady = false;
    }

    /**
     * Register internal default plugins
     */
    registerDefaultPlugins() {
        this.plugins.register('bold', BoldPlugin);
        this.plugins.register('italic', ItalicPlugin);
        this.plugins.register('underline', UnderlinePlugin);
        this.plugins.register('strikethrough', StrikethroughPlugin);
        this.plugins.register('color', ColorPlugin);
        this.plugins.register('fontFamily', FontFamilyPlugin);
        this.plugins.register('fontSize', FontSizePlugin);
    }

    /**
     * Get list of plugins to load by default
     */
    getDefaultPluginsList() {
        return [
            'bold', 'italic', 'underline', 'strikethrough',
            'color', 'fontFamily', 'fontSize'
        ];
    }
}

// Export as default
export default RTE;
