// com_ass.js - Common functionality for both Components and Assemblies pages

// Global state variables
let currentItem = null;
let currentImageIndex = 0;
let currentImages = [];

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    setupCommonEventListeners();
});

function setupCommonEventListeners() {
    // This function will be called from both components.js and assemblies.js
    // to set up common functionality
}

// Common functions for both pages

function openImageModal(images, startIndex) {
    if (!images || images.length === 0) return;

    currentImages = images;
    currentImageIndex = startIndex;

    // Create image modal if it doesn't exist
    let imageModal = document.getElementById('image-modal');
    if (!imageModal) {
        createImageModal();
        imageModal = document.getElementById('image-modal');
    }

    const modalImage = document.getElementById('modal-image');
    if (modalImage) {
        modalImage.src = images[startIndex];
    }

    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');
    if (prevBtn && nextBtn) {
        prevBtn.style.display = images.length > 1 ? 'flex' : 'none';
        nextBtn.style.display = images.length > 1 ? 'flex' : 'none';
    }

    imageModal.classList.add('active');
}

function openVideoModal(videos, index) {
    if (!videos || videos.length === 0) return;

    // Create video modal if it doesn't exist
    let videoModal = document.getElementById('video-modal');
    if (!videoModal) {
        createVideoModal();
        videoModal = document.getElementById('video-modal');
    }

    const modalVideo = document.getElementById('modal-video');
    if (modalVideo) {
        modalVideo.src = videos[index];
    }

    videoModal.classList.add('active');

    setTimeout(() => {
        if (modalVideo) {
            modalVideo.play().catch(e => console.log("Autoplay prevented:", e));
        }
    }, 300);
}

function openDrawing(pdfFile) {
    // Create PDF modal if it doesn't exist
    let pdfModal = document.getElementById('pdf-modal');
    if (!pdfModal) {
        createPDFModal();
        pdfModal = document.getElementById('pdf-modal');
    }

    const pdfViewer = document.getElementById('pdf-viewer');
    if (pdfViewer) {
        // In a real implementation, you would link to the actual PDF file
        const samplePdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
        pdfViewer.src = samplePdfUrl;
    }

    pdfModal.classList.add('active');
}

function openModel(modelFile, title) {
    // Create model modal if it doesn't exist
    let modelModal = document.getElementById('model-modal');
    if (!modelModal) {
        createModelModal();
        modelModal = document.getElementById('model-modal');
    }

    const modelViewerBody = document.getElementById('model-viewer-body');
    if (modelViewerBody) {
        // In a real implementation, you would embed a 3D viewer here
        modelViewerBody.innerHTML = `
            <div class="model-viewer-placeholder">
                <i class="fas fa-cube"></i>
                <h3>${title}</h3>
                <p>3D Model: ${modelFile}</p>
                <p style="margin-top: 20px; max-width: 500px; text-align: center;">
                    In a real implementation, this would display an interactive 3D model.
                    You could use Three.js or model-viewer web component.
                </p>
            </div>
        `;
    }

    modelModal.classList.add('active');
}

function navigateImage(direction) {
    if (currentImages.length === 0) return;

    currentImageIndex = (currentImageIndex + direction + currentImages.length) % currentImages.length;

    const modalImage = document.getElementById('modal-image');
    if (modalImage) {
        modalImage.src = currentImages[currentImageIndex];
    }
}

// Create modal elements dynamically
function createImageModal() {
    const modalHTML = `
        <div class="media-modal" id="image-modal">
            <button class="modal-nav modal-prev" id="prev-image">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="modal-nav modal-next" id="next-image">
                <i class="fas fa-chevron-right"></i>
            </button>
            <div class="media-modal-content">
                <div class="media-modal-header">
                    <h3 id="image-modal-title">Image</h3>
                    <button class="close-modal" id="close-image-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="media-modal-body">
                    <img id="modal-image" class="modal-image" src="" alt="">
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupImageModalEvents();
}

function createVideoModal() {
    const modalHTML = `
        <div class="media-modal" id="video-modal">
            <div class="media-modal-content">
                <div class="media-modal-header">
                    <h3>Video</h3>
                    <button class="close-modal" id="close-video-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="media-modal-body">
                    <video id="modal-video" class="modal-video" controls>
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupVideoModalEvents();
}

function createModelModal() {
    const modalHTML = `
        <div class="media-modal" id="model-modal">
            <div class="media-modal-content">
                <div class="media-modal-header">
                    <h3>3D Model</h3>
                    <button class="close-modal" id="close-model-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="media-modal-body" id="model-viewer-body">
                    <!-- 3D model viewer will be placed here -->
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupModelModalEvents();
}

function createPDFModal() {
    const modalHTML = `
        <div class="media-modal" id="pdf-modal">
            <div class="media-modal-content">
                <div class="media-modal-header">
                    <h3>Drawing</h3>
                    <button class="close-modal" id="close-pdf-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="media-modal-body">
                    <iframe id="pdf-viewer" class="pdf-viewer" src=""></iframe>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupPDFModalEvents();
}

