/* ============================================================
   Jeeya B.K. Portfolio — Component Definitions & JS Logic
   ============================================================ */

/* ── Theme ── */
const THEME_KEY = 'jeeya-theme';
function getTheme() {
  return localStorage.getItem(THEME_KEY) ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const btn = document.getElementById('theme-btn');
  if (!btn) return;
  btn.innerHTML = theme === 'dark' ? sunIcon() : moonIcon();
  btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}
function moonIcon() {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}
function sunIcon() {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
}

/* ── Header Component ── */
class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <div class="container navbar__inner">
    <a href="#hero" class="navbar__brand" aria-label="Jeeya B.K. — Home">
      Jeeya<span>B.K.</span>
    </a>
    <ul class="navbar__nav" role="list">
      <li><a href="#about"          class="nav-link">About</a></li>
      <li><a href="#skills"         class="nav-link">Skills</a></li>
      <li><a href="#projects"       class="nav-link">Projects</a></li>
      <li><a href="#journey"        class="nav-link">Journey</a></li>
      <li><a href="#certifications" class="nav-link">Certs</a></li>
      <li><a href="#contact"        class="nav-link">Contact</a></li>
    </ul>
    <button id="theme-btn" class="theme-btn" aria-label="Toggle dark mode">
      ${moonIcon()}
    </button>
  </div>
</nav>`;

    this.querySelector('#theme-btn').addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }
}

/* ── Footer Component ── */
class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
<footer class="footer" role="contentinfo">
  <div class="container footer__inner">
    <span class="footer__brand">Jeeya<span>B.K.</span></span>
    <p>&copy; ${year} Jeeya B.K. All rights reserved.</p>
    <p>IT Student · Informatics College Pokhara</p>
  </div>
</footer>`;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

/* ── Boot ── */
applyTheme(getTheme());

document.addEventListener('DOMContentLoaded', () => {

  /* Smooth scroll with navbar offset */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  /* Active nav link highlight */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));

  /* Fade-up / fade-in scroll animations */
  const animObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        animObs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.fade-up, .fade-in').forEach(el => animObs.observe(el));

  /* Skill bar animation (trigger once visible) */
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.querySelectorAll('.bar__fill').forEach(bar => bar.classList.add('animated'));
        barObs.unobserve(en.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skills__grid').forEach(el => barObs.observe(el));

  /* Contact form */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Message Sent ✓';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; form.reset(); }, 3000);
    });
  }

});
