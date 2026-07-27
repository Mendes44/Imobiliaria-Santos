/* ============================================================
   NAVBAR – scroll + mobile menu
   ============================================================ */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
const navLinks  = document.querySelectorAll('.navbar__link');

function updateNavbar() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ============================================================
   HERO – load animation + active link on scroll
   ============================================================ */
window.addEventListener('load', () => {
  document.querySelector('.hero').classList.add('loaded');
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
});

/* Active nav link based on scroll position */
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });

/* ============================================================
   INTERSECTION OBSERVER – fade/slide-in elements
   ============================================================ */
const animatedEls = document.querySelectorAll('.fade-in, .slide-in-right');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

animatedEls.forEach(el => observer.observe(el));

/* ============================================================
   STATS – animated counter
   ============================================================ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const step = Math.ceil(duration / target);
  let current = 0;

  const timer = setInterval(() => {
    current += Math.ceil(target / (duration / 16));
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toLocaleString('pt-BR');
  }, 16);
}

const statsSection = document.querySelector('.stats');
const counters     = document.querySelectorAll('.stats__number');
let   countersStarted = false;

const statsObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(animateCounter);
    }
  },
  { threshold: 0.3 }
);

if (statsSection) statsObserver.observe(statsSection);

/* ============================================================
   YEAR
   ============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
