/**
 * RTE - Rich Text Editor Package
 * Main entry point
 */

import { RTE } from './core/rte.js';
import { EventManager } from './core/event-manager.js';
import { PluginManager } from './core/plugin-manager.js';
import { CommandManager } from './core/command-manager.js';
import { SelectionManager } from './core/selection-manager.js';
import { DataManager } from './core/data-manager.js';
import { ToolbarManager } from './core/toolbar-manager.js';
import { Icons, getIcon } from './icons/icons.js';

// Export all modules
export {
    RTE,
    EventManager,
    PluginManager,
    CommandManager,
    SelectionManager,
    DataManager,
    ToolbarManager,
    Icons,
    getIcon
};

export * from './plugins/index.js';

// Export RTE as default
export default RTE;

// Make RTE available globally for non-module usage
if (typeof window !== 'undefined') {
    window.RTE = RTE;
}
