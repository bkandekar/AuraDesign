/**
 * WEBORA — Global Scripts & Interactions
 * Vanilla JavaScript, 0 dependencies, fast, accessible & performant
 */

// CHANGE YOUR BUSINESS DETAILS HERE
const WEBORA_CONFIG = {
  whatsappNumber: "919876543210",
  email: "hello@webora.in",
  phone: "+91 98765 43210",
  domain: "https://yourdomain.com",
  instagram: "https://instagram.com/webora.agency",
  linkedin: "https://linkedin.com/company/webora",
  facebook: "https://facebook.com/webora.agency"
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initStickyHeader();
  initMobileMenu();
  initScrollReveal();
  initAnimatedCounters();
  initBeforeAfterSlider();
  initTestimonialSlider();
  initFAQAccordion();
  initMultiStepQuote();
  initPortfolioFilter();
  updateConfigLinks();
});

/* --------------------------------------------------------------------------
   Theme Management (Light / Dark with localStorage & System Preference)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('webora-theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('webora-theme', newTheme);
    });
  }
}

/* --------------------------------------------------------------------------
   Sticky Floating Header with Scroll Effect & Active Links
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Highlight current page in nav
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (currentPath.endsWith(href) || (href === 'index.html' && (currentPath.endsWith('/') || currentPath === ''))) {
      link.classList.add('active');
    }
  });
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!toggleBtn || !mobileMenu) return;

  const toggle = () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  toggleBtn.addEventListener('click', toggle);

  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggle();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Scroll Reveal Animation (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Animated Number Counters
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll('[data-target-count]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target-count'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeProgress * target);
          el.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        };

        requestAnimationFrame(updateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  statNumbers.forEach(num => observer.observe(num));
}

/* --------------------------------------------------------------------------
   Before / After Interactive Comparison Slider (Mouse & Touch)
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.querySelector('.comparison-slider-container');
  const afterPanel = document.querySelector('.comparison-after');
  const handle = document.querySelector('.comparison-handle');
  if (!container || !afterPanel || !handle) return;

  let isDragging = false;

  const setPosition = (x) => {
    const rect = container.getBoundingClientRect();
    let pos = (x - rect.left) / rect.width;
    if (pos < 0.05) pos = 0.05;
    if (pos > 0.95) pos = 0.95;
    const percentage = pos * 100;
    afterPanel.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  const startDrag = (e) => {
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setPosition(clientX);
  };

  const stopDrag = () => {
    isDragging = false;
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setPosition(clientX);
  };

  container.addEventListener('mousedown', startDrag);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('mousemove', onDrag);

  container.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('touchend', stopDrag);
  window.addEventListener('touchmove', onDrag, { passive: true });
}

/* --------------------------------------------------------------------------
   Testimonial Slider (Accessible Keyboard & Touch Friendly)
   -------------------------------------------------------------------------- */
function initTestimonialSlider() {
  const track = document.querySelector('.slider-track');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const cards = track.querySelectorAll('.slider-card');
  const total = cards.length;

  const updateSlide = () => {
    const cardWidth = cards[0].getBoundingClientRect().width + 24; // width + gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  };

  prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateSlide();
  });

  nextBtn.addEventListener('click', () => {
    const visibleCount = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
    currentIndex = Math.min(total - visibleCount, currentIndex + 1);
    updateSlide();
  });

  window.addEventListener('resize', updateSlide);
}

/* --------------------------------------------------------------------------
   FAQ Accordion
   -------------------------------------------------------------------------- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other open FAQs
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Portfolio Filter Tabs
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Multi-Step Quote Form & WhatsApp Message Generator
   -------------------------------------------------------------------------- */
