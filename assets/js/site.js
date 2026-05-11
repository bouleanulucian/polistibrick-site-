/* ===========================================================================
   POLISTIBRICK — Shared site JS
   - Injects nav + footer into pages
   - Handles scroll-shadow on nav
   - Handles reveal-on-scroll animations
   =========================================================================== */

(function () {
  const BASE = (function () {
    // Determine path prefix back to root. Pages can override by setting
    // <body data-base="/"> or similar. Default: compute from current depth.
    const explicit = document.body.dataset.base;
    if (explicit) return explicit;
    const depth = (window.location.pathname.replace(/\/$/, '').match(/\//g) || []).length;
    return depth <= 1 ? '' : '../'.repeat(depth - 1);
  })();

  const NAV_HTML = `
    <div class="nav-inner">
      <a href="${BASE}" class="nav-logo" aria-label="Polistibrick — acasă">
        <img src="${BASE}images/logo.png" alt="Polistibrick" loading="eager">
      </a>
      <nav class="nav-menu" aria-label="Navigare principală">
        <div class="nav-item">
          <button class="nav-link" aria-haspopup="true" aria-expanded="false">
            Produse
            <svg class="nav-link-caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 5l3 3 3-3"/></svg>
          </button>
          <div class="nav-dropdown">
            <a class="nav-dropdown-item" href="${BASE}produse/pereti-mbk/">Pereți MBK<span class="nav-dropdown-item-sub">Cofraj-pierdut pentru pereți portanți</span></a>
            <a class="nav-dropdown-item" href="${BASE}produse/planseu-pbk/">Planșee PBK<span class="nav-dropdown-item-sub">Panouri prefabricate cu defazaj 10,8 h</span></a>
            <a class="nav-dropdown-item" href="${BASE}produse/acoperis-tbk/">Acoperiș TBK<span class="nav-dropdown-item-sub">Sistem Passivhaus din fabrică</span></a>
            <a class="nav-dropdown-item" href="${BASE}produse/accesorii/">Accesorii<span class="nav-dropdown-item-sub">Colțare, capete, scări, ferestre</span></a>
          </div>
        </div>
        <div class="nav-item">
          <button class="nav-link" aria-haspopup="true" aria-expanded="false">
            Soluții
            <svg class="nav-link-caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 5l3 3 3-3"/></svg>
          </button>
          <div class="nav-dropdown">
            <a class="nav-dropdown-item" href="${BASE}pentru/proprietari/">Pentru proprietari<span class="nav-dropdown-item-sub">Casă pasivă fără facturi mari</span></a>
            <a class="nav-dropdown-item" href="${BASE}pentru/arhitecti/">Pentru arhitecți<span class="nav-dropdown-item-sub">Detalii constructive, BIM, fișe</span></a>
            <a class="nav-dropdown-item" href="${BASE}pentru/constructori/">Pentru constructori<span class="nav-dropdown-item-sub">Montaj, certificare, parteneriat</span></a>
            <a class="nav-dropdown-item" href="${BASE}pentru/investitori/">Pentru investitori<span class="nav-dropdown-item-sub">ROI, viteză execuție, ansambluri</span></a>
          </div>
        </div>
        <div class="nav-item">
          <button class="nav-link" aria-haspopup="true" aria-expanded="false">
            Proiecte
            <svg class="nav-link-caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 5l3 3 3-3"/></svg>
          </button>
          <div class="nav-dropdown">
            <a class="nav-dropdown-item" href="${BASE}proiecte/">Case construite<span class="nav-dropdown-item-sub">Galerie + hartă cu proiecte</span></a>
            <a class="nav-dropdown-item" href="${BASE}testimoniale/">Testimoniale (video)<span class="nav-dropdown-item-sub">Proprietarii vorbesc, cu cifre reale</span></a>
          </div>
        </div>
        <div class="nav-item">
          <button class="nav-link" aria-haspopup="true" aria-expanded="false">
            Calculator
            <svg class="nav-link-caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 5l3 3 3-3"/></svg>
          </button>
          <div class="nav-dropdown">
            <a class="nav-dropdown-item" href="${BASE}calculator/">Calculator cost<span class="nav-dropdown-item-sub">Estimează prețul panourilor casei tale</span></a>
            <a class="nav-dropdown-item" href="${BASE}economii/">Calculator economii<span class="nav-dropdown-item-sub">Polistibrick vs cărămidă pe 25 de ani</span></a>
          </div>
        </div>
        <div class="nav-item">
          <button class="nav-link" aria-haspopup="true" aria-expanded="false">
            Resurse
            <svg class="nav-link-caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 5l3 3 3-3"/></svg>
          </button>
          <div class="nav-dropdown">
            <a class="nav-dropdown-item" href="${BASE}resurse/blog/">Blog<span class="nav-dropdown-item-sub">Articole despre Casa Pasivă, ICF</span></a>
            <a class="nav-dropdown-item" href="${BASE}resurse/faq/">Întrebări frecvente<span class="nav-dropdown-item-sub">Răspunsuri la cele mai comune întrebări</span></a>
            <a class="nav-dropdown-item" href="${BASE}resurse/">Descărcări<span class="nav-dropdown-item-sub">Fișe tehnice, BIM, certificate</span></a>
          </div>
        </div>
        <div class="nav-item">
          <button class="nav-link" aria-haspopup="true" aria-expanded="false">
            Despre
            <svg class="nav-link-caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 5l3 3 3-3"/></svg>
          </button>
          <div class="nav-dropdown">
            <a class="nav-dropdown-item" href="${BASE}despre/">Compania<span class="nav-dropdown-item-sub">Cine suntem, viziune, misiune</span></a>
            <a class="nav-dropdown-item" href="${BASE}despre/patent/">Patentul Polistibrick<span class="nav-dropdown-item-sub">Brevetul care ne face unici</span></a>
            <a class="nav-dropdown-item" href="${BASE}despre/certificari/">Certificări<span class="nav-dropdown-item-sub">CE, ISO, Passivhaus, agremente</span></a>
            <a class="nav-dropdown-item" href="${BASE}despre/fabrici/">Fabricile noastre<span class="nav-dropdown-item-sub">Valencia (ES) și Craiova (RO)</span></a>
            <a class="nav-dropdown-item" href="${BASE}despre/echipa/">Echipa<span class="nav-dropdown-item-sub">Fondatori și oamenii noștri</span></a>
          </div>
        </div>
      </nav>
      <div class="nav-cta">
        <a href="${BASE}contact/" class="btn btn-ghost">Contact</a>
        <a href="${BASE}oferta/" class="btn btn-primary btn-arrow">Cere ofertă</a>
      </div>
    </div>
  `;

  const FOOTER_HTML = `
    <div class="container container--wide">
      <div class="footer-grid">
        <div>
          <a href="${BASE}" class="footer-logo">
            <img src="${BASE}images/logo.png" alt="Polistibrick" style="height:32px;">
          </a>
          <p class="footer-brand-tagline">Sistemul ICF brevetat pentru case pasive premium, fără facturi de energie. Fabricat în UE.</p>
        </div>
        <div class="footer-col">
          <h5>Produse</h5>
          <ul>
            <li><a href="${BASE}produse/pereti-mbk/">Pereți MBK</a></li>
            <li><a href="${BASE}produse/planseu-pbk/">Planșee PBK</a></li>
            <li><a href="${BASE}produse/acoperis-tbk/">Acoperiș TBK</a></li>
            <li><a href="${BASE}produse/accesorii/">Accesorii</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Soluții</h5>
          <ul>
            <li><a href="${BASE}pentru/proprietari/">Proprietari</a></li>
            <li><a href="${BASE}pentru/arhitecti/">Arhitecți</a></li>
            <li><a href="${BASE}pentru/constructori/">Constructori</a></li>
            <li><a href="${BASE}pentru/investitori/">Investitori</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Resurse</h5>
          <ul>
            <li><a href="${BASE}proiecte/">Proiecte realizate</a></li>
            <li><a href="${BASE}resurse/blog/">Blog</a></li>
            <li><a href="${BASE}resurse/faq/">Întrebări frecvente</a></li>
            <li><a href="${BASE}resurse/">Descărcări</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Companie</h5>
          <ul>
            <li><a href="${BASE}despre/">Despre noi</a></li>
            <li><a href="${BASE}despre/patent/">Patent</a></li>
            <li><a href="${BASE}despre/certificari/">Certificări</a></li>
            <li><a href="${BASE}despre/fabrici/">Fabrici</a></li>
            <li><a href="${BASE}contact/">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Polistibrick. Toate drepturile rezervate. Sistem brevetat.</span>
        <div class="footer-bottom-links">
          <a href="${BASE}legal/termeni/">Termeni</a>
          <a href="${BASE}legal/confidentialitate/">Confidențialitate</a>
          <a href="${BASE}legal/cookies/">Cookies</a>
          <a href="${BASE}legal/sustenabilitate/">Sustenabilitate</a>
        </div>
      </div>
    </div>
  `;

  // Inject nav and footer
  function inject() {
    const navMount = document.querySelector('[data-include="nav"]');
    const footMount = document.querySelector('[data-include="footer"]');
    if (navMount) navMount.innerHTML = NAV_HTML;
    if (footMount) footMount.innerHTML = FOOTER_HTML;

    // Mark active page in nav
    const path = window.location.pathname;
    document.querySelectorAll('.nav-dropdown-item, .nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const linkPath = new URL(href, window.location.origin).pathname;
      if (path === linkPath || (linkPath !== '/' && path.startsWith(linkPath))) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // Scroll shadow on nav
  function navShadow() {
    const nav = document.querySelector('[data-include="nav"]');
    if (!nav) return;
    const update = () => nav.classList.toggle('is-scrolled', window.scrollY > 6);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  // Reveal-on-scroll
  function reveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    items.forEach(el => io.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    inject();
    navShadow();
    reveal();
  });
})();
