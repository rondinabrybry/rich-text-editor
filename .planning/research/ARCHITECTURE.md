# Rich Text Editor Architecture

**Analysis Date:** 2026-03-02

## System Layers

### 1. View Layer (DOM)
The physical `contenteditable` container. Interaction is monitored via event listeners.

### 2. Controller Layer (Managers)
- **Selection Manager**: Maintains Range/Selection state across context resets.
- **Command Manager**: Decouples UI actions from DOM manipulation.
- **Plugin Manager**: Dynamically loads features into the core editor loop.

### 3. Data Layer
- Transition point: Moving from raw DOM to a light **Virtual DOM** or **JSON Abstract Syntax Tree (AST)** for consistent rendering.

---

*Architecture research: 2026-03-02*
