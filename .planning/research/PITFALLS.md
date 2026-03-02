# Rich Text Editor Pitfalls

**Analysis Date:** 2026-03-02

## Critical Risks

### 1. Browser Fragmentation
Different browsers (Chrome vs Safari) handle `execCommand` and list rendering differently.
- **Prevention**: Use modern Range API + custom DOM manipulation where possible.

### 2. Selection Loss
Focus shifts to the toolbar or modals can clear the editor's cursor position.
- **Prevention**: Capture and cache the Range on `mousedown` or `beforeblur`.

### 3. Dirty HTML
Browsers inject unexpected styles or tags (`<font>`, `<span>`) when copying/pasting.
- **Prevention**: Strict HTML sanitation on input/paste events.

---

*Pitfalls research: 2026-03-02*
