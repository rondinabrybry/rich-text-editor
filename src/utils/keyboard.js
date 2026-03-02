/**
 * Keyboard Utilities for the RTE
 * Handles keyboard shortcuts and key event processing
 */

/**
 * Key codes for common keys
 */
export const KeyCodes = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESCAPE: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90
};

/**
 * Check if the platform is Mac
 * @returns {boolean}
 */
export function isMac() {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}

/**
 * Get the modifier key for the current platform
 * @returns {string} 'metaKey' for Mac, 'ctrlKey' for others
 */
export function getModifierKey() {
    return isMac() ? 'metaKey' : 'ctrlKey';
}

/**
 * Check if the modifier key is pressed (Cmd on Mac, Ctrl otherwise)
 * @param {KeyboardEvent} event - Keyboard event
 * @returns {boolean}
 */
export function isModifierPressed(event) {
    return isMac() ? event.metaKey : event.ctrlKey;
}

/**
 * Parse a keyboard shortcut string
 * @param {string} shortcut - Shortcut string like "Ctrl+B" or "Cmd+Shift+K"
 * @returns {Object} Parsed shortcut object
 */
export function parseShortcut(shortcut) {
    const parts = shortcut.toLowerCase().split('+').map(p => p.trim());

    return {
        ctrl: parts.includes('ctrl'),
        meta: parts.includes('cmd') || parts.includes('meta'),
        shift: parts.includes('shift'),
        alt: parts.includes('alt') || parts.includes('option'),
        key: parts.find(p => !['ctrl', 'cmd', 'meta', 'shift', 'alt', 'option'].includes(p)) || ''
    };
}

/**
 * Check if a keyboard event matches a shortcut
 * @param {KeyboardEvent} event - Keyboard event
 * @param {string|Object} shortcut - Shortcut string or parsed object
 * @returns {boolean}
 */
export function matchesShortcut(event, shortcut) {
    const parsed = typeof shortcut === 'string' ? parseShortcut(shortcut) : shortcut;

    // Handle modifier key (Ctrl on Windows/Linux, Cmd on Mac)
    const modifierMatch = isMac()
        ? (parsed.ctrl ? event.metaKey : true) && (parsed.meta ? event.metaKey : true)
        : (parsed.ctrl ? event.ctrlKey : true) && (parsed.meta ? event.ctrlKey : true);

    const shiftMatch = parsed.shift ? event.shiftKey : !event.shiftKey || parsed.key === '';
    const altMatch = parsed.alt ? event.altKey : !event.altKey;
    const keyMatch = parsed.key ? event.key.toLowerCase() === parsed.key : true;

    return modifierMatch && shiftMatch && altMatch && keyMatch;
}

/**
 * Format a shortcut for display
 * @param {string} shortcut - Shortcut string
 * @returns {string} Formatted shortcut
 */
export function formatShortcut(shortcut) {
    const parsed = parseShortcut(shortcut);
    const parts = [];

    if (isMac()) {
        if (parsed.ctrl || parsed.meta) parts.push('⌘');
        if (parsed.shift) parts.push('⇧');
        if (parsed.alt) parts.push('⌥');
    } else {
        if (parsed.ctrl || parsed.meta) parts.push('Ctrl');
        if (parsed.shift) parts.push('Shift');
        if (parsed.alt) parts.push('Alt');
    }

    if (parsed.key) {
        parts.push(parsed.key.toUpperCase());
    }

    return isMac() ? parts.join('') : parts.join('+');
}

/**
 * Keyboard shortcut manager
 */
export class ShortcutManager {
    constructor() {
        this.shortcuts = new Map();
        this.enabled = true;
        this.boundHandler = this.handleKeydown.bind(this);
    }

    /**
     * Register a keyboard shortcut
     * @param {string} shortcut - Shortcut string
     * @param {Function} handler - Handler function
     * @param {Object} options - Options { preventDefault: true, stopPropagation: false }
     */
    register(shortcut, handler, options = {}) {
        this.shortcuts.set(shortcut.toLowerCase(), {
            handler,
            preventDefault: options.preventDefault !== false,
            stopPropagation: options.stopPropagation || false
        });
    }

    /**
     * Unregister a keyboard shortcut
     * @param {string} shortcut - Shortcut string
     */
    unregister(shortcut) {
        this.shortcuts.delete(shortcut.toLowerCase());
    }

    /**
     * Handle keydown events
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeydown(event) {
        if (!this.enabled) return;

        for (const [shortcut, config] of this.shortcuts) {
            if (matchesShortcut(event, shortcut)) {
                if (config.preventDefault) {
                    event.preventDefault();
                }
                if (config.stopPropagation) {
                    event.stopPropagation();
                }
                config.handler(event);
                break;
            }
        }
    }

    /**
     * Attach to an element
     * @param {Element} element - Element to attach to
     */
    attach(element) {
        element.addEventListener('keydown', this.boundHandler);
    }

    /**
     * Detach from an element
     * @param {Element} element - Element to detach from
     */
    detach(element) {
        element.removeEventListener('keydown', this.boundHandler);
    }

    /**
     * Enable shortcut handling
     */
    enable() {
        this.enabled = true;
    }

    /**
     * Disable shortcut handling
     */
    disable() {
        this.enabled = false;
    }

    /**
     * Clear all shortcuts
     */
    clear() {
        this.shortcuts.clear();
    }
}

/**
 * Check if an event is for a printable character
 * @param {KeyboardEvent} event - Keyboard event
 * @returns {boolean}
 */
export function isPrintableKey(event) {
    // Single character keys are printable
    if (event.key.length === 1) {
        // But not if modifier keys are pressed (except shift)
        return !event.ctrlKey && !event.metaKey && !event.altKey;
    }
    return false;
}

/**
 * Check if an event is for a navigation key
 * @param {KeyboardEvent} event - Keyboard event
 * @returns {boolean}
 */
export function isNavigationKey(event) {
    const navKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'];
    return navKeys.includes(event.key);
}

/**
 * Check if an event is for an editing key
 * @param {KeyboardEvent} event - Keyboard event
 * @returns {boolean}
 */
export function isEditingKey(event) {
    const editKeys = ['Backspace', 'Delete', 'Enter', 'Tab'];
    return editKeys.includes(event.key);
}
