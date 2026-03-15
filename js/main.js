// Once Human Landing Page - CPA Optimized JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Remove preloader
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
    }, 1000);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        const diff = endOfDay - now;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('countdown').textContent = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Animated counter for player count
    const counter = document.querySelector('.counter');
    if (counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = '2.4M+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString() + '+';
            }
        }, 20);
    }

    // Exit intent popup
    let exitIntentShown = false;
    
    document.addEventListener('mouseout', (e) => {
        if (!exitIntentShown && e.clientY < 10) {
            document.getElementById('exitPopup').classList.add('active');
            exitIntentShown = true;
        }
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and review cards
    document.querySelectorAll('.feature-card, .review-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Click tracking for CTAs
    document.querySelectorAll('a[href*="steampowered"]').forEach(link => {
        link.addEventListener('click', function() {
            // Facebook Pixel or other tracking
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead');
            }
            
            // Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'YOUR_GTAG_ID',
                    'event_category': 'engagement',
                    'event_label': 'steam_click'
                });
            }
            
            console.log('Steam click tracked');
        });
    });
});

// Close popup function
function closePopup() {
    document.getElementById('exitPopup').classList.remove('active');
}

// Track conversion function
function trackConversion() {
    // Add your CPA network tracking pixel here
    console.log('Conversion tracked');
    
    // Example: 
    // var img = new Image();
    // img.src = 'https://your-cpa-network.com/tracking?clickid=XXX';
}
