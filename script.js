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

// EmailJS is now initialized directly in the HTML to avoid loading timing issues
// We'll just verify it's properly loaded when needed

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
        // Change button text and disable it while sending
        const btn = this.querySelector('button');
        btn.disabled = true;
        btn.innerHTML = 'Sending...';
        
        try {
            // Create template parameters matching your email template exactly
            const templateParams = {
                from_name: nameInput.value,
                from_email: emailInput.value, // Changed to from_email to match your template
                message: messageInput.value,
                date_time: new Date().toLocaleString() // Adding date_time parameter for your template
            };
            
            console.log("Attempting to send email via EmailJS");
            console.log("Template parameters:", templateParams);
            
            // Send using EmailJS - passing the templateParams object instead of form
            emailjs.send('service_y64nrus', 'template_cnqfwwi', templateParams)
                .then(function(response) {
                    console.log('EmailJS SUCCESS!', response.status, response.text);
                    alert('✅ Message sent successfully!');
                    form.reset();
                    btn.disabled = false;
                    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                })
                .catch(function(error) {
                    console.error('EmailJS error details:', error);
                    
                    // More informative error message based on the error type
                    let errorMsg = '❌ Failed to send message. ';
                    if (error.text) {
                        errorMsg += error.text;
                    } else if (error.status === 0) {
                        errorMsg += 'Network error. Please check your internet connection.';
                    } else {
                        errorMsg += 'Please try again later or contact directly via email.';
                    }
                    
                    alert(errorMsg);
                    btn.disabled = false;
                    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                });
        } catch (err) {
            console.error('Exception while sending email:', err);
            alert('❌ Something went wrong while sending your message. Please try again later.');
            btn.disabled = false;
            btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        }
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

// Animated statistics with stagger effect
document.addEventListener('DOMContentLoaded', function() {
    // Dynamically load the motion library
    const motionScript = document.createElement('script');
    motionScript.type = 'module';
    motionScript.src = 'https://cdn.jsdelivr.net/npm/motion@12.16.0/+esm';
    document.head.appendChild(motionScript);
    
    // Wait for the library to load
    motionScript.onload = function() {
        // Initialize animation when stats section is in view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        const statsSection = document.querySelector('.about-stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    };
});

// Function to animate the statistics with staggered effect
async function animateStats() {
    // Import motion library dynamically
    const { animate, stagger } = await import('https://cdn.jsdelivr.net/npm/motion@12.16.0/+esm');
    
    // Get all stat elements
    const statElements = document.querySelectorAll('.stat-number');
    
    // Extract the target values (remove + and other non-numeric characters)
    const targetValues = Array.from(statElements).map(el => {
        const text = el.textContent;
        
        // Extract numeric value
        if (text.includes('$')) {
            // Handle currency format
            return parseInt(text.replace(/\$|M|\+/g, ''));
        } else {
            // Handle normal numbers
            return parseInt(text.replace(/\+/g, ''));
        }
    });
    
    // Store original text to preserve formatting
    const originalTexts = Array.from(statElements).map(el => el.textContent);
    
    // Animate each stat with stagger effect
    statElements.forEach((element, index) => {
        // Determine if this is a currency value
        const isCurrency = originalTexts[index].includes('$');
        
        // Start from 0
        element.textContent = isCurrency ? '$0M' : '0';
        
        // Animate to target value
        animate(0, targetValues[index], {
            duration: 2,
            delay: stagger(0.2)[index],
            ease: "circOut",
            onUpdate: (latest) => {
                // Format the text similar to the original
                if (isCurrency) {
                    element.textContent = `$${Math.round(latest)}M+`;
                } else {
                    element.textContent = `${Math.round(latest)}+`;
                }
            }
        });
    });
}

// Timeline Toggle Functionality - Consolidated with the functionality below

// Timeline toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const timelineToggleBtns = document.querySelectorAll('.timeline-toggle-btn');

    timelineToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Get the closest timeline content container
            const timelineContent = this.closest('.timeline-content');
            
            // Find the hidden details within this container
            const hiddenDetails = timelineContent.querySelector('.hidden-details');
            
            // Get the parent timeline item for expanded state
            const timelineItem = this.closest('.timeline-item');
            
            // Toggle the 'show' class and button active state
            hiddenDetails.classList.toggle('show');
            this.classList.toggle('active');
            
            // Toggle the 'expanded' class on the timeline item
            timelineItem.classList.toggle('expanded');
            
            // Change the button text based on state
            const btnText = this.querySelector('span');
            if (this.classList.contains('active')) {
                btnText.textContent = 'Hide Details';
            } else {
                btnText.textContent = 'View Details';
            }
        });
    });
});

// Certificate Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal and its components
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('modal-certificate-img');
    const modalTitle = document.getElementById('modal-certificate-title');
    const modalDescription = document.getElementById('modal-certificate-description');
    const closeModal = document.querySelector('.close-modal');
    
    // Get all certificate items
    const certItems = document.querySelectorAll('.cert-item');
    
    // Function to open the modal
    function openModal(imgSrc, title, description) {
        // Set the modal content
        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        // Display the modal with animation
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Disable body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close the modal
    function closeModalFunc() {
        modal.classList.remove('show');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modal.style.display = 'none';
            // Re-enable body scroll
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Add click event to all certificate items
    certItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            openModal(imgSrc, title, description);
        });
    });
    
    // Close the modal when clicking the close button
    closeModal.addEventListener('click', closeModalFunc);
    
    // Close the modal when clicking outside the image
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });
    
    // Close the modal with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunc();
        }
    });
});

