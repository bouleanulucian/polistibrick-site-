# 🤝 HANDOFF — Polistibrick Site

**Pentru dezvoltatorul care preia site-ul.** Documentul ăsta îți spune exact ce am construit, cum funcționează, ce mai trebuie făcut și ce decizii arhitecturale recomand.

---

## 📋 TL;DR

- **Site multi-pagină static HTML/CSS/JS** — 30+ pagini, design premium
- **Deja deployed** pe GitHub Pages: https://bouleanulucian.github.io/polistibrick-site-/
- **Repo:** https://github.com/bouleanulucian/polistibrick-site-
- **Trebuie să:** (1) deployezi pe domeniul polistibrick.eu, (2) implementezi CMS pentru editare conținut, (3) conectezi formularele la un sistem real (email/CRM), (4) completezi conținutul placeholder (imagini, PDF-uri, info real)

---

## 🏗️ ARHITECTURĂ ACTUALĂ

### Stack tehnic
- **HTML static** + **CSS partajat** + **vanilla JS** (fără framework)
- **Fără build step** — fișierele se servesc direct
- **Fără backend** — totul e front-end pur
- **Hosting:** GitHub Pages
- **Fonts:** Google Fonts (Cormorant Garamond + Inter)

### Structura folderelor

```
polistibrick.eu/
├── index.html                          # Redirect la home
├── polistibrick-mercury-style.html     # HOME (single-page premium experience)
├── HANDOFF.md                          # acest fișier
├── assets/
│   ├── css/site.css                    # CSS partajat (toate paginile interne)
│   └── js/site.js                      # JS partajat (nav injection, gallery, lightbox)
├── images/                             # imagini și asset-uri
│   ├── europe-map.svg                  # harta Europei (custom)
│   ├── logo.png
│   ├── mbk-wall.png, pbk-floor.png, tbk-roof.png
│   └── construction/                   # imagini construcție etape
├── produse/                            # PRODUSE
│   ├── pereti-mbk/index.html
│   ├── planseu-pbk/index.html
│   ├── acoperis-tbk/index.html
│   └── accesorii/index.html
├── despre/                             # DESPRE
│   ├── index.html, patent/, certificari/, fabrici/, echipa/
├── pentru/                             # AUDIENȚE
│   ├── proprietari/, arhitecti/, constructori/, investitori/
├── proiecte/                           # CASE STUDIES
│   ├── index.html
│   └── casa-cluj-napoca/, villa-valencia/, ansamblu-lyon/
├── calculator/                         # Calculator cost interactiv (JS)
├── economii/                           # Comparator dinamic vs cărămidă (JS)
├── testimoniale/                       # Video-uri proprietari (placeholders)
├── resurse/                            # Resurse + blog + FAQ
├── oferta/                             # Formular ofertă detaliată
├── contact/                            # Contact
└── legal/                              # Termeni, GDPR, cookies, sustenabilitate
```

### Cum funcționează navigarea
- **Home** (`polistibrick-mercury-style.html`) are nav-ul INLINE în HTML — modificare directă în fișier
- **Subpaginile** folosesc `<header data-include="nav">` și `<footer data-include="footer">` — JS-ul din `assets/js/site.js` injectează nav + footer la load
- Modificările în nav/footer **se fac în** `assets/js/site.js`

### Cum se calculează BASE path
Fiecare subpagină are pe `<body>` un atribut `data-base="../"` sau `data-base="../../"` care indică câte niveluri sunt până la root. JS-ul folosește asta pentru link-uri.

---

## ✅ CE E DEJA FĂCUT

### Funcționalități complete
- ✅ Design responsive (1280px+ desktop, mobile tweaks la 968px și 768px)
- ✅ Animations reveal-on-scroll (IntersectionObserver)
- ✅ Galerii foto cu tabs (Toate/Construcție/Final) + lightbox cu keyboard navigation
- ✅ Calculator cost interactiv (real-time JS)
- ✅ Calculator economii vs cărămidă (cu inflație + grafic)
- ✅ Hartă Europa SVG cu țări highlightate
- ✅ Floating product image cu scroll-based animation (pe home)
- ✅ Nav cu dropdowns
- ✅ Comparison page cu 3 coloane (Polistibrick vs cărămidă clasică vs cărămidă pasivă)

