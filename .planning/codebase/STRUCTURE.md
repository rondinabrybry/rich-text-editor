# Codebase Structure

**Analysis Date:** 2026-03-02

## Directory Layout

```
rte-package/
├── demo/               # Demo application for testing
├── src/                # Library source code
│   ├── core/           # Central logic and managers
│   ├── ui/             # Reusable UI components
│   ├── plugins/        # Individual feature modules
│   │   ├── formatting/ # Bold, Italic, etc.
│   │   ├── media/      # Image, Video
│   │   ├── table/      # Table manipulation
│   │   └── utilities/  # Search, Fullscreen, etc.
│   ├── styles/         # CSS for editor and UI
│   └── utils/          # Shared helper functions
└── package.json        # Project manifest
```

## Directory Purposes

**src/core:**
- Purpose: The "brain" of the editor.
- Key files: `rte.js`, `plugin-manager.js`, `selection-manager.js`

**src/plugins:**
- Purpose: Encapsulated features.
- Key files: `index.js` (registry), `image.plugin.js`, `table.plugin.js`

## Naming Conventions

**Files:**
- lowercase-with-hyphens.js (e.g., `image.plugin.js`, `event-manager.js`)

## Where to Add New Code

**New Feature/Plugin:**
- Primary code: `src/plugins/<category>/new-feature.plugin.js`
- Register in: `src/plugins/index.js`

**New UI Component:**
- Implementation: `src/ui/new-component.js`
- Style in: `src/styles/advanced.css`

---

*Structure analysis: 2026-03-02*
