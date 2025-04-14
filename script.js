// Scroll triggered animation
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