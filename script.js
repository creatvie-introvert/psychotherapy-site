// ================================
// Scroll triggered animation
// ================================

const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target)
        }
    });
}, {
    threshold: 0.1,
});

animatedElements.forEach((el) => observer.observe(el));

// ================================
// Affiliations Carousel Animation
// ================================

// Duplicate carousel logos for seamless scroll
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('affiliationsTrack');
    track.innerHTML += track.innerHTML;     // Clone the logos
})

const carousel = document.querySelector('.affiliations-carousel__track');

carousel.addEventListener('mouseenter', () => {
    carousel.style.animationPlayState = 'paused';
});

carousel.addEventListener('mouseleave', () => {
    carousel.style.animationPlayState = 'running';
});