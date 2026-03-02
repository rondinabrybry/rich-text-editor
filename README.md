# RTE - Rich Text Editor

A modern, modular, CKEditor-like rich text editor built with pure JavaScript.

![RTE Demo](demo/screenshot.png)

## Features

- 🎨 **Rich Text Formatting** - Bold, italic, underline, strikethrough, subscript, superscript
- 📝 **Block Formatting** - Headings (H1-H6), paragraphs, blockquotes, code blocks
- 📋 **Lists** - Ordered and unordered lists with indent/outdent
- 🎯 **Text Alignment** - Left, center, right, justify
- 🔗 **Links & Media** - Insert links and images
- 🎨 **Colors** - Text color and background color pickers
- ↩️ **History** - Undo/redo with keyboard shortcuts
- 🔌 **Plugin System** - Extensible architecture for custom features
- ⚡ **Zero Dependencies** - Pure vanilla JavaScript
- ♿ **Accessible** - Keyboard navigation and ARIA attributes
- 📱 **Responsive** - Works on desktop and mobile devices

## Quick Start

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="src/styles/rte.css">
</head>
<body>
    <div id="editor"></div>
    
    <script type="module">
        import RTE from './src/index.js';
        
        const editor = new RTE('#editor', {
            placeholder: 'Start typing...',
            minHeight: 300
        });
    </script>
</body>
</html>
```

### With Textarea

```html
<textarea id="my-editor"></textarea>

<script type="module">
    import RTE from './src/index.js';
    
    const editor = new RTE('#my-editor');
    
    // The textarea will be synced automatically
</script>
```

## Configuration Options

```javascript
const editor = new RTE('#editor', {
    // Toolbar configuration
    toolbar: [
        'bold', 'italic', 'underline', '|',
        'heading', '|',
        'bulletList', 'orderedList', '|',
        'link', 'image', '|',
        'undo', 'redo'
    ],
    
    // Placeholder text
    placeholder: 'Start typing...',
    
    // Height settings
    height: 'auto',      // or number in pixels
    minHeight: 200,      // minimum height
    maxHeight: 500,      // maximum height (enables scrolling)
    
    // Readonly mode
    readonly: false,
    
    // Auto focus on init
    autofocus: false,
    
    // Sanitize content (XSS protection)
    sanitize: true,
    
    // Additional plugins
    plugins: []
});
```

## Toolbar Items

| Item | Description |
|------|-------------|
| `bold` | Bold text (Ctrl+B) |
| `italic` | Italic text (Ctrl+I) |
| `underline` | Underline text (Ctrl+U) |
| `strikethrough` | Strikethrough text |
| `subscript` | Subscript text |
| `superscript` | Superscript text |
| `heading` | Heading dropdown (H1-H6) |
| `paragraph` | Paragraph format |
| `blockquote` | Block quote |
| `codeBlock` | Code block |
| `horizontalRule` | Horizontal line |
| `bulletList` | Unordered list |
| `orderedList` | Ordered list |
| `indent` | Increase indent |
| `outdent` | Decrease indent |
| `alignLeft` | Align left |
| `alignCenter` | Align center |
| `alignRight` | Align right |
| `alignJustify` | Justify |
| `link` | Insert/edit link |
| `unlink` | Remove link |
| `image` | Insert image |
| `textColor` | Text color picker |
| `backgroundColor` | Background color picker |
| `undo` | Undo (Ctrl+Z) |
| `redo` | Redo (Ctrl+Y) |
| `clearFormatting` | Remove formatting |
| `\|` | Separator |

## API Reference

### Getting/Setting Content

```javascript
// Get HTML content
const html = editor.getContent();

// Get sanitized HTML content
const safeHtml = editor.getContent(true);

// Set HTML content
editor.setContent('<p>Hello World</p>');

// Get plain text
const text = editor.getText();

// Set plain text
editor.setText('Hello World');

// Clear content
editor.clear();

// Check if empty
const isEmpty = editor.isEmpty();
```

### Word & Character Count

```javascript
// Get word count
const words = editor.getWordCount();

// Get character count
const chars = editor.getCharacterCount();

// Get character count without spaces
const charsNoSpaces = editor.getCharacterCount(true);
```

### Focus Management

```javascript
// Focus the editor
editor.focus();

// Blur the editor
editor.blur();

// Check if focused
const hasFocus = editor.hasFocus();
```

### Readonly Mode

```javascript
// Set readonly
editor.setReadonly(true);

// Check readonly state
const isReadonly = editor.isReadonly();
```

### Events

```javascript
// Content changed
editor.on('content:change', () => {
    console.log('Content changed');
});

// Editor focused
editor.on('focus', () => {
    console.log('Editor focused');
});

// Editor blurred
editor.on('blur', () => {
    console.log('Editor blurred');
});

// Editor ready
editor.on('ready', () => {
    console.log('Editor is ready');
});

// Remove listener
const unsubscribe = editor.on('content:change', handler);
unsubscribe(); // Remove the listener
```

### Execute Commands

```javascript
// Execute a formatting command
editor.execute('bold');
editor.execute('italic');

// Execute with value
editor.execute('heading', 'h2');
editor.execute('textColor', '#ff0000');

// Register custom command
editor.registerCommand('myCommand', {
    execute: (value) => {
        // Your command logic
    },
    isActive: () => {
        // Return true if command is active
        return false;
    },
    isEnabled: () => {
        // Return true if command is enabled
        return true;
    }
});
```

### Destroy

```javascript
// Destroy the editor
editor.destroy();
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+B | Bold |
| Ctrl+I | Italic |
| Ctrl+U | Underline |
| Ctrl+K | Insert link |
| Ctrl+Z | Undo |
| Ctrl+Y | Redo |
| Ctrl+Shift+Z | Redo |

## Theming

The editor uses CSS custom properties for easy theming:

```css
:root {
    /* Colors */
    --rte-primary-color: #3b82f6;
    --rte-primary-hover: #2563eb;
    --rte-bg-color: #ffffff;
    --rte-text-color: #1f2937;
    --rte-border-color: #e5e7eb;
    
    /* Toolbar */
    --rte-toolbar-bg: #f9fafb;
    
    /* Buttons */
    --rte-button-hover: #e5e7eb;
    --rte-button-active: #dbeafe;
    
    /* Spacing */
    --rte-spacing-sm: 8px;
    --rte-spacing-md: 12px;
    --rte-spacing-lg: 16px;
    
    /* Border radius */
    --rte-radius-sm: 4px;
    --rte-radius-md: 6px;
    --rte-radius-lg: 8px;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Project Structure

```
RTE Package/
├── src/
│   ├── core/
│   │   ├── rte.js              # Main editor class
│   │   ├── event-manager.js    # Event system
│   │   ├── plugin-manager.js   # Plugin management
│   │   ├── command-manager.js  # Command handling
│   │   ├── selection-manager.js # Selection utilities
│   │   ├── data-manager.js     # Content management
│   │   └── toolbar-manager.js  # Toolbar creation
│   ├── icons/
│   │   └── icons.js            # SVG icons
│   ├── styles/
│   │   └── rte.css             # Editor styles
│   └── index.js                # Main entry point
├── demo/
│   └── index.html              # Demo page
├── package.json
└── README.md
```

## License

MIT License - feel free to use in personal and commercial projects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
