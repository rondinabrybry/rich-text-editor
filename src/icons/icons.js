/**
 * SVG Icons for the RTE toolbar
 * Each icon is an SVG string that can be inserted into toolbar buttons
 */
export const Icons = {
    // Text Formatting
    bold: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
    </svg>`,

    italic: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/>
    </svg>`,

    underline: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/>
    </svg>`,

    strikethrough: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/>
    </svg>`,

    subscript: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M22 18h-2v1h3v1h-4v-2.5c0-.28.22-.5.5-.5H21v-1h-3v-1h3.5c.28 0 .5.22.5.5V18zM5.88 18h2.66l3.4-5.42h.12l3.4 5.42h2.66l-4.65-7.27L17.81 4h-2.68l-3.07 4.99h-.12L8.87 4H6.19l4.32 6.73L5.88 18z"/>
    </svg>`,

    superscript: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M22 7h-2v1h3v1h-4V6.5c0-.28.22-.5.5-.5H21V5h-3V4h3.5c.28 0 .5.22.5.5V7zM5.88 20h2.66l3.4-5.42h.12l3.4 5.42h2.66l-4.65-7.27L17.81 6h-2.68l-3.07 4.99h-.12L8.87 6H6.19l4.32 6.73L5.88 20z"/>
    </svg>`,

    // Block Formatting
    heading: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M5 4v3h5.5v12h3V7H19V4z"/>
    </svg>`,

    paragraph: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M9 10.5c-1.93 0-3.5-1.57-3.5-3.5S7.07 3.5 9 3.5h8V21h-2V5.5h-2V21h-2V10.5z"/>
    </svg>`,

    blockquote: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z"/>
    </svg>`,

    codeBlock: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
    </svg>`,

    horizontalRule: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M4 11h16v2H4z"/>
    </svg>`,

    // Lists
    bulletList: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>
    </svg>`,

    orderedList: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/>
    </svg>`,

    indent: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/>
    </svg>`,

    outdent: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/>
    </svg>`,

    // Alignment
    alignLeft: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/>
    </svg>`,

    alignCenter: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/>
    </svg>`,

    alignRight: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/>
    </svg>`,

    alignJustify: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zM3 3v2h18V3H3z"/>
    </svg>`,

    // Media
    link: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
    </svg>`,

    unlink: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.43-.98 2.63-2.31 2.98l1.46 1.46C20.88 15.61 22 13.95 22 12c0-2.76-2.24-5-5-5zm-1 4h-2.19l2 2H16v-2zM2 4.27l3.11 3.11C3.29 8.12 2 9.91 2 12c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07L8.73 11H8v2h2.73L13 15.27V17h1.73l4.01 4L20 19.74 3.27 3 2 4.27z"/>
    </svg>`,

    image: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
    </svg>`,

    video: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
    </svg>`,

    // Table
    table: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M20 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM10 17H5v-2h5v2zm0-4H5v-2h5v2zm0-4H5V7h5v2zm9 8h-5v-2h5v2zm0-4h-5v-2h5v2zm0-4h-5V7h5v2z"/>
    </svg>`,

    // Colors
    textColor: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/>
        <rect x="3" y="19" width="18" height="3" fill="currentColor"/>
    </svg>`,

    backgroundColor: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"/>
        <rect x="3" y="19" width="18" height="3" fill="currentColor"/>
    </svg>`,

    // History
    undo: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
    </svg>`,

    redo: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/>
    </svg>`,

    // Utilities
    fullscreen: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
    </svg>`,

    exitFullscreen: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
    </svg>`,

    sourceCode: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
    </svg>`,

    clearFormatting: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.55 5.27 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"/>
    </svg>`,

    findReplace: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z"/>
    </svg>`,

    // Font
    fontFamily: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M9 4v3h5v12h3V7h5V4H9zm-7 7h3v10h3V11h3V8H2v3z"/>
    </svg>`,

    fontSize: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M9 4v3h5v12h3V7h5V4H9zm-7 7h3v10h3V11h3V8H2v3z"/>
    </svg>`,

    // Dropdown arrow
    dropdownArrow: `<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
        <path d="M7 10l5 5 5-5z"/>
    </svg>`,

    // Close
    close: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>`,

    // Check
    check: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>`,

    // More/menu
    more: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>`
};

/**
 * Get an icon by name
 * @param {string} name - Icon name
 * @returns {string} SVG string
 */
export function getIcon(name) {
    return Icons[name] || '';
}
