import { Modal } from '../../ui/modal.js';

/**
 * VideoPlugin - Video embed support
 */
export class VideoPlugin {
    constructor(editor) {
        this.editor = editor;
    }

    init() {
        this.editor.commands.register('video', {
            execute: () => this.openVideoModal(),
            isActive: () => false,
            isEnabled: () => true
        });
    }

    openVideoModal() {
        const selection = this.editor.selection;
        selection.save();

        const content = document.createElement('div');
        content.innerHTML = `
            <div class="rte-form-group">
                <label class="rte-form-label">Video URL (YouTube, Vimeo, or Direct URL)</label>
                <input type="text" class="rte-form-input" id="rte-video-url" placeholder="https://www.youtube.com/watch?v=...">
                <p style="font-size: 12px; color: #6b7280; margin-top: 4px;">Supports YouTube, Vimeo, and mp4/webm files.</p>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
                <div class="rte-form-group">
                    <label class="rte-form-label">Width</label>
                    <input type="text" class="rte-form-input" id="rte-video-width" value="560">
                </div>
                <div class="rte-form-group">
                    <label class="rte-form-label">Height</label>
                    <input type="text" class="rte-form-input" id="rte-video-height" value="315">
                </div>
            </div>
        `;

        const modal = new Modal({
            title: 'Insert Video',
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
                        const url = content.querySelector('#rte-video-url').value;
                        const width = content.querySelector('#rte-video-width').value;
                        const height = content.querySelector('#rte-video-height').value;

                        if (url) {
                            this.insertVideo(url, width, height);
                            modal.close();
                            selection.restore();
                        }
                    }
                }
            ]
        });

        modal.open();
    }

    /**
     * Parse video URL to get embed code
     */
    parseVideoUrl(url) {
        // YouTube
        const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        if (ytMatch) {
            return `https://www.youtube.com/embed/${ytMatch[1]}`;
        }

        // Vimeo
        const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
        if (vimeoMatch) {
            return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
        }

        // Direct file (simple check)
        if (url.match(/\.(mp4|webm|ogg)$/)) {
            return { type: 'file', url };
        }

        // Fallback (maybe already embed URL)
        return url;
    }

    insertVideo(url, width, height) {
        this.editor.focus();

        const embedSrc = this.parseVideoUrl(url);

        let html = '';

        if (typeof embedSrc === 'object' && embedSrc.type === 'file') {
            html = `<video controls width="${width}" height="${height}">
                <source src="${embedSrc.url}">
                Your browser does not support the video tag.
            </video>`;
        } else {
            html = `<iframe width="${width}" height="${height}" src="${embedSrc}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }

        // Wrap in a div to prevent editing issues or layout breaks
        const wrapper = `<div class="rte-video-wrapper" contenteditable="false">${html}</div><p><br></p>`;

        this.editor.data.insertHTML(wrapper);
    }
}