### Pagini complete (texte premium)
- ✅ Home cu hero, stats, fabrici, 3 produse, comparație, CTA
- ✅ 3 produse complete cu specificații + fișe tehnice (links placeholder)
- ✅ Despre, Patent, Certificări (cu placeholder pentru număr brevet)
- ✅ Pentru proprietari/arhitecți/constructori/investitori
- ✅ Calculator cost + Calculator economii
- ✅ 3 case studies cu galerii (placeholders foto)
- ✅ FAQ cu 12 întrebări
- ✅ Termeni, GDPR, Cookies, Sustenabilitate

---

## ❌ CE TREBUIE FĂCUT — în ordine de prioritate

### 🔴 PRIORITATE 1 — Funcțional (de făcut înainte de live)

#### 1.1 Conectare formulare la backend real
Există 3 formulare care acum doar afișează un `alert()` JS:
- `/oferta/index.html` — formular detaliat ofertă (cele mai multe câmpuri, include upload PDF/DWG/etc.)
- `/contact/index.html` — formular contact cu selector țară + upload PDF/DWG/etc.
- `/devino-partener/index.html` — formular aplicație parteneriat

**Recomandare:** Integrează **Netlify Forms** (gratis), **Formspree** ($10/mo), **Web3Forms** (gratis nelimitat) sau **endpoint custom** care primește POST cu `enctype="multipart/form-data"` (pentru atașamente).

#### 1.1.a — ROUTING EMAIL după țară

Pagina `/contact/` are un câmp ascuns `country` cu codul țării alese de utilizator (RO/ES/FR/etc.). Pe baza acelui câmp, backend-ul trebuie să routeze emailul către echipa corectă:

| `country` | Email destinație |
|---|---|
| `RO` | contact@polistibrick.ro |
| `ES` | info@polistibrick.es |
| `FR` | contact@polistibrick.fr |
| `BE` | contact@polistibrick.com |
| `IT` | contact@polistibrick.com |
| `AT` | contact@polistibrick.com |
| `GB` | contact@polistibrick.com |
| `IE` | contact@polistibrick.com |
| `ME` | contact@polistibrick.com |

**Regulă:** unde nu există email dedicat per țară, lead-urile merg la **contact@polistibrick.com** (email central pentru piețe fără reprezentant local sau email propriu).

Pentru `/oferta/` și `/devino-partener/` nu există câmp `country` momentan — recomandare: rutează la `contact@polistibrick.com` cu CC la `info@polistibrick.eu` pentru tracking central. Sau adăugați un selector de țară similar dacă vreți routing per țară.

#### 1.2 Înlocuire placeholder imagini
Caută `[Imagine:` și `[Foto:` și `[Fotografie` în repo — vei găsi ~80 de locuri cu placeholder-uri. Locații prioritare:
- `proiecte/*/index.html` — 60+ slot-uri foto (gallery)
- `despre/echipa/index.html` — foto fondatori + echipă
- `despre/fabrici/index.html` — 2 fabrici
- `despre/certificari/index.html` — 6 logo-uri certificate
- `testimoniale/index.html` — 4 thumbnail-uri video

#### 1.3 Înlocuire placeholder PDF-uri
Toate link-urile `<a href="#">` în secțiunile "Descărcări" trebuie să indice fișiere PDF reale:
- Fișe tehnice produs (MBK 210/270/300, PBK, TBK)
- Detalii constructive DWG
- Familii BIM
- Certificate (CE, ETA, ISO, Passivhaus)
- Manualul de montaj
- Document brevet

Recomandare: stochează PDF-urile în `images/documents/` sau pe un CDN, actualizează link-urile.

#### 1.4 Completare date placeholder
Caută `[completați]` și `[Nume` și `[Adresă` — vei găsi numele fondatorilor, datele patent-ului, adresele fabricilor, numerele de telefon, capacitățile, etc.