function setupImageModalEvents() {
    const imageModal = document.getElementById('image-modal');
    const closeImageModal = document.getElementById('close-image-modal');
    const prevImageBtn = document.getElementById('prev-image');
    const nextImageBtn = document.getElementById('next-image');

    if (closeImageModal) {
        closeImageModal.addEventListener('click', function() {
            imageModal.classList.remove('active');
        });
    }

    if (prevImageBtn) {
        prevImageBtn.addEventListener('click', function() {
            navigateImage(-1);
        });
    }

    if (nextImageBtn) {
        nextImageBtn.addEventListener('click', function() {
            navigateImage(1);
        });
    }

    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                imageModal.classList.remove('active');
            }
        });
    }
}

function setupVideoModalEvents() {
    const videoModal = document.getElementById('video-modal');
    const closeVideoModal = document.getElementById('close-video-modal');
    const modalVideo = document.getElementById('modal-video');

    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', function() {
            videoModal.classList.remove('active');
            if (modalVideo) modalVideo.pause();
        });
    }

    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                if (modalVideo) modalVideo.pause();
            }
        });
    }
}

function setupModelModalEvents() {
    const modelModal = document.getElementById('model-modal');
    const closeModelModal = document.getElementById('close-model-modal');

    if (closeModelModal) {
        closeModelModal.addEventListener('click', function() {
            modelModal.classList.remove('active');
        });
    }

    if (modelModal) {
        modelModal.addEventListener('click', function(e) {
            if (e.target === modelModal) {
                modelModal.classList.remove('active');
            }
        });
    }
}

function setupPDFModalEvents() {
    const pdfModal = document.getElementById('pdf-modal');
    const closePdfModal = document.getElementById('close-pdf-modal');

    if (closePdfModal) {
        closePdfModal.addEventListener('click', function() {
            pdfModal.classList.remove('active');
        });
    }

    if (pdfModal) {
        pdfModal.addEventListener('click', function(e) {
            if (e.target === pdfModal) {
                pdfModal.classList.remove('active');
            }
        });
    }
}

// Add event listeners to detail page after it's loaded
function setupDetailEventListeners(item) {
    // This function is called from both components.js and assemblies.js

    // Image click to open modal
    setTimeout(() => {
        const imageItems = document.querySelectorAll('.media-item[data-type="image"]');
        imageItems.forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (currentItem && currentItem.images) {
                    openImageModal(currentItem.images, index);
                }
            });
        });

        // Video click to open modal
        const videoItems = document.querySelectorAll('.media-item[data-type="video"]');
        videoItems.forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (currentItem && currentItem.videos) {
                    openVideoModal(currentItem.videos, index);
                }
            });
        });

        // Action buttons
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');

                if (action === 'images') {
                    if (currentItem && currentItem.images) {
                        openImageModal(currentItem.images, 0);
                    }
                } else if (action === 'videos') {
                    if (currentItem && currentItem.videos) {
                        openVideoModal(currentItem.videos, 0);
                    }
                } else if (action === 'drawing') {
                    const file = this.getAttribute('data-file');
                    openDrawing(file);
                } else if (action === 'model') {
                    const file = this.getAttribute('data-file');
                    openModel(file, currentItem.title);
                }
            });
        });
    }, 100);
}

// This function will be called from both components.js and assemblies.js
function setupDetailEventListeners(item) {
    // Back button
    const backButton = document.getElementById('detail-back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            const detailModal = document.getElementById('detail-modal');
            if (detailModal) {
                detailModal.classList.remove('active');
            }
        });
    }

    // Call the common setup after a short delay to ensure DOM is ready
    setTimeout(() => {
        setupDetailEventListenersCommon(item);
    }, 50);
}

function setupDetailEventListenersCommon(item) {
    // Image click to open modal
    const imageItems = document.querySelectorAll('.media-item[data-type="image"]');
    imageItems.forEach(imageItem => {
        imageItem.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            if (item && item.images) {
                openImageModal(item.images, index);
            }
        });
    });

    // Video click to open modal
    const videoItems = document.querySelectorAll('.media-item[data-type="video"]');
    videoItems.forEach(videoItem => {
        videoItem.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            if (item && item.videos) {
                openVideoModal(item.videos, index);
            }
        });
    });

    // Action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');

            if (action === 'images') {
                if (item && item.images) {
                    openImageModal(item.images, 0);
                }
            } else if (action === 'videos') {
                if (item && item.videos) {
                    openVideoModal(item.videos, 0);
                }
            } else if (action === 'drawing') {
                const file = this.getAttribute('data-file');
                openDrawing(file);
            } else if (action === 'model') {
                const file = this.getAttribute('data-file');
                openModel(file, item.title);
            }
        });
    });
}