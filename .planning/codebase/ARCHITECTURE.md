# Architecture

**Analysis Date:** 2026-03-02

## Pattern Overview

**Overall:** Modular Plugin-based Architecture

**Key Characteristics:**
- **Manager-driven**: Centralized managers for plugins, events, commands, and selection.
- **Plugin-centric**: All editor features (bold, image, table) are implemented as decoupled plugins.
- **Event-driven**: Uses an internal event system for communication between components.

## Layers

**Core Layer:**
- Purpose: Orchestrates the editor lifecycle and provides shared services.
- Location: `src/core/`
- Contains: `rte.js`, `plugin-manager.js`, `event-manager.js`, `selection-manager.js`
- Depends on: Utils

**Plugin Layer:**
- Purpose: Implements specific rich-text features.
- Location: `src/plugins/`
- Contains: `formatting/`, `media/`, `table/`, `utilities/`
- Depends on: Core Layer

**UI Layer:**
- Purpose: Handles the visual representation (Toolbar, Modals, Dropdowns).
- Location: `src/ui/`
- Contains: `toolbar-manager.js`, `modal.js`, `dropdown.js`
- Depends on: Core Layer

## Data Flow

**Command Execution:**
1. User interacts with UI (e.g., clicks 'Bold').
2. UI calls `command-manager.js`.
3. `command-manager.js` executes the command on the current selection.
4. `rte.js` updates the `contenteditable` area.
5. Events are fired via `event-manager.js` to notify other plugins (e.g., toolbar state update).

**State Management:**
- The DOM is the primary source of truth (via `contenteditable`).
- Editor state is tracked via `data-manager.js` and selection state via `selection-manager.js`.

## Key Abstractions

**Plugin:**
- Purpose: Interface for adding functionality to the editor.
- Examples: `src/plugins/media/image.plugin.js`
- Pattern: Object with `init` and `register` methods.

## Entry Points

**Main Editor Class:**
- Location: `src/core/rte.js`
- Triggers: Instantiated by the consuming app.
- Responsibilities: Initialization, mounting to DOM, coordinating managers.

---

*Architecture analysis: 2026-03-02*
