// Animation au défilement
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Mode sombre
const themeSwitch = document.querySelector('.theme-switch');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function toggleTheme() {
    document.body.dataset.theme = 
        document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
}

// Initialiser le thème
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.dataset.theme = savedTheme;
} else if (prefersDarkScheme.matches) {
    document.body.dataset.theme = 'dark';
}

themeSwitch.addEventListener('click', toggleTheme);

// Effet de parallaxe
window.addEventListener('scroll', () => {
    const parallaxBg = document.querySelector('.parallax-bg');
    const scrolled = window.pageYOffset;
    parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Animation des boutons de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Configuration des particules
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: {
            enable: true,
            speed: 2
        }
    }
});

// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMobile = document.querySelector('.nav-mobile');

hamburger.addEventListener('click', () => {
    navMobile.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Curseur personnalisé
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// Système de filtrage
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lightbox
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
    });
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
    }
});

// Animation au scroll pour les projets
const animateOnScroll = () => {
    galleryItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;
        
        if (itemTop < window.innerHeight && itemBottom > 0) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');

document.addEventListener('DOMContentLoaded', () => {
    if (!themeToggle) {
        console.error("L'élément theme-toggle n'a pas été trouvé");
        return;
    }

    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialiser le thème
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    } else {
        const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        document.body.setAttribute('data-theme', systemTheme);
        themeToggle.checked = prefersDarkScheme.matches;
    }

    // Gérer le changement de thème
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});
document.addEventListener('mousemove', (e) => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});
