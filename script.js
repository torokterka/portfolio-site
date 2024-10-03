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

// Random Idézet API integrációja
fetch('https://api.quotable.io/quotes/random')
    .then(response => response.json())
    .then(data => {
        // Since the response is an array, we need to get the first element
        const quote = data[0];
        const quoteDiv = document.getElementById('quote');
        quoteDiv.innerHTML = `<p>"${quote.content}"</p><p class="author">- ${quote.author}</p>`;
    })
    .catch(error => {
        console.error('Hiba az idézet lekérésekor:', error);
        const quoteDiv = document.getElementById('quote');
        quoteDiv.innerHTML = `<p>"A kreativitás intelligencia, ami szórakozik."</p><p class="author">- Albert Einstein</p>`;
    });
