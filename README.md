# Webora — Premium Agency Website

A complete, static, multi-page website for Webora — a web design & development agency.
Built with pure HTML, CSS and vanilla JavaScript. No frameworks, no build tools, no
dependencies. Ready to deploy directly to GitHub Pages.

## Before you launch

1. **Update the domain.** Search the project for `yourdomain.com` (it appears in every
   page's `<link rel="canonical">`, Open Graph tags, `sitemap.xml`, and `robots.txt`) and
   replace it with your real domain.
2. **Update business details.** Open `js/main.js` and edit the `WEBORA_CONFIG` object near
   the top of the file:
   ```js
   const WEBORA_CONFIG = {
     whatsappNumber: "919876543210", // country code + number, no + or spaces
     email: "hello@webora.in",
     phone: "+91 98765 43210",
     domain: "https://yourdomain.com",
     instagram: "#",
     linkedin: "#",
     facebook: "#"
   };
   ```
   Every page pulls contact details and social links from this single object.
3. **Replace placeholder content.** Portfolio projects, blog articles and testimonials use
   realistic placeholder content — swap these for your real case studies and clients before
   launch.
4. **Add real images.** The site currently uses CSS gradients and inline SVG in place of
   photography (per the "no external image dependencies" requirement). Add real photos to
   the `images/` folder and reference them in the relevant `.work-media` /
   `.hero-visual` elements for a fully custom look.

## Folder structure

```
webora/
├── index.html, about.html, services.html, portfolio.html, pricing.html,
│   calculator.html, blog.html, contact.html, 404.html
├── privacy-policy.html, terms-and-conditions.html, refund-policy.html
├── css/style.css          — all design tokens, layout and components
├── js/
│   ├── main.js             — shared site-wide functionality + WEBORA_CONFIG
│   ├── calculator.js        — Website Cost Estimator logic
│   └── blog.js               — blog search + category filtering
├── images/                  — favicon and any photography you add
├── services/                — 8 individual service pages
├── projects/                 — 6 project / case-study pages
├── blog/                      — 6 original blog articles
├── sitemap.xml
└── robots.txt
```

## Deploying to GitHub Pages

1. Create a new GitHub repository and push the contents of this folder to it.
2. In the repository, go to **Settings → Pages**.
3. Under **Source**, select the `main` branch and the `/ (root)` folder.
4. Save. GitHub will publish your site at `https://<username>.github.io/<repo-name>/`.
5. If you're using a custom domain, add a `CNAME` file with your domain name and configure
   your DNS records per GitHub's custom domain documentation.

## Features included

- Sticky, floating, backdrop-blur navigation with an animated mobile menu
- Manual dark mode toggle with system-preference detection and `localStorage` persistence
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Animated stat counters
- Draggable before/after comparison slider (mouse, touch and keyboard)
- Accessible testimonial slider (touch swipe + arrow keys)
- FAQ accordions
- Portfolio and blog category filtering
- Blog live search
- 4-step Website Cost Estimator with dynamic pricing logic
- 5-step Contact quote form
- Both flows generate a pre-filled WhatsApp message on submit
- Organization, LocalBusiness, Service, CreativeWork and BlogPosting schema (JSON-LD)
- Unique title, meta description, canonical URL, Open Graph and Twitter Card tags on every page

## Notes

- No PHP, database, Node.js, npm, API keys, environment variables or build tools are used
  anywhere in this project — it is 100% static and works by opening `index.html` directly
  or hosting on any static file host.
- All contact/social details are centralised in `WEBORA_CONFIG` inside `js/main.js` —
  update it once and every page updates.
