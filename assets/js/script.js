// Custom JavaScript for Clínica Geriátrica Sol

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 80;

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Gallery lightbox effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-img');
            
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });

    // Create and show lightbox
    function openLightbox(imageSrc, title) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${imageSrc}" alt="${title}" class="lightbox-img">
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Add styles for lightbox
        const style = document.createElement('style');
        style.textContent = `
            .lightbox-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.3s ease;
                cursor: pointer;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                text-align: center;
            }
            
            .lightbox-img {
                max-width: 100%;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                cursor: default;
            }
            
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                z-index: 10000;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .lightbox-close:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: scale(1.1);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // Close lightbox events
        const closeBtn = lightbox.querySelector('.lightbox-close');
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        function closeLightbox() {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
                if (document.head.contains(style)) {
                    document.head.removeChild(style);
                }
                document.body.style.overflow = 'auto';
            }, 300);
        }

        // Close on Escape key
        const escapeHandler = function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.recurso-card, .gallery-item');
    
    function animateOnScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in', 'visible');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run on load

    // Form validation and submission (if forms are added)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form validation and submission logic here
            const formData = new FormData(form);
            
            // Example: Send to PHP backend
            // fetch('process_form.php', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     // Handle response
            // });
        });
    });

    // Loading screen (optional)
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', function() {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        });
    }

    // Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const observeElements = document.querySelectorAll('.recurso-card, .gallery-item, .section-title');
    observeElements.forEach(el => observer.observe(el));

    // WhatsApp button pulse animation
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        setInterval(() => {
            whatsappBtn.style.animation = 'none';
            setTimeout(() => {
                whatsappBtn.style.animation = 'pulse 2s infinite';
            }, 10);
        }, 10000); // Pulse every 10 seconds
    }

    // Lazy loading for images (if needed)
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Performance optimization
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    function updateAnimations() {
        updateActiveNav();
        animateOnScroll();
        ticking = false;
    }

    // Debounced scroll event
    window.addEventListener('scroll', requestTick);

    // Accessibility improvements
    document.addEventListener('keydown', function(e) {
        // Allow keyboard navigation for interactive elements
        if (e.key === 'Enter' || e.key === ' ') {
            const target = e.target;
            if (target.classList.contains('gallery-item') || target.classList.contains('recurso-card')) {
                target.click();
            }
        }
    });

    // Add keyboard accessibility to gallery items
    galleryItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', 'Ver imagem em tamanho completo');
    });

    console.log('Clínica Geriátrica Sol - Site carregado com sucesso!');
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential use in other scripts
window.ClinicaSol = {
    init: function() {
        console.log('Clínica Sol initialized');
    },
    openWhatsApp: function(message) {
        const encodedMessage = encodeURIComponent(message || 'Olá! Gostaria de saber mais sobre os serviços da Clínica Sol.');
        window.open(`https://wa.me/5515333344444?text=${encodedMessage}`, '_blank');
    }
};