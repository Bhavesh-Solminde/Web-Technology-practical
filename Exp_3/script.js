// script.js
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');

    // 1. Open Lightbox (Event Delegation)
    gallery.addEventListener('click', (e) => {
        // Check if the clicked element is an image
        if (e.target.tagName === 'IMG') {
            const img = e.target;
            
            // Set lightbox content
            lightboxImg.src = img.src; 
            caption.textContent = img.alt;
            
            // Show modal
            lightbox.classList.add('active');
        }
    });

    // 2. Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeLightbox);

    // Close when clicking outside the image (on the background)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});