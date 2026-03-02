/**
 * DOM Utilities for the RTE
 * Helper functions for DOM manipulation
 */

/**
 * Create an element with attributes and children
 * @param {string} tag - Tag name
 * @param {Object} attributes - Element attributes
 * @param {Array|string} children - Child elements or text content
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            const event = key.slice(2).toLowerCase();
            element.addEventListener(event, value);
        } else if (key === 'dataset' && typeof value === 'object') {
            Object.assign(element.dataset, value);
        } else {
            element.setAttribute(key, value);
        }
    }

    if (typeof children === 'string') {
        element.textContent = children;
    } else if (Array.isArray(children)) {
        for (const child of children) {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        }
    }

    return element;
}

/**
 * Query selector shorthand
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element
 * @returns {Element|null}
 */
export function $(selector, context = document) {
    return context.querySelector(selector);
}

/**
 * Query selector all shorthand
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element
 * @returns {NodeList}
 */
export function $$(selector, context = document) {
    return context.querySelectorAll(selector);
}

/**
 * Check if an element matches a selector
 * @param {Element} element - Element to check
 * @param {string} selector - CSS selector
 * @returns {boolean}
 */
export function matches(element, selector) {
    return element && element.matches && element.matches(selector);
}

/**
 * Find the closest ancestor matching a selector
 * @param {Element} element - Starting element
 * @param {string} selector - CSS selector
 * @returns {Element|null}
 */
export function closest(element, selector) {
    return element && element.closest ? element.closest(selector) : null;
}

/**
 * Get all ancestors of an element
 * @param {Element} element - Starting element
 * @param {Element} until - Stop at this element
 * @returns {Array<Element>}
 */
export function getAncestors(element, until = null) {
    const ancestors = [];
    let current = element.parentElement;

    while (current && current !== until) {
        ancestors.push(current);
        current = current.parentElement;
    }

    return ancestors;
}

/**
 * Check if an element contains another element
 * @param {Element} container - Container element
 * @param {Element} element - Element to check
 * @returns {boolean}
 */
export function contains(container, element) {
    return container && container.contains(element);
}

/**
 * Insert an element after another
 * @param {Element} newElement - Element to insert
 * @param {Element} referenceElement - Reference element
 */
export function insertAfter(newElement, referenceElement) {
    referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}

/**
 * Wrap an element with another element
 * @param {Element} element - Element to wrap
 * @param {Element} wrapper - Wrapper element
 * @returns {Element} The wrapper element
 */
export function wrap(element, wrapper) {
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
    return wrapper;
}

/**
 * Unwrap an element (remove parent but keep children)
 * @param {Element} element - Element whose parent to remove
 */
export function unwrap(element) {
    const parent = element.parentNode;
    const grandparent = parent.parentNode;

    while (parent.firstChild) {
        grandparent.insertBefore(parent.firstChild, parent);
    }

    grandparent.removeChild(parent);
}

/**
 * Remove an element from the DOM
 * @param {Element} element - Element to remove
 */
export function remove(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

/**
 * Empty an element (remove all children)
 * @param {Element} element - Element to empty
 */
export function empty(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * Get the offset of an element relative to the document
 * @param {Element} element - Element
 * @returns {Object} { top, left }
 */
export function getOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
    };
}

/**
 * Check if an element is visible in the viewport
 * @param {Element} element - Element to check
 * @returns {boolean}
 */
export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Set multiple styles on an element
 * @param {Element} element - Element
 * @param {Object} styles - Styles object
 */
export function setStyles(element, styles) {
    Object.assign(element.style, styles);
}

/**
 * Add multiple classes to an element
 * @param {Element} element - Element
 * @param {...string} classes - Classes to add
 */
export function addClass(element, ...classes) {
    element.classList.add(...classes);
}

/**
 * Remove multiple classes from an element
 * @param {Element} element - Element
 * @param {...string} classes - Classes to remove
 */
export function removeClass(element, ...classes) {
    element.classList.remove(...classes);
}

/**
 * Toggle a class on an element
 * @param {Element} element - Element
 * @param {string} className - Class to toggle
 * @param {boolean} force - Force add or remove
 * @returns {boolean} Whether the class is present
 */
export function toggleClass(element, className, force) {
    return element.classList.toggle(className, force);
}

/**
 * Check if an element has a class
 * @param {Element} element - Element
 * @param {string} className - Class to check
 * @returns {boolean}
 */
export function hasClass(element, className) {
    return element.classList.contains(className);
}

/**
 * Get computed style value
 * @param {Element} element - Element
 * @param {string} property - CSS property
 * @returns {string}
 */
export function getStyle(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
}

/**
 * Check if an element is a block-level element
 * @param {Element} element - Element to check
 * @returns {boolean}
 */
export function isBlockElement(element) {
    const blockTags = [
        'P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
        'UL', 'OL', 'LI', 'BLOCKQUOTE', 'PRE', 'TABLE',
        'THEAD', 'TBODY', 'TR', 'TD', 'TH', 'FIGURE',
        'FIGCAPTION', 'ARTICLE', 'SECTION', 'ASIDE',
        'HEADER', 'FOOTER', 'NAV', 'ADDRESS', 'HR'
    ];
    return blockTags.includes(element.tagName);
}

/**
 * Check if an element is an inline element
 * @param {Element} element - Element to check
 * @returns {boolean}
 */
export function isInlineElement(element) {
    return !isBlockElement(element);
}

/**
 * Get the text content of an element without child element text
 * @param {Element} element - Element
 * @returns {string}
 */
export function getDirectText(element) {
    let text = '';
    for (const node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            text += node.textContent;
        }
    }
    return text;
}
