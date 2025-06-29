// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Enhanced form validation with text error messages
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

// Clear errors when typing
nameInput.addEventListener('input', () => {
    nameError.textContent = '';
    nameInput.classList.remove('error');
});

emailInput.addEventListener('input', () => {
    emailError.textContent = '';
    emailInput.classList.remove('error');
});

messageInput.addEventListener('input', () => {
    messageError.textContent = '';
    messageInput.classList.remove('error');
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Reset errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    messageInput.classList.remove('error');
    
    let isValid = true;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
        nameError.textContent = "Please enter your name";
        nameInput.classList.add('error');
        isValid = false;
    }
    
    if (!email) {
        emailError.textContent = "Please enter your email address";
        emailInput.classList.add('error');
        isValid = false;
    } else if (!validateEmail(email)) {
        emailError.textContent = "Please enter a valid email address";
        emailInput.classList.add('error');
        isValid = false;
    }
    
    if (!message) {
        messageError.textContent = "Please enter your message";
        messageInput.classList.add('error');
        isValid = false;
    }
    
    if (isValid) {
        // Would normally submit the form here
        console.log("Form is valid and ready to submit");
        // Uncomment to actually submit: form.submit();
    }
});

function validateEmail(email) {
    const pattern = /^(?![0-9])[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}

// Scroll reveal animations
const revealElements = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
});

// Theme toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = themeToggleBtn.querySelector('i');
const currentTheme = localStorage.getItem('theme');

// Apply the saved theme on page load
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

// Toggle theme on button click
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    
    // Toggle icon
    themeIcon.classList.toggle('fa-sun', !isLightMode);
    themeIcon.classList.toggle('fa-moon', isLightMode);
    
    // Save preference
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});

// Lazy loading and animation initialization
document.addEventListener('DOMContentLoaded', () => {
    // Loading spinner
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    loadingSpinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    document.body.appendChild(loadingSpinner);

    // Initialize lazy loading for images
    const lazyImages = document.querySelectorAll('[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    const tempImage = new Image();
                    tempImage.src = img.dataset.src;
                    tempImage.onload = () => {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        delete img.dataset.src;
                    };
                }
                observer.unobserve(img);
            }
        });
    }, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Initialize section animations with a slight delay between each section
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                // Add a small delay based on the section's position
                const delay = Array.from(sections).indexOf(section) * 100;
                setTimeout(() => {
                    section.classList.remove('section-hidden');
                    section.classList.add('section-visible');
                }, delay);
                sectionObserver.unobserve(section);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });

    // Remove spinner after all content is loaded
    window.addEventListener('load', () => {
        loadingSpinner.style.opacity = '0';
        setTimeout(() => loadingSpinner.remove(), 300);
    });
});

// Add a scroll to top button
const scrollToTopBtn = document.createElement('button');    
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollToTopBtn);
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// Show or hide the button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});
