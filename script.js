document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Dark Mode Toggle
    // ==========================================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const htmlElement = document.documentElement;
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // ==========================================
    // 2. Sticky Header & Scroll Active Link
    // ==========================================
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            
            // Sticky Header Class
            if (scrollPos > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
            
            // Active Link Highlight
            if (navLinks.length && sections.length) {
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 120;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }
        });
    }

    // ==========================================
    // 3. Mobile Hamburger Menu Toggle
    // ==========================================
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close nav menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close nav menu and go to homepage when logo is clicked
        const logos = document.querySelectorAll('.logo');
        logos.forEach(logo => {
            logo.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 4. Modal Triggers & Controls
    // ==========================================
    
    // Modals
    const videoModal = document.getElementById('video-modal');
    
    // Triggers
    const videoTrigger = document.getElementById('video-trigger');
    const ctaTrigger = document.getElementById('cta-trigger');
    
    // Close buttons
    const videoClose = document.getElementById('video-close');
    
    // Utility functions to open/close
    const openModal = (modal) => {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop page scroll
    };
    
    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore page scroll
    };
    
    // Open Video Modal
    if (videoTrigger) {
        videoTrigger.addEventListener('click', () => openModal(videoModal));
    }
    
    // Close events
    if (videoClose) {
        videoClose.addEventListener('click', () => closeModal(videoModal));
    }
    
    // Close when clicking overlay (outside the modal box)
    window.addEventListener('click', (e) => {
        if (videoModal && e.target === videoModal) closeModal(videoModal);
    });
    
    // Close on Escape Key press
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (videoModal) closeModal(videoModal);
        }
    });

    // ==========================================
    // 5. Scroll-Reveal Animation Observer
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once animate is complete, we can stop observing it
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================
    // 6. Stats Count-Up Animation Observer
    // ==========================================
    const statsNums = document.querySelectorAll('.stats-num');
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500; // ms
        const stepTime = 20; // ms (around 50fps)
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                // Formatting display values while counting
                if (target === 100) {
                    counter.innerText = Math.floor(current) + '%';
                } else if (target >= 1000) {
                    counter.innerText = Math.floor(current / 1000) + 'K+';
                } else {
                    counter.innerText = Math.floor(current) + '+';
                }
                setTimeout(updateCount, stepTime);
            } else {
                // Final value formatting
                if (target === 100) {
                    counter.innerText = target + '%';
                } else if (target >= 1000) {
                    counter.innerText = (target / 1000) + 'K+';
                } else {
                    counter.innerText = target + '+';
                }
            }
        };
        
        updateCount();
    };
    
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, {
        threshold: 0.5
    });
    
    statsNums.forEach(num => {
        statsObserver.observe(num);
    });

});
