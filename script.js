console.log("script.js is running...");

document.addEventListener('DOMContentLoaded', () => {
    // ========== Scroll Triggered Animation ==========
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target)
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));

    // ========== Affiliations Carousel ==========
    const track = document.getElementById('affiliationsTrack');
    if (track) {
        track.innerHTML += track.innerHTML;
    }

    const carousel = document.querySelector('.affiliations-carousel__track');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            carousel.style.animationPlayState = 'paused';
        });
        carousel.addEventListener('mouseleave', () => {
            carousel.style.animationPlayState = 'running';
        });
    }

    // ========== Booking Form Interactivity ==========
    const options = document.querySelectorAll('.appointment-type');
    console.log("Found", options.length, "appointment options");

    options.forEach(option => {
        option.addEventListener('click', () => {
            console.log("Clicked:", option.textContent.trim());

            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            const radio = option.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                console.log("Checked radio:", radio.value);
            } else {
                console.warn("No radio input found in", option);
            }

            toggleSubmitButton(); // Check form validity after radio click
        });
    });

    // ========== Enable/Disable Submit Button ==========
    const form = document.querySelector('.booking-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');

    function toggleSubmitButton() {
        let isFormValid = true;

        requiredFields.forEach(field => {
            if (field.type === 'radio') {
                const radioGroup = form.querySelectorAll(`input[name="${field.name}"]`);
                const oneChecked = [...radioGroup].some(r => r.checked);
                if (!oneChecked) isFormValid = false;
            } else if (field.type === 'checkbox') {
                if (!field.checked) isFormValid = false;
            } else {
                if (!field.value.trim()) isFormValid = false;
            }
        });

        submitButton.disabled = !isFormValid;
    }

    form.addEventListener('input', toggleSubmitButton);
    form.addEventListener('change', toggleSubmitButton); // For radio & checkbox
    toggleSubmitButton(); // Run initially on load
});

// ========== Booking Form Submission ==========
document.querySelector('.booking-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(this);
    const appointmentType = formData.get('appointment-type');
    const date = formData.get('date');
    const time = formData.get('time');
    const firstName = formData.get('first-name');
    const surname = formData.get('surname');
    const email = formData.get('email');

    // Placeholder for future payment logic
    console.log("Booking info:", {
        appointmentType, date, time, firstName, surname, email
    });

    alert("Form submitted — payment flow will be added soon.");
});
