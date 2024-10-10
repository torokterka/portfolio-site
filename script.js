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
async function fetchQuote() {
    const quoteDiv = document.getElementById('quote');
    const defaultQuote = {
        content: "A kreativitás intelligencia, ami szórakozik.",
        author: "Albert Einstein"
    };

    try {
        const response = await fetch('https://quotes15.p.rapidapi.com/quotes/random/?language_code=hu', {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'quotes15.p.rapidapi.com',
                'x-rapidapi-key': '5b1144b89amsh50f03f3dae70c68p1d3128jsnfe4dc5731a90'
            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        quoteDiv.innerHTML = `<p>"${data.content}"</p><p class="author">- ${data.originator.name}</p>`;
    } catch (error) {
        console.error('Hiba az idézet lekérésekor:', error);
        quoteDiv.innerHTML = `<p>"${defaultQuote.content}"</p><p class="author">- ${defaultQuote.author}</p>`;
        alert('Nem sikerült betölteni az idézetet. Kérjük, próbálja meg később.');
    }
}

fetchQuote();
