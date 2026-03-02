import { Modal } from '../../ui/modal.js';

/**
 * ImagePlugin - Advanced image management
 */
export class ImagePlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        this.editor.commands.register('image', {
            execute: () => this.openImageModal(),
            isActive: () => this.editor.selection.isWithinTag('img'),
            isEnabled: () => true
        });

        // Register toolbar item
        this.editor.toolbarManager.registerItem('image', {
            type: 'button',
            command: 'image',
            tooltip: 'Insert Image',
            icon: 'image'
        });

        // Image Resize Listeners
        this.editor.contentArea.addEventListener('click', (e) => this.onContentClick(e));
        // Hide overlay on blur/interactions elsewhere
        document.addEventListener('click', (e) => {
            if (!this.editor.container.contains(e.target) && this.resizeOverlay) {
                this.hideResizeOverlay();
            }
        });
        this.resizeOverlay = null;
        this.activeImage = null;
    }

    openImageModal() {
        const selection = this.editor.selection;
        selection.save();

        // Check if editing existing image
        const existingImg = selection.getClosestElement('img');
        let src = '';
        let alt = '';
        let width = '';
        let height = '';

        if (existingImg) {
            src = existingImg.getAttribute('src');
            alt = existingImg.getAttribute('alt');
            width = existingImg.getAttribute('width');
            height = existingImg.getAttribute('height');

            // Select the image
            const range = document.createRange();
            range.selectNode(existingImg);
            const sel = selection.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            selection.save();
        }

        const tabsHtml = `
            <div class="rte-tabs" style="display: flex; gap: 10px; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb;">
                <button type="button" class="rte-tab-btn active" data-tab="url" style="padding: 8px 16px; border: none; background: none; border-bottom: 2px solid #3b82f6; cursor: pointer; color: #3b82f6;">URL</button>
                <button type="button" class="rte-tab-btn" data-tab="upload" style="padding: 8px 16px; border: none; background: none; cursor: pointer; color: #6b7280;">Upload</button>
            </div>
        `;

        const urlTabHtml = `
            <div id="rte-img-url-panel">
                <div class="rte-form-group">
                    <label class="rte-form-label">Image URL</label>
                    <input type="text" class="rte-form-input" id="rte-img-src" placeholder="https://example.com/image.jpg" value="${src}">
                </div>
            </div>
        `;

        const uploadTabHtml = `
            <div id="rte-img-upload-panel" style="display: none;">
                <div class="rte-form-group">
                    <label class="rte-form-label">Upload Image</label>
                    <input type="file" class="rte-form-input" id="rte-img-file" accept="image/*">
                </div>
            </div>
        `;

        const commonHtml = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
                <div class="rte-form-group" style="grid-column: span 2;">
                    <label class="rte-form-label">Alt Text</label>
                    <input type="text" class="rte-form-input" id="rte-img-alt" placeholder="Description of image" value="${alt}">
                </div>
                <div class="rte-form-group">
                    <label class="rte-form-label">Width</label>
                    <input type="text" class="rte-form-input" id="rte-img-width" placeholder="auto" value="${width}">
                </div>
                <div class="rte-form-group">
                    <label class="rte-form-label">Height</label>
                    <input type="text" class="rte-form-input" id="rte-img-height" placeholder="auto" value="${height}">
                </div>
            </div>
        `;

        const content = document.createElement('div');
        content.innerHTML = tabsHtml + urlTabHtml + uploadTabHtml + commonHtml;

        // Tab switching logic
        const tabs = content.querySelectorAll('.rte-tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => {
                    t.style.borderBottom = 'none';
                    t.style.color = '#6b7280';
                    t.classList.remove('active');
                });
                tab.style.borderBottom = '2px solid #3b82f6';
                tab.style.color = '#3b82f6';
                tab.classList.add('active');

                const mode = tab.dataset.tab;
                content.querySelector('#rte-img-url-panel').style.display = mode === 'url' ? 'block' : 'none';
                content.querySelector('#rte-img-upload-panel').style.display = mode === 'upload' ? 'block' : 'none';
            });
        });

        const modal = new Modal({
            title: existingImg ? 'Edit Image' : 'Insert Image',
            content: content,
            width: '500px',
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
                        const activeTab = content.querySelector('.rte-tab-btn.active').dataset.tab;
                        const altText = content.querySelector('#rte-img-alt').value;
                        const w = content.querySelector('#rte-img-width').value;
                        const h = content.querySelector('#rte-img-height').value;

                        if (activeTab === 'url') {
                            const url = content.querySelector('#rte-img-src').value;
                            if (url) {
                                this.insertImage(url, altText, w, h);
                                modal.close();
                                selection.restore();
                            }
                        } else {
                            const fileInput = content.querySelector('#rte-img-file');
                            if (fileInput.files && fileInput.files[0]) {
                                const file = fileInput.files[0];
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    this.insertImage(e.target.result, altText, w, h);
                                    modal.close();
                                    selection.restore();
                                };
                                reader.readAsDataURL(file);
                            }
                        }
                    }
                }
            ]
        });

        modal.open();
    }

    insertImage(src, alt, width, height) {
        this.editor.focus();

        let html = `<img src="${src}" alt="${alt}"`;
        // Ensure default max-width prevents overflow
        const style = 'max-width: 100%;';
        if (width) html += ` width="${width}"`;
        if (height) html += ` height="${height}"`;
        html += ` style="${style}">`;

        this.editor.data.insertHTML(html);
    }

    onContentClick(e) {
        if (e.target.tagName === 'IMG') {
            this.showResizeOverlay(e.target);
        } else {
            this.hideResizeOverlay();
        }
    }

    showResizeOverlay(img) {
        if (this.resizeOverlay) {
            this.hideResizeOverlay();
        }

        this.activeImage = img;

        // Overlay container (relative to document body for simplicity, or editor container)
        // Using editor container allows scrolling to work easier if positioned absolutely within it
        const rect = img.getBoundingClientRect();
        const editorRect = this.editor.container.getBoundingClientRect();

        // Calculate position relative to editor container
        const top = rect.top - editorRect.top + this.editor.container.scrollTop;
        const left = rect.left - editorRect.left + this.editor.container.scrollLeft;

        this.resizeOverlay = document.createElement('div');
        this.resizeOverlay.className = 'rte-image-resize-overlay';
        Object.assign(this.resizeOverlay.style, {
            position: 'absolute',
            top: `${top}px`,
            left: `${left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            border: '2px solid #3b82f6',
            pointerEvents: 'none', // Let clicks pass through? No, wait.
            zIndex: '100'
        });

        // Handles
        const handles = ['nw', 'ne', 'sw', 'se'];
        handles.forEach(pos => {
            const handle = document.createElement('div');
            Object.assign(handle.style, {
                position: 'absolute',
                width: '10px',
                height: '10px',
                background: '#3b82f6',
                border: '1px solid white',
                pointerEvents: 'auto', // Enable clicking handles
                cursor: `${pos}-resize`
            });

            // Position handles
            if (pos.includes('n')) handle.style.top = '-6px';
            else handle.style.bottom = '-6px';

            if (pos.includes('w')) handle.style.left = '-6px';
            else handle.style.right = '-6px';

            handle.addEventListener('mousedown', (e) => this.startResize(e, pos));
            this.resizeOverlay.appendChild(handle);
        });

        // We assume editor container has relative positioning. If not, we set it.
        const computedStyle = window.getComputedStyle(this.editor.container);
        if (computedStyle.position === 'static') {
            this.editor.container.style.position = 'relative';
        }

        this.editor.container.appendChild(this.resizeOverlay);
    }

    hideResizeOverlay() {
        if (this.resizeOverlay) {
            if (this.resizeOverlay.parentNode) {
                this.resizeOverlay.parentNode.removeChild(this.resizeOverlay);
            }
            this.resizeOverlay = null;
            this.activeImage = null;
        }
    }

    startResize(e, pos) {
        e.preventDefault();
        e.stopPropagation();

        const img = this.activeImage;
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = img.offsetWidth;
        const startHeight = img.offsetHeight;

        const onMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;

            let newWidth = startWidth;
            let newHeight = startHeight;

            // Simplified resizing logic (corner dependent)
            if (pos.includes('e')) newWidth += deltaX;
            else newWidth -= deltaX;

            if (pos.includes('s')) newHeight += deltaY;
            else newHeight -= deltaY;

            // Constrain
            if (newWidth > 20) img.style.width = `${newWidth}px`;
            if (newHeight > 20) img.style.height = `${newHeight}px`;

            // Update overlay
            if (this.resizeOverlay) {
                // Simplified update to match image (expensive relayout avoided)
                this.resizeOverlay.style.width = `${newWidth}px`;
                this.resizeOverlay.style.height = `${newHeight}px`;
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            this.editor.events.emit('content:change');
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
}
