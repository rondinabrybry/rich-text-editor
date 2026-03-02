/**
 * EventManager - Custom event system for the RTE
 * Provides event registration, emission, and namespaced events support
 */
export class EventManager {
    constructor() {
        this.events = new Map();
    }

    /**
     * Register an event listener
     * @param {string} event - Event name (supports namespaced events like 'content:change')
     * @param {Function} callback - Callback function
     * @param {Object} options - Options { once: boolean }
     * @returns {Function} Unsubscribe function
     */
    on(event, callback, options = {}) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }

        const listener = {
            callback,
            once: options.once || false
        };

        this.events.get(event).push(listener);

        // Return unsubscribe function
        return () => this.off(event, callback);
    }

    /**
     * Register a one-time event listener
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    once(event, callback) {
        return this.on(event, callback, { once: true });
    }

    /**
     * Remove an event listener
     * @param {string} event - Event name
     * @param {Function} callback - Callback function to remove
     */
    off(event, callback) {
        if (!this.events.has(event)) return;

        const listeners = this.events.get(event);
        const index = listeners.findIndex(l => l.callback === callback);
        
        if (index > -1) {
            listeners.splice(index, 1);
        }

        if (listeners.length === 0) {
            this.events.delete(event);
        }
    }

    /**
     * Emit an event with optional data
     * @param {string} event - Event name
     * @param {*} data - Data to pass to listeners
     */
    emit(event, data = null) {
        if (!this.events.has(event)) return;

        const listeners = this.events.get(event).slice(); // Copy to avoid mutation during iteration

        listeners.forEach(listener => {
            try {
                listener.callback(data);
            } catch (error) {
                console.error(`Error in event listener for "${event}":`, error);
            }

            if (listener.once) {
                this.off(event, listener.callback);
            }
        });

        // Also emit to wildcard listeners
        if (event !== '*' && this.events.has('*')) {
            this.events.get('*').forEach(listener => {
                try {
                    listener.callback({ event, data });
                } catch (error) {
                    console.error(`Error in wildcard listener:`, error);
                }
            });
        }
    }

    /**
     * Remove all listeners for an event or all events
     * @param {string} event - Optional event name
     */
    clear(event = null) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
    }

    /**
     * Get the number of listeners for an event
     * @param {string} event - Event name
     * @returns {number} Number of listeners
     */
    listenerCount(event) {
        return this.events.has(event) ? this.events.get(event).length : 0;
    }
}
