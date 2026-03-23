class Header extends HTMLElement {
  connectedCallback() {
    const activePage = this.getAttribute('active') || 'home';
    this.innerHTML = `
      <nav class="navbar">
        <div class="container">
          <a href="index.html" class="navbar-brand">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-red);">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            Jeeya<span>BK</span>
          </a>
          <ul class="navbar-nav">
            <li><a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a></li>
            <li><a href="skills.html" class="nav-link ${activePage === 'skills' ? 'active' : ''}">Skills & Expertise</a></li>
            <li><a href="contact.html" class="nav-link ${activePage === 'contact' ? 'active' : ''}">Contact</a></li>
          </ul>
        </div>
      </nav>
    `;
  }
}

class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="container">
          <p style="margin-bottom: 0.5rem; font-weight: 500;">&copy; ${new Date().getFullYear()} Jeeya BK. IT Professional & System Administrator.</p>
          <p style="font-size: 0.875rem; color: #718096; margin-bottom: 0;">Built with HTML5, CSS3, & Vanilla JS for Cloudflare Pages.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-header', Header);
customElements.define('site-footer', Footer);

// Simple scroll animation observer
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.card, .skill-list-section').forEach((el) => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});
