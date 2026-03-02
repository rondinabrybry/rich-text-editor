/**
 * CommandManager - Manages editor commands
 * Handles command registration, execution, and state tracking
 */
export class CommandManager {
    constructor(editor) {
        this.editor = editor;
        this.commands = new Map();
    }

    /**
     * Register a command
     * @param {string} name - Command name
     * @param {Object} command - Command definition
     * @param {Function} command.execute - Execute function
     * @param {Function} command.isActive - Function to check if command is active
     * @param {Function} command.isEnabled - Function to check if command is enabled
     */
    register(name, command) {
        if (this.commands.has(name)) {
            console.warn(`Command "${name}" is already registered. Overwriting.`);
        }

        this.commands.set(name, {
            execute: command.execute || (() => { }),
            isActive: command.isActive || (() => false),
            isEnabled: command.isEnabled || (() => true),
            ...command
        });
    }

    /**
     * Execute a command
     * @param {string} name - Command name
     * @param {*} value - Optional value to pass to command
     * @returns {boolean} Whether the command was executed
     */
    execute(name, value = null) {
        const command = this.commands.get(name);

        if (!command) {
            console.warn(`Command "${name}" not found.`);
            return false;
        }

        if (!this.isEnabled(name)) {
            console.warn(`Command "${name}" is disabled.`);
            return false;
        }

        try {
            // Focus the editor before executing command
            this.editor.focus();

            command.execute(value);

            this.editor.events.emit('command:execute', { name, value });
            this.editor.events.emit('content:change');

            return true;
        } catch (error) {
            console.error(`Error executing command "${name}":`, error);
            return false;
        }
    }

    /**
     * Check if a command is active (e.g., bold is active when cursor is in bold text)
     * @param {string} name - Command name
     * @param {*} value - Optional value to check against
     * @returns {boolean}
     */
    isActive(name, value = null) {
        const command = this.commands.get(name);
        if (!command) return false;

        try {
            return command.isActive(value);
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if a command is enabled
     * @param {string} name - Command name
     * @param {*} value - Optional value to check against
     * @returns {boolean}
     */
    isEnabled(name, value = null) {
        const command = this.commands.get(name);
        if (!command) return false;

        try {
            return command.isEnabled(value);
        } catch (error) {
            return false;
        }
    }

    /**
     * Get state of a specific command
     * @param {string} name - Command name
     * @param {*} value - Optional value to check against
     * @returns {Object} { active: boolean, enabled: boolean }
     */
    getState(name, value = null) {
        return {
            active: this.isActive(name, value),
            enabled: this.isEnabled(name, value)
        };
    }

    /**
     * Get a command definition
     * @param {string} name - Command name
     * @returns {Object|null}
     */
    get(name) {
        return this.commands.get(name) || null;
    }

    /**
     * Check if a command exists
     * @param {string} name - Command name
     * @returns {boolean}
     */
    has(name) {
        return this.commands.has(name);
    }

    /**
     * Get all command names
     * @returns {Array<string>}
     */
    getAll() {
        return Array.from(this.commands.keys());
    }

    /**
     * Get command states for toolbar updates
     * @returns {Object} Object with command states
     */
    getStates() {
        const states = {};

        for (const [name, command] of this.commands) {
            states[name] = {
                active: this.isActive(name),
                enabled: this.isEnabled(name)
            };
        }

        return states;
    }
}