#### 1.5 Trafic real & SEO
- Adaugă **Google Analytics** (sau Plausible — privacy-first)
- Adaugă **Google Search Console**
- Verifică **meta tags** pe fiecare pagină
- Adaugă **schema.org JSON-LD** (Organization, Product, Article, FAQ, Breadcrumb)
- Creează **sitemap.xml** + **robots.txt**

### 🟡 PRIORITATE 2 — CMS pentru editare conținut

Clientul (echipa Polistibrick) trebuie să poată edita conținut FĂRĂ a atinge cod. Recomand una din opțiunile:

#### Opțiunea A: **Decap CMS + Netlify** ⭐ recomandat
- **Gratis** până la 100GB/lună trafic
- **Setup:** 2-3 ore
- Migrare de pe GitHub Pages pe Netlify (same repo, doar schimbi DNS)
- Configurezi Decap CMS la `/admin/` cu collections pentru:
  - Blog posts (markdown)
  - Case studies (cu gallery upload)
  - Team members
  - Testimonials
  - Site settings (telefon, email, adrese)
- Refactor pagini ca să folosească data files (markdown → HTML la build sau JS-based render)

#### Opțiunea B: **WordPress headless** + decoupled front-end
- Mai familiar pentru editori, dar refactor major
- Front-end-ul ar fi reconstruit (e.g., Next.js consuming WP REST API)

#### Opțiunea C: **Sanity / Contentful** (headless CMS)
- Free tier OK
- Front-end ar trebui rescris pentru a consuma API-ul

**Cel mai pragmatic: Opțiunea A.** Refactor minor, păstrezi designul, clientul are admin la `/admin/`.

### 🟢 PRIORITATE 3 — Nice-to-have

- **Multi-limbă** (RO/EN/FR/ES/DE) — clientul activează deja în 9 țări
- **WhatsApp Business** floating button
- **Live chat** (Intercom/Tawk.to)
- **Newsletter signup** (Mailchimp/ConvertKit)
- **Pixel Meta + Google Ads** pentru retargeting
- **Cookie banner** GDPR compliant (acum nu există — doar pagină de politică)
- **Image optimization** — convertește PNG/JPG la WebP, lazy loading peste tot
- **Lighthouse audit** — target >90 pe Performance, Accessibility, SEO

---

## 🛠️ CONVENȚII DE COD

### CSS
- **Tokens** în `:root` din `assets/css/site.css` (culori, fonts, shadows, spacing)
- **BEM-ish** naming (`.card`, `.card-hover`, `.card--cream`)
- **Mobile-first** la media queries — 968px și 768px sunt breakpoint-urile principale
- **No Tailwind, no framework** — vanilla CSS pentru maintainability

### JS
- **Vanilla JS** + IIFEs pentru izolare
- **No build step** — funcționează direct în browser
- **No dependencies** pentru site.js
- Decap CMS adăuga ulterior va folosi propriile script-uri

### HTML
- **Semantic** — `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
- **Accesibilitate:** aria-labels pe butoane, alt pe imagini
- **Reveal animations** — adaugă `class="reveal"` pe elementul pe care vrei animare

---

## 🚨 ATENȚIE LA

### Home page e SPECIAL
`polistibrick-mercury-style.html` are CSS și JS **inline** (nu folosește `assets/css/site.css`). E o experiență single-page cu scroll-snap. **Nu modifica fără a înțelege complet** — există un sistem de "floating product" cu scroll-based animation, watermark-uri mari, build-loop animat, etc.

### Toate paginile interne folosesc `data-base` 
Pe `<body data-base="../">` sau `data-base="../../"`. Schimbarea structurii folderelor strică toate link-urile. **Update data-base** dacă muți pagini.

### Decap CMS necesită refactor
Pentru a face paginile editabile prin CMS, blog + case studies trebuie convertite în markdown/JSON + template. Vezi documentația Decap pentru `collections` și `widgets`.

---

## 📞 CONTACT

Pentru orice întrebări despre arhitectură sau decizii: vorbește cu echipa Polistibrick. Pentru cod, repo-ul are istoric git complet — toate decizile sunt documentate în commit messages.

**Site bun! Succes! 🚀**
