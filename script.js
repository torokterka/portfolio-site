// Navigációs Menü (Hamburger Menü) Kezelése
document.getElementById('menu-button').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Back to Top gomb kezelése
const backToTopButton = document.getElementById('back-to-top');

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    }, 100); // Debounce delay of 100ms
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

// Random Idézet API integrációja
const quoteDiv = document.getElementById('quote');
const defaultQuote = {
    content: "A kreativitás intelligencia, ami szórakozik.",
    author: "Albert Einstein"
};

fetch('https://api.quotable.io/random')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        quoteDiv.innerHTML = `<p>"${data.content}"</p><p class="author">- ${data.author}</p>`;
    })
    .catch(error => {
        console.error('Hiba az idézet lekérésekor:', error);
        quoteDiv.innerHTML = `<p>"${defaultQuote.content}"</p><p class="author">- ${defaultQuote.author}</p>`;
    });
