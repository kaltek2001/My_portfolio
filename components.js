// components.js - Specific to Components page

// Sample data for components
const componentsData = [
    {
        id: "comp-001",
        title: "Gear Housing",
        thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        videos: [
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        ],
        drawing: "gear_housing_drawing.pdf",
        model3d: "gear_housing.glb"
    },
    {
        id: "comp-002",
        title: "Piston Assembly",
        thumbnail: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        videos: [],
        drawing: "piston_drawing.pdf",
        model3d: "piston_assembly.glb"
    },
    {
        id: "comp-003",
        title: "Valve Body",
        thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        videos: [
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        ],
        drawing: "",
        model3d: "valve_body.glb"
    }
];

// DOM Elements specific to components page
const componentsGrid = document.getElementById('components-grid');
const detailModal = document.getElementById('detail-modal');
const detailModalContent = document.getElementById('detail-modal-content');

// Initialize the components page
document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
    setupComponentsEventListeners();
});

function loadComponents() {
    // Clear existing content
    componentsGrid.innerHTML = '';

    // Add component cards
    componentsData.forEach(component => {
        const componentCard = document.createElement('div');
        componentCard.className = 'item-card';
        componentCard.innerHTML = `
            <img src="${component.thumbnail}" alt="${component.title}" class="item-image">
            <div class="item-title">
                <h3>${component.title}</h3>
            </div>
        `;

        componentCard.addEventListener('click', function() {
            showComponentDetail(component);
        });

        componentsGrid.appendChild(componentCard);
    });
}

function setupComponentsEventListeners() {
    // Mobile menu button
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

function showComponentDetail(component) {
    currentItem = component;

    // Generate detail content
    detailModalContent.innerHTML = generateDetailContent(component);

    // Show the detail modal
    detailModal.classList.add('active');

    // Setup event listeners for the detail modal
    setupDetailEventListeners(component);
}

function generateDetailContent(item) {
    const hasImages = item.images && item.images.length > 0;
    const hasVideos = item.videos && item.videos.length > 0;
    const hasDrawing = item.drawing && item.drawing.trim() !== '';
    const hasModel3d = item.model3d && item.model3d.trim() !== '';

    let content = `
        <div class="detail-container">
            <button class="back-button" id="detail-back-button">
                <i class="fas fa-arrow-left"></i> Back to Components
            </button>
            
            <div class="detail-title">
                <h1>${item.title}</h1>
            </div>
            
            <div class="media-grid">
    `;

    // Add images to media grid
    if (hasImages) {
        item.images.forEach((image, index) => {
            content += `
                <div class="media-item" data-type="image" data-index="${index}">
                    <img src="${image}" alt="${item.title} - Image ${index + 1}">
                </div>
            `;
        });
    }

    // Add videos to media grid
    if (hasVideos) {
        item.videos.forEach((video, index) => {
            content += `
                <div class="media-item" data-type="video" data-index="${index}">
                    <video>
                        <source src="${video}" type="video/mp4">
                    </video>
                    <div class="video-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
        });
    }

    // Add placeholders for missing media types
    if (!hasImages && !hasVideos) {
        content += `
            <div class="media-item">
                <div class="media-placeholder">
                    <i class="fas fa-image"></i>
                    <p>No images or videos available</p>
                </div>
            </div>
        `;
    }

    content += `
            </div>
            
            <div class="action-buttons">
    `;

    // Add action buttons for available files
    if (hasImages) {
        content += `
            <button class="action-btn images" data-action="images">
                <i class="fas fa-images"></i> Images
            </button>
        `;
    }

    if (hasVideos) {
        content += `
            <button class="action-btn videos" data-action="videos">
                <i class="fas fa-video"></i> Videos
            </button>
        `;
    }

    if (hasDrawing) {
        content += `
            <button class="action-btn drawing" data-action="drawing" data-file="${item.drawing}">
                <i class="fas fa-file-pdf"></i> Drawing
            </button>
        `;
    }

    if (hasModel3d) {
        content += `
            <button class="action-btn model" data-action="model" data-file="${item.model3d}">
                <i class="fas fa-cube"></i> 3D Model
            </button>
        `;
    }

    content += `
            </div>
        </div>
    `;

    return content;
}

function setupDetailEventListeners(item) {
    // Back button
    const backButton = document.getElementById('detail-back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            detailModal.classList.remove('active');
        });
    }
}