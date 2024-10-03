// Navigációs Menü (Hamburger Menü) Kezelése
document.getElementById('menu-button').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Back to Top gomb kezelése
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll Fade-In Animáció
const faders = document.querySelectorAll('.scroll-fade-in');

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('scroll-fade-in-visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Microinteractions
const buttons = document.querySelectorAll('a, button');

buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.classList.add('hovered');
    });
    button.addEventListener('mouseout', () => {
        button.classList.remove('hovered');
    });
});

// Parallax Effektus
window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax');
    if (parallax) {
        let scrollPosition = window.pageYOffset;
        parallax.style.backgroundPositionY = (scrollPosition * 0.5) + 'px';
    }
});

// Service Worker regisztrálása a PWA funkciókhoz
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker regisztrálva:', registration);
        })
        .catch(error => {
            console.log('Service Worker regisztráció sikertelen:', error);
        });
    });
}
