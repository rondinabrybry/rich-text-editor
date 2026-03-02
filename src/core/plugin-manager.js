/**
 * PluginManager - Handles plugin registration and lifecycle
 * Manages plugin initialization, dependencies, and destruction
 */
export class PluginManager {
    constructor(editor) {
        this.editor = editor;
        this.plugins = new Map();
        this.pluginInstances = new Map();
    }

    /**
     * Register a plugin class
     * @param {string} name - Plugin name
     * @param {Class} PluginClass - Plugin class
     */
    register(name, PluginClass) {
        if (this.plugins.has(name)) {
            console.warn(`Plugin "${name}" is already registered. Overwriting.`);
        }
        this.plugins.set(name, PluginClass);
    }

    /**
     * Initialize a registered plugin
     * @param {string} name - Plugin name
     * @param {Object} config - Plugin configuration
     * @returns {Object} Plugin instance
     */
    init(name, config = {}) {
        if (!this.plugins.has(name)) {
            throw new Error(`Plugin "${name}" is not registered.`);
        }

        if (this.pluginInstances.has(name)) {
            console.warn(`Plugin "${name}" is already initialized.`);
            return this.pluginInstances.get(name);
        }

        const PluginClass = this.plugins.get(name);

        // Check dependencies
        if (PluginClass.dependencies) {
            for (const dep of PluginClass.dependencies) {
                if (!this.pluginInstances.has(dep)) {
                    throw new Error(`Plugin "${name}" requires "${dep}" to be initialized first.`);
                }
            }
        }

        const instance = new PluginClass(this.editor, config);
        this.pluginInstances.set(name, instance);

        // Initialize the plugin
        if (typeof instance.init === 'function') {
            instance.init();
        }

        this.editor.events.emit('plugin:init', { name, instance });

        return instance;
    }

    /**
     * Initialize multiple plugins
     * @param {Array<string|Object>} plugins - Array of plugin names or { name, config } objects
     */
    initAll(plugins) {
        for (const plugin of plugins) {
            if (typeof plugin === 'string') {
                this.init(plugin);
            } else if (typeof plugin === 'object' && plugin.name) {
                this.init(plugin.name, plugin.config || {});
            }
        }
    }

    /**
     * Get a plugin instance
     * @param {string} name - Plugin name
     * @returns {Object|null} Plugin instance or null
     */
    get(name) {
        return this.pluginInstances.get(name) || null;
    }

    /**
     * Check if a plugin is registered
     * @param {string} name - Plugin name
     * @returns {boolean}
     */
    has(name) {
        return this.plugins.has(name);
    }

    /**
     * Check if a plugin is initialized
     * @param {string} name - Plugin name
     * @returns {boolean}
     */
    isInitialized(name) {
        return this.pluginInstances.has(name);
    }

    /**
     * Destroy a plugin instance
     * @param {string} name - Plugin name
     */
    destroy(name) {
        const instance = this.pluginInstances.get(name);
        if (instance) {
            if (typeof instance.destroy === 'function') {
                instance.destroy();
            }
            this.pluginInstances.delete(name);
            this.editor.events.emit('plugin:destroy', { name });
        }
    }

    /**
     * Destroy all plugin instances
     */
    destroyAll() {
        for (const name of this.pluginInstances.keys()) {
            this.destroy(name);
        }
    }

    /**
     * Get all initialized plugin names
     * @returns {Array<string>}
     */
    getInitializedPlugins() {
        return Array.from(this.pluginInstances.keys());
    }

    /**
     * Get all registered plugin names
     * @returns {Array<string>}
     */
    getRegisteredPlugins() {
        return Array.from(this.plugins.keys());
    }
}
