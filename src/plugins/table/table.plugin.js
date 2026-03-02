import { Modal } from '../../ui/modal.js';
import { getIcon } from '../../icons/icons.js';

/**
 * TablePlugin - Table management
 */
export class TablePlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        this.editor.commands.register('table', {
            execute: () => this.openTableModal(),
            isActive: () => this.editor.selection.isWithinTag('table'),
            isEnabled: () => true
        });

        // Add table context menu (simplified as buttons for now)
        // In a real contextual menu system, this would be different
    }

    openTableModal() {
        const selection = this.editor.selection;
        selection.save();

        const content = document.createElement('div');
        content.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="rte-form-group">
                    <label class="rte-form-label">Rows</label>
                    <input type="number" class="rte-form-input" id="rte-table-rows" value="3" min="1" max="20">
                </div>
                <div class="rte-form-group">
                    <label class="rte-form-label">Columns</label>
                    <input type="number" class="rte-form-input" id="rte-table-cols" value="3" min="1" max="10">
                </div>
            </div>
            <div class="rte-form-group" style="margin-top: 15px;">
                <label class="rte-form-checkbox">
                    <input type="checkbox" id="rte-table-header">
                    <span>Include Header Row</span>
                </label>
            </div>
        `;

        const modal = new Modal({
            title: 'Insert Table',
            content: content,
            width: '350px',
            buttons: [
                {
                    text: 'Cancel',
                    onClick: () => {
                        modal.close();
                        selection.restore();
                    }
                },
                {
                    text: 'Insert',
                    primary: true,
                    onClick: () => {
                        const rows = parseInt(content.querySelector('#rte-table-rows').value);
                        const cols = parseInt(content.querySelector('#rte-table-cols').value);
                        const hasHeader = content.querySelector('#rte-table-header').checked;

                        if (rows > 0 && cols > 0) {
                            this.insertTable(rows, cols, hasHeader);
                            modal.close();
                            selection.restore();
                        }
                    }
                }
            ]
        });

        modal.open();
    }

    insertTable(rows, cols, hasHeader) {
        this.editor.focus();

        let html = '<table style="width: 100%; border-collapse: collapse;">';

        if (hasHeader) {
            html += '<thead><tr>';
            for (let j = 0; j < cols; j++) {
                html += '<th style="border: 1px solid #e5e7eb; padding: 8px; background: #f9fafb;">Header</th>';
            }
            html += '</tr></thead>';
        }

        html += '<tbody>';
        for (let i = 0; i < rows; i++) {
            html += '<tr>';
            for (let j = 0; j < cols; j++) {
                html += '<td style="border: 1px solid #e5e7eb; padding: 8px;">Cell</td>';
            }
            html += '</tr>';
        }
        html += '</tbody></table><p><br></p>';

        this.editor.data.insertHTML(html);
    }

    // Future expansion: Add context menu for Add Row/Col here
}
