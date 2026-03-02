/**
 * DataManager - Content management for the RTE
 * Handles getting, setting, and sanitizing editor content
 */
export class DataManager {
    constructor(editor) {
        this.editor = editor;

        // Default allowed tags and attributes for sanitization
        this.allowedTags = [
            'p', 'br', 'b', 'strong', 'i', 'em', 'u', 's', 'strike', 'del',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li',
            'blockquote', 'pre', 'code',
            'a', 'img', 'video', 'iframe',
            'table', 'thead', 'tbody', 'tr', 'th', 'td',
            'div', 'span', 'hr',
            'sub', 'sup'
        ];

        this.allowedAttributes = {
            'a': ['href', 'target', 'rel', 'title'],
            'img': ['src', 'alt', 'width', 'height', 'title'],
            'video': ['src', 'width', 'height', 'controls', 'poster'],
            'iframe': ['src', 'width', 'height', 'frameborder', 'allowfullscreen'],
            'td': ['colspan', 'rowspan'],
            'th': ['colspan', 'rowspan'],
            '*': ['style', 'class']
        };
    }

    /**
     * Get the HTML content of the editor
     * @param {boolean} sanitize - Whether to sanitize the output
     * @returns {string} HTML content
     */
    getContent(sanitize = false) {
        let content = this.editor.contentArea.innerHTML;

        if (sanitize) {
            content = this.sanitize(content);
        }

        return content.trim();
    }

    /**
     * Set the HTML content of the editor
     * @param {string} html - HTML content to set
     * @param {boolean} sanitize - Whether to sanitize the input
     */
    setContent(html, sanitize = true) {
        if (sanitize) {
            html = this.sanitize(html);
        }

        this.editor.contentArea.innerHTML = html || '<p><br></p>';
        this.editor.events.emit('content:set', { content: html });
        this.editor.events.emit('content:change');
    }

    /**
     * Get the text content (no HTML)
     * @returns {string}
     */
    getText() {
        return this.editor.contentArea.textContent || '';
    }

    /**
     * Set plain text content
     * @param {string} text - Plain text to set
     */
    setText(text) {
        // Escape HTML and wrap in paragraph
        const escaped = this.escapeHTML(text);
        const html = escaped.split('\n').map(line => `<p>${line || '<br>'}</p>`).join('');
        this.setContent(html, false);
    }

    /**
     * Check if the editor is empty
     * @returns {boolean}
     */
    isEmpty() {
        const text = this.getText().trim();
        return text === '' || text === '\n';
    }

    /**
     * Clear all content
     */
    clear() {
        this.setContent('<p><br></p>', false);
    }

    /**
     * Get word count
     * @returns {number}
     */
    getWordCount() {
        const text = this.getText().trim();
        if (!text) return 0;
        return text.split(/\s+/).filter(word => word.length > 0).length;
    }

    /**
     * Get character count
     * @param {boolean} excludeSpaces - Exclude spaces from count
     * @returns {number}
     */
    getCharacterCount(excludeSpaces = false) {
        let text = this.getText();
        if (excludeSpaces) {
            text = text.replace(/\s/g, '');
        }
        return text.length;
    }

    /**
     * Sanitize HTML content to prevent XSS
     * @param {string} html - HTML to sanitize
     * @returns {string} Sanitized HTML
     */
    sanitize(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        this.sanitizeNode(doc.body);

        return doc.body.innerHTML;
    }

    /**
     * Recursively sanitize a DOM node
     * @param {Node} node - Node to sanitize
     */
    sanitizeNode(node) {
        const childNodes = Array.from(node.childNodes);

        for (const child of childNodes) {
            if (child.nodeType === Node.ELEMENT_NODE) {
                const tagName = child.tagName.toLowerCase();

                // Remove disallowed tags but keep content
                if (!this.allowedTags.includes(tagName)) {
                    const fragment = document.createDocumentFragment();
                    while (child.firstChild) {
                        fragment.appendChild(child.firstChild);
                    }
                    child.parentNode.replaceChild(fragment, child);
                    continue;
                }

                // Remove disallowed attributes
                const attributes = Array.from(child.attributes);
                const allowedForTag = this.allowedAttributes[tagName] || [];
                const allowedGlobal = this.allowedAttributes['*'] || [];

                for (const attr of attributes) {
                    if (!allowedForTag.includes(attr.name) && !allowedGlobal.includes(attr.name)) {
                        child.removeAttribute(attr.name);
                    }

                    // Sanitize href/src for javascript: URLs
                    if (['href', 'src'].includes(attr.name)) {
                        const value = attr.value.toLowerCase().trim();
                        if (value.startsWith('javascript:') || value.startsWith('data:text/html')) {
                            child.removeAttribute(attr.name);
                        }
                    }

                    // Sanitize style attribute
                    if (attr.name === 'style') {
                        const sanitizedStyle = this.sanitizeStyle(attr.value);
                        if (sanitizedStyle) {
                            child.setAttribute('style', sanitizedStyle);
                        } else {
                            child.removeAttribute('style');
                        }
                    }
                }

                // Recursively sanitize children
                this.sanitizeNode(child);
            } else if (child.nodeType === Node.COMMENT_NODE) {
                // Remove comments
                child.parentNode.removeChild(child);
            }
        }
    }

    /**
     * Sanitize inline style attribute
     * @param {string} style - Style string
     * @returns {string} Sanitized style
     */
    sanitizeStyle(style) {
        const allowedProperties = [
            'color', 'background-color', 'background',
            'font-size', 'font-family', 'font-weight', 'font-style',
            'text-align', 'text-decoration',
            'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
            'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
            'border', 'border-color', 'border-width', 'border-style',
            'width', 'height', 'max-width', 'max-height',
            'display', 'float', 'clear'
        ];

        const sanitized = [];
        const declarations = style.split(';');

        for (const declaration of declarations) {
            const [property, value] = declaration.split(':').map(s => s.trim().toLowerCase());

            if (property && value && allowedProperties.includes(property)) {
                // Check for url() or expression() which could be malicious
                if (!value.includes('url(') && !value.includes('expression(') && !value.includes('javascript:')) {
                    sanitized.push(`${property}: ${value}`);
                }
            }
        }

        return sanitized.join('; ');
    }

    /**
     * Escape HTML special characters
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Insert HTML at the current cursor position
     * @param {string} html - HTML to insert
     */
    insertHTML(html) {
        this.editor.focus();
        document.execCommand('insertHTML', false, html);
        this.editor.events.emit('content:change');
    }

    /**
     * Insert text at the current cursor position
     * @param {string} text - Text to insert
     */
    insertText(text) {
        this.editor.focus();
        document.execCommand('insertText', false, text);
        this.editor.events.emit('content:change');
    }
}
