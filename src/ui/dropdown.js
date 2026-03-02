/**
 * Dropdown - Enhanced dropdown component
 */
export class Dropdown {
    constructor(options = {}) {
        this.options = {
            trigger: options.trigger || null,
            items: options.items || [],
            onSelect: options.onSelect || null,
            position: options.position || 'bottom-start',
            closeOnSelect: options.closeOnSelect !== false
        };

        this.wrapper = null;
        this.menu = null;
        this.isOpen = false;

        if (this.options.trigger) {
            this.create();
        }
    }

    /**
     * Create the dropdown DOM
     */
    create() {
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'rte-dropdown';

        this.menu = document.createElement('div');
        this.menu.className = 'rte-dropdown-menu';
        this.menu.setAttribute('role', 'menu');

        this.renderItems();

        this.wrapper.appendChild(this.options.trigger);
        this.wrapper.appendChild(this.menu);

        // Toggle on click
        this.options.trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggle();
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.wrapper.contains(e.target)) {
                this.close();
            }
        });
    }

    /**
     * Render dropdown items
     */
    renderItems() {
        this.menu.innerHTML = '';

        for (const item of this.options.items) {
            if (item.separator) {
                const separator = document.createElement('div');
                separator.className = 'rte-dropdown-separator';
                separator.style.cssText = `
                    height: 1px;
                    background-color: #e5e7eb;
                    margin: 4px 0;
                `;
                this.menu.appendChild(separator);
                continue;
            }

            const menuItem = document.createElement('button');
            menuItem.type = 'button';
            menuItem.className = 'rte-dropdown-item';
            menuItem.setAttribute('role', 'menuitem');

            if (item.icon) {
                const icon = document.createElement('span');
                icon.className = 'rte-dropdown-item-icon';
                icon.innerHTML = item.icon;
                icon.style.marginRight = '8px';
                menuItem.appendChild(icon);
            }

            const label = document.createElement('span');
            label.textContent = item.label;
            menuItem.appendChild(label);

            if (item.shortcut) {
                const shortcut = document.createElement('span');
                shortcut.className = 'rte-dropdown-item-shortcut';
                shortcut.textContent = item.shortcut;
                shortcut.style.cssText = `
                    margin-left: auto;
                    padding-left: 16px;
                    color: #9ca3af;
                    font-size: 12px;
                `;
                menuItem.appendChild(shortcut);
            }

            if (item.active) {
                menuItem.classList.add('rte-active');
            }

            if (item.disabled) {
                menuItem.disabled = true;
                menuItem.classList.add('rte-disabled');
            }

            menuItem.addEventListener('click', (e) => {
                e.preventDefault();

                if (item.disabled) return;

                if (item.onClick) {
                    item.onClick(item);
                }

                if (this.options.onSelect) {
                    this.options.onSelect(item);
                }

                if (this.options.closeOnSelect) {
                    this.close();
                }
            });

            this.menu.appendChild(menuItem);
        }
    }

    /**
     * Set dropdown items
     * @param {Array} items
     */
    setItems(items) {
        this.options.items = items;
        this.renderItems();
    }

    /**
     * Toggle dropdown
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Open dropdown
     */
    open() {
        this.wrapper.classList.add('rte-dropdown-open');
        this.options.trigger.setAttribute('aria-expanded', 'true');
        this.isOpen = true;
    }

    /**
     * Close dropdown
     */
    close() {
        this.wrapper.classList.remove('rte-dropdown-open');
        this.options.trigger.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
    }

    /**
     * Get the wrapper element
     * @returns {HTMLElement}
     */
    getElement() {
        return this.wrapper;
    }

    /**
     * Destroy the dropdown
     */
    destroy() {
        if (this.wrapper && this.wrapper.parentNode) {
            this.wrapper.parentNode.removeChild(this.wrapper);
        }
    }
}

export default Dropdown;
