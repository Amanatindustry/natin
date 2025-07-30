// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector('.navbar');
const exploreBtn = document.getElementById('explore-btn');
const learnMoreBtn = document.getElementById('learn-more-btn');

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Button interactions
exploreBtn.addEventListener('click', () => {
    // Add ripple effect
    createRippleEffect(exploreBtn);
    
    // Scroll to courses section or show modal
    setTimeout(() => {
        alert('Explore Courses functionality - Navigate to course catalog');
    }, 300);
});

learnMoreBtn.addEventListener('click', () => {
    createRippleEffect(learnMoreBtn);
    
    setTimeout(() => {
        alert('Learn More functionality - Show detailed information');
    }, 300);
});

// Ripple effect function
function createRippleEffect(button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos
document.addEventListener('DOMContentLoaded', () => {
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(el => observer.observe(el));
});

// Smooth parallax effect for hero section (disabled to prevent vibration)
let ticking = false;

function updateParallax() {
    // Disable parallax to prevent vibration
    // const scrolled = window.pageYOffset;
    // const heroImage = document.querySelector('.hero-image');
    // const featuresImage = document.querySelector('.features-image');
    
    // if (heroImage) {
    //     const translateY = scrolled * 0.05;
    //     heroImage.style.transform = `translateY(${translateY}px)`;
    // }
    
    // if (featuresImage) {
    //     const translateY = scrolled * 0.02;
    //     featuresImage.style.transform = `rotateY(-5deg) rotateX(5deg) translateY(${translateY}px)`;
    // }
    
    ticking = false;
}

// Disable scroll parallax to prevent vibration
// window.addEventListener('scroll', () => {
//     if (!ticking) {
//         requestAnimationFrame(updateParallax);
//         ticking = true;
//     }
// });

// Floating elements animation
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-icon, .stat-card');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced features image interactions
const featuresImage = document.querySelector('.features-image');
const floatingIcons = document.querySelectorAll('.floating-icon');

if (featuresImage) {
    // 3D tilt effect on mouse move
    featuresImage.addEventListener('mousemove', (e) => {
        const rect = featuresImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        featuresImage.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
    });
    
    featuresImage.addEventListener('mouseleave', () => {
        featuresImage.style.transform = 'rotateY(-5deg) rotateX(5deg) scale(1)';
    });
    
    // Click effect
    featuresImage.addEventListener('click', () => {
        featuresImage.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            featuresImage.style.animation = '';
        }, 600);
    });
}

// Enhanced floating icons interactions
floatingIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.animation = 'none';
        icon.style.transform = 'scale(1.3) rotate(360deg)';
        icon.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.4)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.animation = 'float 4s ease-in-out infinite';
        icon.style.transform = '';
        icon.style.boxShadow = '';
    });
    
    // Click effect for icons
    icon.addEventListener('click', () => {
        icon.style.animation = 'mobileShake 0.5s ease-in-out';
        setTimeout(() => {
            icon.style.animation = 'float 4s ease-in-out infinite';
        }, 500);
    });
});

// Feature cards hover effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Partner logos interaction
document.querySelectorAll('.partner-logo').forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
    
    // Initialize other animations
    animateFloatingElements();
    
    // Delay counter animation
    setTimeout(animateCounters, 1000);
});

// Responsive image loading
function loadResponsiveImages() {
    const images = document.querySelectorAll('.image-placeholder');
    
    images.forEach((img, index) => {
        // Simulate image loading with different icons
        const icons = ['fas fa-user-graduate', 'fas fa-book-open', 'fas fa-laptop-code'];
        const icon = icons[index] || 'fas fa-user';
        
        img.innerHTML = `<i class="${icon}"></i>`;
    });
}

// Enhanced Mobile Interactions
let touchStartY = 0;
let touchEndY = 0;
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diffY = touchStartY - touchEndY;
    const diffX = touchStartX - touchEndX;
    
    if (Math.abs(diffY) > swipeThreshold) {
        if (diffY > 0) {
            // Swipe up - Add mobile-specific animation
            animateMobileSwipeUp();
        } else {
            // Swipe down
            animateMobileSwipeDown();
        }
    }
    
    if (Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
            // Swipe left
            console.log('Swipe left detected');
        } else {
            // Swipe right
            console.log('Swipe right detected');
        }
    }
}

function animateMobileSwipeUp() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle && heroDescription) {
        heroTitle.style.animation = 'mobileSlideUp 0.6s ease-out';
        heroDescription.style.animation = 'mobileSlideUp 0.6s ease-out 0.1s both';
        
        setTimeout(() => {
            heroTitle.style.animation = '';
            heroDescription.style.animation = '';
        }, 600);
    }
}

function animateMobileSwipeDown() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.style.animation = `mobileSlideDown 0.5s ease-out ${index * 0.1}s both`;
    });
    
    setTimeout(() => {
        featureCards.forEach(card => {
            card.style.animation = '';
        });
    }, 1000);
}

// Add mobile-specific CSS animations
const mobileAnimations = document.createElement('style');
mobileAnimations.textContent = `
    @keyframes mobileSlideUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes mobileSlideDown {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes mobilePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes mobileShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(mobileAnimations);

// Performance optimization - Throttle scroll events
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
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Disable scroll-based animations to prevent vibration
    // const scrolled = window.pageYOffset;
    // const parallaxElements = document.querySelectorAll('.hero-image, .features-image');
    
    // parallaxElements.forEach(element => {
    //     const speed = 0.5;
    //     element.style.transform = `translateY(${scrolled * speed}px)`;
    // });
}, 16));

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadResponsiveImages();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Mobile-specific initializations
    if ('ontouchstart' in window) {
        initializeMobileFeatures();
    } else {
        // Desktop cursor effects
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.7;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }
});

// Mobile-specific features
function initializeMobileFeatures() {
    // Add mobile vibration feedback
    document.querySelectorAll('.btn, .feature-card, .partner-logo').forEach(element => {
        element.addEventListener('touchstart', () => {
            if ('vibrate' in navigator) {
                navigator.vibrate(10);
            }
        });
    });
    
    // Add mobile-specific hover effects
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = '0 15px 35px rgba(37, 99, 235, 0.2)';
        });
        
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            }, 200);
        });
    });
    
    // Mobile scroll animations
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile image lazy loading
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    img.style.transition = 'all 0.5s ease';
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 100);
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Mobile pull-to-refresh effect
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;
    
    document.addEventListener('touchstart', (e) => {
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
        }
    });
    
    document.addEventListener('touchmove', (e) => {
        if (window.scrollY === 0) {
            currentY = e.touches[0].clientY;
            pullDistance = currentY - startY;
            
            if (pullDistance > 0) {
                document.body.style.transform = `translateY(${pullDistance * 0.3}px)`;
            }
        }
    });
    
    document.addEventListener('touchend', () => {
        if (pullDistance > 100) {
            // Trigger refresh animation
            document.body.style.transform = 'translateY(0)';
            document.body.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        } else {
            document.body.style.transform = 'translateY(0)';
        }
        
        pullDistance = 0;
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Console welcome message
console.log(`
%c🎓 EduLearn Website
%cWelcome to the interactive learning platform!
%cBuilt with modern web technologies
`, 
'color: #2563eb; font-size: 20px; font-weight: bold;',
'color: #6b7280; font-size: 14px;',
'color: #10b981; font-size: 12px;'
);
