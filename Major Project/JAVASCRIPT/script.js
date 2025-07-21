
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const heroHeight = document.querySelector('.hero').offsetHeight;
            window.scrollTo({
                top: heroHeight,
                behavior: 'smooth'
            });
        });
    }

    // Hero buttons and Contact Us button smooth scroll
    const heroButtons = document.querySelectorAll('.hero-buttons .btn, .nav-contact-btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animate hero elements on load
    function animateHeroElements() {
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroStats = document.querySelector('.hero-stats');
        const heroButtons = document.querySelector('.hero-buttons');
        const floatingCards = document.querySelectorAll('.floating-card');

        // Add animation classes
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(30px)';
            heroTitle.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 200);
        }

        if (heroDescription) {
            heroDescription.style.opacity = '0';
            heroDescription.style.transform = 'translateY(30px)';
            heroDescription.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }, 400);
        }

        if (heroStats) {
            heroStats.style.opacity = '0';
            heroStats.style.transform = 'translateY(30px)';
            heroStats.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                heroStats.style.opacity = '1';
                heroStats.style.transform = 'translateY(0)';
            }, 600);
        }

        if (heroButtons) {
            heroButtons.style.opacity = '0';
            heroButtons.style.transform = 'translateY(30px)';
            heroButtons.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateY(0)';
            }, 800);
        }

        // Animate floating cards
        floatingCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8) translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1) translateY(0)';
            }, 1000 + (index * 200));
        });
    }

    // Run hero animations
    animateHeroElements();

    // Counter animation for stats
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = target.textContent;
                    const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
                    const suffix = finalNumber.replace(/[0-9]/g, '');
                    
                    animateCounter(target, 0, numericValue, suffix, 2000);
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    function animateCounter(element, start, end, suffix, duration) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Initialize counter animation
    animateCounters();

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add hover effects to floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });

    // Services section animations
    function animateServicesOnScroll() {
        const serviceCards = document.querySelectorAll('.service-card');
        const servicesSection = document.querySelector('.services');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });

        // Animate section header
        const sectionHeader = document.querySelector('.section-header');
        if (sectionHeader) {
            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        headerObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            sectionHeader.style.opacity = '0';
            sectionHeader.style.transform = 'translateY(30px)';
            sectionHeader.style.transition = 'all 0.8s ease';
            headerObserver.observe(sectionHeader);
        }
    }

    // Initialize services animations
    animateServicesOnScroll();

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const serviceIcon = card.querySelector('.service-icon');
        
        card.addEventListener('mouseenter', function() {
            if (serviceIcon) {
                serviceIcon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (serviceIcon) {
                serviceIcon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Service links smooth scroll
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Dropdown menu functionality for all dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownMenu) {
            let dropdownTimeout;

            // Show dropdown on hover
            dropdown.addEventListener('mouseenter', function() {
                clearTimeout(dropdownTimeout);
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(0)';
            });

            // Hide dropdown on mouse leave with delay
            dropdown.addEventListener('mouseleave', function() {
                dropdownTimeout = setTimeout(() => {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(-10px)';
                }, 150);
            });

            // Smooth scroll for dropdown links
            const dropdownLinks = dropdown.querySelectorAll('.dropdown-list a, .all-services-link, .dropdown-link-inline');
            dropdownLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const targetSection = document.querySelector(href);
                        if (targetSection) {
                            const offsetTop = targetSection.offsetTop - 70;
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                            
                            // Hide dropdown after clicking
                            dropdownMenu.style.opacity = '0';
                            dropdownMenu.style.visibility = 'hidden';
                            dropdownMenu.style.transform = 'translateY(-10px)';
                        }
                    }
                });
            });

            // Close dropdown on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(-10px)';
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(-10px)';
                }
            });
        }
    });

    // About dropdown search functionality
    const aboutSearchInput = document.getElementById('about-search');
    const searchBtn = document.querySelector('.search-btn');
    
    if (aboutSearchInput && searchBtn) {
        // Search functionality
        function performSearch() {
            const searchTerm = aboutSearchInput.value.toLowerCase().trim();
            
            if (searchTerm) {
                // Get all dropdown links in the about dropdown
                const aboutDropdown = document.querySelector('.about-dropdown');
                const allLinks = aboutDropdown.querySelectorAll('.dropdown-list a');
                
                // Hide all dropdown menus first
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                });
                
                // Find matching links
                let foundMatch = false;
                allLinks.forEach(link => {
                    const linkText = link.textContent.toLowerCase();
                    if (linkText.includes(searchTerm)) {
                        // Highlight the link temporarily
                        link.style.background = 'rgba(108, 190, 199, 0.1)';
                        link.style.color = '#6CBEC7';
                        link.style.fontWeight = '600';
                        
                        // Remove highlight after 3 seconds
                        setTimeout(() => {
                            link.style.background = '';
                            link.style.color = '';
                            link.style.fontWeight = '';
                        }, 3000);
                        
                        foundMatch = true;
                        
                        // Scroll to the link if it has a valid href
                        const href = link.getAttribute('href');
                        if (href.startsWith('#')) {
                            const targetSection = document.querySelector(href);
                            if (targetSection) {
                                setTimeout(() => {
                                    const offsetTop = targetSection.offsetTop - 70;
                                    window.scrollTo({
                                        top: offsetTop,
                                        behavior: 'smooth'
                                    });
                                }, 100);
                            }
                        }
                    }
                });
                
                // Show message if no match found
                if (!foundMatch) {
                    // Create temporary message
                    const message = document.createElement('div');
                    message.textContent = `No results found for "${searchTerm}"`;
                    message.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: linear-gradient(135deg, #654520, #825B32);
                        color: white;
                        padding: 1rem 2rem;
                        border-radius: 25px;
                        z-index: 10000;
                        font-weight: 600;
                        box-shadow: 0 10px 30px rgba(101, 69, 32, 0.3);
                    `;
                    document.body.appendChild(message);
                    
                    // Remove message after 2 seconds
                    setTimeout(() => {
                        document.body.removeChild(message);
                    }, 2000);
                }
                
                // Clear search input
                aboutSearchInput.value = '';
            }
        }
        
        // Search on button click
        searchBtn.addEventListener('click', performSearch);
        
        // Search on Enter key press
        aboutSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
        
        // Auto-suggest functionality
        aboutSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm.length > 2) {
                const aboutDropdown = document.querySelector('.about-dropdown');
                const allLinks = aboutDropdown.querySelectorAll('.dropdown-list a');
                
                // Find matching links and show suggestions
                const matches = [];
                allLinks.forEach(link => {
                    const linkText = link.textContent.toLowerCase();
                    if (linkText.includes(searchTerm)) {
                        matches.push(link.textContent);
                    }
                });
                
                // You could implement a dropdown suggestion list here
                // For now, we'll just highlight the search input if matches are found
                if (matches.length > 0) {
                    this.style.borderColor = '#28a745';
                } else {
                    this.style.borderColor = '#dc3545';
                }
            } else {
                this.style.borderColor = '';
            }
        });
    }

    // Enhanced mobile navigation to handle dropdown
    if (window.innerWidth <= 768) {
        const servicesNavLink = document.querySelector('.nav-item.dropdown .nav-link');
        if (servicesNavLink) {
            servicesNavLink.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = document.querySelector('#services');
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        }
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideNav = navToggle.contains(e.target) || navMenu.contains(e.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

/* Removed Leadership Team functionality */
