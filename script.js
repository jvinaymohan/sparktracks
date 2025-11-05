// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#login') {
            e.preventDefault();
            document.getElementById('signupForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('signup').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Nav login link
document.getElementById('navLoginLink')?.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signup').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Hero login link
document.getElementById('heroLoginLink')?.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signup').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Toggle between signup and login forms
document.getElementById('showLoginLink')?.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('showSignupLink')?.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
});

// Signup form submission
document.getElementById('signupForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
        role: this.role.value,
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Creating Account...';
    submitButton.disabled = true;
    
    try {
        // In production, this would call your Firebase Auth API
        // For now, we'll redirect to the app registration
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Log to console
        console.log('Signup:', formData);
        
        // Redirect to app with pre-filled data
        const appUrl = window.location.origin.replace('www.', 'app.');
        const params = new URLSearchParams({
            email: formData.email,
            name: formData.name,
            role: formData.role
        });
        
        // Show success message instead of redirecting (app not deployed yet)
        alert(`🎉 Thank you for signing up, ${formData.name}!\n\nWe've received your registration. The full app will be available soon!\n\nWe'll send you an email at ${formData.email} when it's ready!`);
        
        // Clear the form
        this.reset();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Oops! Something went wrong. Please try again or email us at support@sparktracks.com');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Login form submission
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        email: this.email.value,
        password: this.password.value,
    };
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Logging in...';
    submitButton.disabled = true;
    
    try {
        // In production, authenticate and redirect
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Login:', formData);
        
        // Show message instead of redirecting (app not deployed yet)
        alert('🎉 Welcome back!\n\nThe full app will be available soon. We\'ll send you an email when you can log in!\n\nThank you for your patience!');
        
        // Clear the form
        this.reset();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Invalid credentials. Please try again.');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and other elements
document.querySelectorAll('.feature-card, .step, .user-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stats counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 30);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-value').forEach(stat => {
                const value = stat.textContent.replace(/[^0-9]/g, '');
                if (value) {
                    animateCounter(stat, parseInt(value));
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.statistics');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add hover effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'var(--neutral-50)';
    });
});

// Console message for developers
console.log('%c🎓 Sparktracks MVP', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in joining our team? Email careers@sparktracks.com', 'font-size: 12px; color: #8b5cf6;');
console.log('%cBuilt with ❤️ using Flutter & Firebase', 'font-size: 12px; color: #10b981;');

