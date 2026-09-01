# WEBORA — Premium Digital Agency Website

> **Tagline:** We build websites that move businesses forward.

Webora is a complete, multi-page, production-ready digital agency website engineered with **pure HTML5, modern CSS custom properties, and Vanilla JavaScript**. It features Apple-level clarity, Linear-style minimalism, dark/light theme switching, interactive project cost calculations, live blog search, and seamless WhatsApp lead generation.

---

## 🚀 Key Features

1. **Pure Vanilla Architecture:** Zero dependencies, zero build steps, zero bloated JS frameworks. Instant sub-second loading on all devices.
2. **Apple & Linear Inspired Aesthetic:** Editorial typography, spacious negative space, smooth scroll reveal animations, and monochromatic dark mode.
3. **Interactive Components:**
   - **Light / Dark Mode Switcher:** Saved in `localStorage` and respects system preferences.
   - **Multi-Step Lead Builder:** Interactive 3-step quote form that formats ready-to-send WhatsApp messages.
   - **Interactive Website Cost Calculator:** Live dynamic cost estimator with selectable features and instant WhatsApp scope forwarding.
   - **Portfolio Filter Tabs:** Dynamic category filtering across Fintech, SaaS, Architecture, and E-Commerce.
   - **Blog Engine:** Client-side real-time article search and category filtering with reading progress indicator.
   - **FAQ Accordion:** Smooth CSS grid animations with ARIA accessibility.
4. **100% Mobile Ergonomics:** Sticky glassmorphism header, responsive drawer navigation, and 48px+ touch targets.
5. **Technical SEO Built-In:** Open Graph meta tags, Schema.org JSON-LD structured data, XML Sitemap, and robots.txt.

---

## 📁 Project Directory Structure

```
webora/
├── index.html                           # Full 13-section Agency Homepage
├── about.html                           # Company Mission & Philosophy
├── services.html                        # Comprehensive Services Directory
├── portfolio.html                       # Selected Work & Case Studies Hub
├── pricing.html                         # Pricing Packages, Matrix & FAQs
├── calculator.html                      # Dedicated Interactive Cost Estimator
├── blog.html                            # Blog Hub with Real-Time Search
├── contact.html                         # Contact Hub & Multi-Step Quote Builder
├── privacy-policy.html                  # Legal Privacy Policy
├── terms-and-conditions.html            # Client Service Agreement
├── refund-policy.html                   # Milestone & Refund Standards
├── 404.html                             # Custom Branded 404 Error Page
├── sitemap.xml                          # Complete XML Sitemap
├── robots.txt                           # Search Engine Crawler Directives
├── css/
│   └── style.css                        # Central Design Tokens & Responsive Styles
├── js/
│   ├── main.js                          # Global Config, Theme, Sliders, Forms, Observers
│   ├── calculator.js                    # Interactive Cost Estimator Engine
│   └── blog.js                          # Real-Time Article Search & Filter Engine
├── services/                            # 8 Dedicated Service Landing Pages
│   ├── website-design.html
│   ├── website-development.html
│   ├── business-websites.html
│   ├── ecommerce.html
│   ├── landing-pages.html
│   ├── website-redesign.html
│   ├── seo-foundations.html
│   └── website-maintenance.html
├── projects/                            # 6 In-Depth Case Study Showcases
│   ├── fintech-dashboard.html
│   ├── aura-architects.html
│   ├── pulse-fitness.html
│   ├── velo-mobility.html
│   ├── lumina-skin.html
│   └── strata-capital.html
└── blog/                                # 6 Editorial Strategy Articles
    ├── why-fast-websites-win.html
    ├── anatomy-high-converting-landing-page.html
    ├── editorial-typography-design.html
    ├── technical-seo-foundations.html
    ├── signs-your-website-needs-redesign.html
    └── the-vanilla-web-advantage.html
```

---

## ⚙️ Global Configuration (How to Update Agency Details)

All agency contact details, phone numbers, WhatsApp numbers, email addresses, and social links are managed from a single central object in `webora/js/main.js`:

```javascript
const WEBORA_CONFIG = {
  agencyName: "WEBORA",
  tagline: "We build websites that move businesses forward.",
  whatsappNumber: "+919876543210", // Your WhatsApp number with country code (no '+' for wa.me links)
  email: "hello@webora.com",
  phone: "+91 98765 43210",
  domain: "https://yourdomain.com",
  social: {
    twitter: "https://x.com/webora",
    linkedin: "https://linkedin.com/company/webora",
    instagram: "https://instagram.com/webora.agency",
    github: "https://github.com/webora"
  }
};
```

Any element in the HTML with `data-config-whatsapp`, `data-config-email`, or `data-config-phone` will be automatically populated with these values upon page load.

---

## 🌐 Free Deployment Guide

### Option 1: GitHub Pages
1. Push the `/webora/` folder contents to your GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` (or `gh-pages`) and root `/` folder.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo>/` in seconds.

### Option 2: Cloudflare Pages / Vercel / Netlify
1. Drag and drop the `webora` folder directly into the Netlify or Vercel dashboard.
2. No build command is required (`Build command: none`, `Publish directory: .`).

---

## 🎨 Design System & Customization

The site styling is powered entirely by CSS Custom Properties located at the top of `webora/css/style.css`:

```css
:root {
  --font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --bg-primary: #FAFAFA;
  --bg-secondary: #F4F4F5;
  --bg-surface: #FFFFFF;
  --text-primary: #18181B;
  --text-secondary: #71717A;
  --accent-primary: #2563EB;
  --accent-light: #60A5FA;
}
```

Simply update these variables to instantly change colors, fonts, or radii across all 28+ pages of the website.
