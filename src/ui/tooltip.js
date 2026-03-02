/**
 * Tooltip - Tooltip component for toolbar buttons
 */
export class Tooltip {
    constructor() {
        this.element = null;
        this.timeout = null;
        this.currentTarget = null;

        this.create();
    }

    /**
     * Create the tooltip element
     */
    create() {
        this.element = document.createElement('div');
        this.element.className = 'rte-tooltip';
        document.body.appendChild(this.element);
    }

    /**
     * Show tooltip for an element
     * @param {HTMLElement} target - Element to show tooltip for
     * @param {string} text - Tooltip text
     * @param {Object} options - Position options
     */
    show(target, text, options = {}) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.currentTarget = target;
        this.element.textContent = text;

        const rect = target.getBoundingClientRect();
        const tooltipRect = this.element.getBoundingClientRect();

        let top, left;

        const position = options.position || 'bottom';

        switch (position) {
            case 'top':
                top = rect.top - tooltipRect.height - 8;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
            default:
                top = rect.bottom + 8;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.left - tooltipRect.width - 8;
                break;
            case 'right':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.right + 8;
                break;
        }

        // Keep tooltip in viewport
        const padding = 8;
        left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));
        top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));

        this.element.style.top = `${top}px`;
        this.element.style.left = `${left}px`;
        this.element.classList.add('rte-tooltip-visible');
    }

    /**
     * Hide the tooltip
     */
    hide() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.element.classList.remove('rte-tooltip-visible');
        this.currentTarget = null;
    }

    /**
     * Show tooltip with delay
     * @param {HTMLElement} target
     * @param {string} text
     * @param {number} delay
     */
    showDelayed(target, text, delay = 500) {
        this.timeout = setTimeout(() => {
            this.show(target, text);
        }, delay);
    }

    /**
     * Attach tooltip behavior to elements
     * @param {HTMLElement} container - Container with tooltip targets
     * @param {string} selector - Selector for tooltip targets
     * @param {Function} getText - Function to get tooltip text from element
     */
    attach(container, selector, getText) {
        container.addEventListener('mouseenter', (e) => {
            const target = e.target.closest(selector);
            if (target) {
                const text = getText(target);
                if (text) {
                    this.showDelayed(target, text);
                }
            }
        }, true);

        container.addEventListener('mouseleave', (e) => {
            const target = e.target.closest(selector);
            if (target) {
                this.hide();
            }
        }, true);

        container.addEventListener('mousedown', () => {
            this.hide();
        });
    }

    /**
     * Destroy the tooltip
     */
    destroy() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

// Singleton instance
let tooltipInstance = null;

/**
 * Get the global tooltip instance
 * @returns {Tooltip}
 */
export function getTooltip() {
    if (!tooltipInstance) {
        tooltipInstance = new Tooltip();
    }
    return tooltipInstance;
}

export default Tooltip;