function initMultiStepQuote() {
  const wizard = document.getElementById('quote-wizard');
  if (!wizard) return;

  let currentStep = 1;
  const totalSteps = 5;

  const progressBar = document.getElementById('wizard-progress');
  const stepCountText = document.getElementById('step-counter-text');
  const prevBtn = document.getElementById('wizard-prev-btn');
  const nextBtn = document.getElementById('wizard-next-btn');
  const whatsappBtn = document.getElementById('wizard-whatsapp-btn');

  const formData = {
    websiteType: 'Business Website',
    businessName: '',
    industry: '',
    features: [],
    budget: '₹12,000 - ₹25,000',
    name: '',
    email: '',
    phone: '',
    notes: ''
  };

  const showStep = (step) => {
    document.querySelectorAll('.wizard-step').forEach(el => el.classList.remove('active'));
    const targetStep = document.getElementById(`wizard-step-${step}`);
    if (targetStep) targetStep.classList.add('active');

    if (progressBar) progressBar.style.width = `${(step / totalSteps) * 100}%`;
    if (stepCountText) stepCountText.textContent = `Step ${step} of ${totalSteps}`;

    if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'inline-flex';
    if (nextBtn) nextBtn.style.display = step === totalSteps ? 'none' : 'inline-flex';
    if (whatsappBtn) whatsappBtn.style.display = step === totalSteps ? 'inline-flex' : 'none';
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Validate current step
      if (currentStep === 1) {
        const selectedRadio = wizard.querySelector('input[name="quote_website_type"]:checked');
        if (selectedRadio) formData.websiteType = selectedRadio.value;
      } else if (currentStep === 2) {
        formData.businessName = document.getElementById('quote-biz-name')?.value || '';
        formData.industry = document.getElementById('quote-biz-industry')?.value || '';
      } else if (currentStep === 3) {
        const checkedBoxes = wizard.querySelectorAll('input[name="quote_features"]:checked');
        formData.features = Array.from(checkedBoxes).map(cb => cb.value);
      } else if (currentStep === 4) {
        const selectedBudget = wizard.querySelector('input[name="quote_budget"]:checked');
        if (selectedBudget) formData.budget = selectedBudget.value;
      }

      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      formData.name = document.getElementById('quote-user-name')?.value || 'Client';
      formData.email = document.getElementById('quote-user-email')?.value || 'N/A';
      formData.phone = document.getElementById('quote-user-phone')?.value || 'N/A';
      formData.notes = document.getElementById('quote-user-notes')?.value || 'None';

      const message = `👋 *Hi Webora Team! I would like to request a project quote.*\n\n` +
        `👤 *Name:* ${formData.name}\n` +
        `🏢 *Business:* ${formData.businessName || 'Not specified'} (${formData.industry || 'General'})\n` +
        `🌐 *Website Type:* ${formData.websiteType}\n` +
        `⚡ *Key Features:* ${formData.features.length ? formData.features.join(', ') : 'Standard package'}\n` +
        `💰 *Budget Range:* ${formData.budget}\n` +
        `📞 *Contact:* ${formData.phone} | ${formData.email}\n` +
        `📝 *Additional Notes:* ${formData.notes}\n\n` +
        `Looking forward to discussing next steps!`;

      const whatsappUrl = `https://wa.me/${WEBORA_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  }
}

/* --------------------------------------------------------------------------
   Dynamic Configuration Link Updates
   -------------------------------------------------------------------------- */
function updateConfigLinks() {
  document.querySelectorAll('[data-config-phone]').forEach(el => {
    el.textContent = WEBORA_CONFIG.phone;
    if (el.tagName === 'A') el.setAttribute('href', `tel:${WEBORA_CONFIG.phone.replace(/[^0-9+]/g, '')}`);
  });

  document.querySelectorAll('[data-config-email]').forEach(el => {
    el.textContent = WEBORA_CONFIG.email;
    if (el.tagName === 'A') el.setAttribute('href', `mailto:${WEBORA_CONFIG.email}`);
  });

  document.querySelectorAll('[data-config-whatsapp]').forEach(el => {
    if (el.tagName === 'A') {
      el.setAttribute('href', `https://wa.me/${WEBORA_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hello Webora! I would like to build a modern website for my business.")}`);
    }
  });
}
