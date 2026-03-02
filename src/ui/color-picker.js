/**
 * ColorPicker - Color picker component for the RTE
 */
export class ColorPicker {
    constructor(options = {}) {
        this.options = {
            colors: options.colors || this.getDefaultColors(),
            columns: options.columns || 8,
            onChange: options.onChange || null,
            value: options.value || null
        };

        this.element = null;
        this.selectedColor = this.options.value;

        this.create();
    }

    /**
     * Get default color palette
     * @returns {Array<string>}
     */
    getDefaultColors() {
        return [
            // Row 1 - Grays
            '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#ffffff',
            // Row 2 - Reds
            '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff',
            // Row 3 - Purples/Pinks
            '#9900ff', '#ff00ff', '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3',
            // Row 4 - Pastels
            '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc', '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599',
            // Row 5 - More colors
            '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd', '#cc4125', '#e06666',
            // Row 6 - Darker
            '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0'
        ];
    }

    /**
     * Create the color picker DOM
     */
    create() {
        this.element = document.createElement('div');
        this.element.className = 'rte-color-picker';
        this.element.style.cssText = `
            display: grid;
            grid-template-columns: repeat(${this.options.columns}, 24px);
            gap: 4px;
            padding: 8px;
        `;

        for (const color of this.options.colors) {
            const swatch = document.createElement('button');
            swatch.type = 'button';
            swatch.className = 'rte-color-swatch';
            swatch.style.cssText = `
                width: 24px;
                height: 24px;
                border: 1px solid #e5e7eb;
                border-radius: 4px;
                background-color: ${color};
                cursor: pointer;
                transition: transform 0.1s, box-shadow 0.1s;
            `;
            swatch.setAttribute('data-color', color);
            swatch.title = color;

            swatch.addEventListener('mouseenter', () => {
                swatch.style.transform = 'scale(1.1)';
                swatch.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            });

            swatch.addEventListener('mouseleave', () => {
                swatch.style.transform = '';
                swatch.style.boxShadow = '';
            });

            swatch.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectColor(color);
            });

            if (color === this.selectedColor) {
                swatch.style.outline = '2px solid #3b82f6';
                swatch.style.outlineOffset = '2px';
            }

            this.element.appendChild(swatch);
        }

        // Add custom color input
        const customWrapper = document.createElement('div');
        customWrapper.style.cssText = `
            grid-column: span ${this.options.columns};
            display: flex;
            gap: 8px;
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid #e5e7eb;
        `;

        const customInput = document.createElement('input');
        customInput.type = 'color';
        customInput.className = 'rte-custom-color-input';
        customInput.style.cssText = `
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            padding: 0;
        `;
        customInput.value = this.selectedColor || '#000000';

        const customLabel = document.createElement('span');
        customLabel.textContent = 'Custom color';
        customLabel.style.cssText = `
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #6b7280;
        `;

        customInput.addEventListener('input', (e) => {
            this.selectColor(e.target.value);
        });

        customWrapper.appendChild(customInput);
        customWrapper.appendChild(customLabel);
        this.element.appendChild(customWrapper);
    }

    /**
     * Select a color
     * @param {string} color
     */
    selectColor(color) {
        this.selectedColor = color;

        // Update swatch highlights
        const swatches = this.element.querySelectorAll('.rte-color-swatch');
        swatches.forEach(swatch => {
            if (swatch.dataset.color === color) {
                swatch.style.outline = '2px solid #3b82f6';
                swatch.style.outlineOffset = '2px';
            } else {
                swatch.style.outline = '';
                swatch.style.outlineOffset = '';
            }
        });

        if (this.options.onChange) {
            this.options.onChange(color);
        }
    }

    /**
     * Get the element
     * @returns {HTMLElement}
     */
    getElement() {
        return this.element;
    }

    /**
     * Get selected color
     * @returns {string|null}
     */
    getValue() {
        return this.selectedColor;
    }

    /**
     * Set value
     * @param {string} color
     */
    setValue(color) {
        this.selectColor(color);
    }
}

export default ColorPicker;
