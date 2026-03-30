document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Effect for Hero Section
    const texts = [
        "AI Enthusiast",
        "Programmer",
        "Hardware Explorer",
        "UI/UX Learner",
        "Creative Thinker"
    ];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    
    const typingDelay = 100;
    const eraseDelay = 50;
    const newTextDelay = 2000;
    const typingElement = document.getElementById('typing-text');
    let isDeleting = false;

    function type() {
        if (!typingElement) return;

        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }

        typingElement.textContent = letter;

        let typeSpeed = isDeleting ? eraseDelay : typingDelay;

        // Dynamic typing speed logic
        if (!isDeleting && letter === currentText) {
            // Pause at the end
            typeSpeed = newTextDelay;
            isDeleting = true;
        } else if (isDeleting && letter === "") {
            isDeleting = false;
            count++;
            // Pause before starting new word
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000); // Initial delay

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Also trigger internal animations like progress bars if present
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .fade-in-up');
    revealElements.forEach(el => observer.observe(el));

    // 3. Navigation Bar Scroll Effect
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(5, 5, 15, 0.9)';
            nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            nav.style.background = 'rgba(7, 7, 18, 0.6)';
            nav.style.boxShadow = 'none';
        }
    });

    // 4. Update Footer Year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 5. Contact Form Handling
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            
            // Loading state
            btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            btn.style.pointerEvents = 'none';
            
            // Simulate network request/email API call
            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalText;
                btn.style.pointerEvents = 'auto';
                
                // Show success
                formStatus.style.display = 'block';
                formStatus.style.animation = 'fade-in 0.5s ease forwards';
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 4000);
            }, 1500);
        });
    }

    // 6. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isMenuOpen = navLinks.classList.contains('mobile-active');
            
            if (isMenuOpen) {
                navLinks.style.display = 'none';
                navLinks.classList.remove('mobile-active');
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(7, 7, 18, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.gap = '1.5rem';
                navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
                navLinks.style.backdropFilter = 'blur(15px)';
                navLinks.style.textAlign = 'center';
                navLinks.classList.add('mobile-active');
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    navLinks.classList.remove('mobile-active');
                }
            });
        });
    }
});
