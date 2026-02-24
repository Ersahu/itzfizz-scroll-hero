// ==================== GSAP ANIMATIONS ====================

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Company name configuration
const companyName = "ITZFIZZ";

// DOM Elements
const welcomeLine = document.getElementById('welcome-line');
const companyLine = document.getElementById('company-line');
const statCards = document.querySelectorAll('.stat-card');
const visualElement = document.querySelector('.visual-element');
const heroSection = document.querySelector('.hero');

// Generate headline letters dynamically
function generateHeadlines() {
    // Generate WELCOME line
    const welcomeText = "WELCOME";
    const welcomeHTML = welcomeText.split('').map((char) => {
        return `<span class="letter">${char}</span>`;
    }).join('');
    
    // Generate company name line
    const companyHTML = companyName.split('').map((char) => {
        return `<span class="letter">${char}</span>`;
    }).join('');
    
    welcomeLine.innerHTML = welcomeHTML;
    companyLine.innerHTML = companyHTML;
    
    return {
        welcomeLetters: welcomeLine.querySelectorAll('.letter'),
        companyLetters: companyLine.querySelectorAll('.letter')
    };
}

// Generate and get letters
const { welcomeLetters, companyLetters } = generateHeadlines();

// ==================== INITIAL LOAD ANIMATION ====================

// Animate headline letters with stagger - cinematic reveal
function animateHeadlines() {
    // Animate WELCOME line
    gsap.fromTo(welcomeLetters, 
        {
            opacity: 0,
            y: 60,
            scale: 0.75,
            filter: "blur(2px)"
        },
        {
            opacity: 0.09,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.3
        }
    );
    
    // Animate company name line
    gsap.fromTo(companyLetters, 
        {
            opacity: 0,
            y: 60,
            scale: 0.75,
            filter: "blur(2px)"
        },
        {
            opacity: 0.09,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.8
        }
    );
}

// Start headline animation
animateHeadlines();

// Animate stats cards with delay - premium entrance
gsap.fromTo(statCards,
    {
        opacity: 0,
        y: 40,
        scale: 0.95
    },
    {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.2,
        delay: 2.2
    }
);

// ==================== SMOOTH LOADING SEQUENCE ====================

// Mark hero as loaded for CSS transitions
window.addEventListener('load', () => {
    // Smooth fade-in sequence
    gsap.to(heroSection, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
    });
    
    setTimeout(() => {
        heroSection.classList.add('loaded');
    }, 2500);
});

// Preloader animation
const preloaderTimeline = gsap.timeline();
preloaderTimeline
.fromTo(document.body, {
    opacity: 0
}, {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out"
})
.fromTo(heroSection, {
    opacity: 0
}, {
    opacity: 1,
    duration: 1.2,
    ease: "power2.out"
}, "-=0.4");

// ==================== CINEMATIC SCROLL TIMELINE ====================

// Create master timeline for scroll-driven animations
const masterTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        invalidateOnRefresh: true
    }
});

// Layer 1: Deep background parallax
masterTimeline.to(".hero-bg", {
    y: -80,
    ease: "none"
}, 0);

// Layer 2: Orb scaling and upward movement
masterTimeline.to(visualElement, {
    y: -200,
    scale: 1.5,
    rotate: 4,
    ease: "none"
}, 0);

// Layer 3: Content fade and movement
masterTimeline.to(".hero-content", {
    opacity: 0.15,
    y: -80,
    scale: 0.94,
    ease: "none"
}, 0);

// Layer 4: Stats cards individual fade out
masterTimeline.to(statCards, {
    opacity: 0.08,
    y: -40,
    stagger: 0.06,
    ease: "none"
}, 0);

// Layer 5: Letters individual fade out
masterTimeline.to(Array.from(welcomeLetters), {
    opacity: 0.04,
    y: -25,
    stagger: 0.05,
    ease: "none"
}, 0);

masterTimeline.to(Array.from(companyLetters), {
    opacity: 0.04,
    y: -25,
    stagger: 0.04,
    ease: "none"
}, 0);

// Layer 6: Vignette intensity increase
masterTimeline.to(".hero::before", {
    opacity: 0.7,
    ease: "none"
}, 0);

// Layer 7: Gradient animation speed increase
masterTimeline.to(".hero-bg", {
    animationDuration: "15s",
    ease: "none"
}, 0);

// ==================== CONTENT SECTION REVEAL ====================

// Content section entrance animation
gsap.timeline({
    scrollTrigger: {
        trigger: ".content",
        start: "top 85%",
        end: "top 50%",
        scrub: 0.8,
        toggleActions: "play none none reverse"
    }
})
.to(".content h2", {
    opacity: 1,
    y: 0,
    duration: 1.4,
    ease: "power3.out"
})
.to(".content p", {
    opacity: 0.9,
    y: 0,
    duration: 1.2,
    stagger: 0.25,
    ease: "power2.out"
}, "-=1.2");

// Background gradient reveal for content section
gsap.to(".content", {
    "--bg-intensity": "1",
    ease: "none",
    scrollTrigger: {
        trigger: ".content",
        start: "top 90%",
        end: "top 30%",
        scrub: 1
    }
});

// ==================== PERFORMANCE OPTIMIZATIONS ====================

// Optimize ScrollTrigger for performance
ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});

// Refresh ScrollTrigger on resize
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});

// ==================== IDLE ANIMATIONS ====================

// Enhanced floating animation for visual element
gsap.to(visualElement, {
    y: `-=${20}`,
    repeat: -1,
    yoyo: true,
    duration: 4,
    ease: "sine.inOut"
});

// Subtle pulse effect for orb
gsap.to(visualElement, {
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    duration: 3,
    ease: "sine.inOut"
});

// Background gradient slow animation enhancement
gsap.to(".hero-bg", {
    backgroundPosition: "100% 100%",
    duration: 25,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// ==================== SMOOTH SCROLL ENHANCEMENT ====================

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: "power2.inOut"
            });
        }
    });
});