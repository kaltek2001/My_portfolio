// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Add animation to skill items when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    const courseTags = document.querySelectorAll('.course-tag');
    const softSkillTags = document.querySelectorAll('.soft-skill-tag');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all elements for animation
    skillItems.forEach(item => observer.observe(item));
    courseTags.forEach(tag => observer.observe(tag));
    softSkillTags.forEach(tag => observer.observe(tag));

    // Add hover effects to certification card
    const certificationCard = document.querySelector('.certification-card');
    if (certificationCard) {
        certificationCard.addEventListener('mouseenter', () => {
            certificationCard.style.transform = 'translateY(-5px)';
        });

        certificationCard.addEventListener('mouseleave', () => {
            certificationCard.style.transform = 'translateY(0)';
        });
    }
});