/**
 * WEBORA — Website Cost Estimator Logic
 * Provides transparent, instant pricing estimations and generates formatted WhatsApp inquiries
 */

document.addEventListener('DOMContentLoaded', () => {
  initCostCalculator();
});

function initCostCalculator() {
  const calcContainer = document.getElementById('website-cost-calculator');
  if (!calcContainer) return;

  const typeOptions = document.querySelectorAll('input[name="calc_type"]');
  const pageOptions = document.querySelectorAll('input[name="calc_pages"]');
  const featureCheckboxes = document.querySelectorAll('input[name="calc_features"]');
  const timelineOptions = document.querySelectorAll('input[name="calc_timeline"]');
  const displayTotal = document.getElementById('calc-total-display');
  const summaryBreakdown = document.getElementById('calc-summary-items');
  const calcWhatsappBtn = document.getElementById('calc-whatsapp-cta');

  const basePrices = {
    landing: 7999,
    business: 12000,
    ecommerce: 18000,
    custom: 25000
  };

  const pageMultipliers = {
    '1-3': 0,
    '4-7': 3000,
    '8-15': 6000,
    '15+': 12000
  };

  const featurePrices = {
    seo: 2500,
    blog: 2000,
    whatsapp: 1000,
    payments: 3500,
    booking: 3000,
    ecommerce_addon: 5000,
    maintenance: 2500,
    multilingual: 4000,
    animations: 2500
  };

  function updateActiveCardStyles() {
    document.querySelectorAll('.calc-option-card').forEach(card => {
      const input = card.querySelector('input');
      if (input && input.checked) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
  }

  function calculateEstimate() {
    updateActiveCardStyles();

    // 1. Base website type
    const selectedType = document.querySelector('input[name="calc_type"]:checked')?.value || 'business';
    let total = basePrices[selectedType] || 12000;
    const typeLabel = document.querySelector(`input[name="calc_type"]:checked`)?.closest('.calc-option-card')?.querySelector('.calc-opt-name')?.textContent || 'Business Website';

    // 2. Page Count
    const selectedPages = document.querySelector('input[name="calc_pages"]:checked')?.value || '4-7';
    const pageCost = pageMultipliers[selectedPages] || 0;
    total += pageCost;
    const pageLabel = document.querySelector(`input[name="calc_pages"]:checked`)?.closest('.calc-option-card')?.querySelector('.calc-opt-name')?.textContent || '4–7 Pages';

    // 3. Features
    const selectedFeatures = [];
    let featuresTotal = 0;
    featureCheckboxes.forEach(box => {
      if (box.checked) {
        const val = box.value;
        const cost = featurePrices[val] || 0;
        featuresTotal += cost;
        const name = box.closest('.calc-option-card')?.querySelector('.calc-opt-name')?.textContent || val;
        selectedFeatures.push(name);
      }
    });
    total += featuresTotal;

    // 4. Timeline
    const timeline = document.querySelector('input[name="calc_timeline"]:checked')?.value || 'standard';
    if (timeline === 'urgent') {
      total = Math.round(total * 1.25);
    }

    // Format currency (INR)
    const formattedPrice = '₹' + total.toLocaleString('en-IN');
    if (displayTotal) {
      displayTotal.textContent = formattedPrice;
    }

    // Update Summary list
    if (summaryBreakdown) {
      summaryBreakdown.innerHTML = `
        <div style="font-size: var(--fs-xs); color: var(--text-secondary); line-height: 1.6;">
          <p><strong>Type:</strong> ${typeLabel}</p>
          <p><strong>Scale:</strong> ${pageLabel}</p>
          <p><strong>Selected Add-ons (${selectedFeatures.length}):</strong> ${selectedFeatures.length ? selectedFeatures.join(', ') : 'Standard included foundation'}</p>
          <p><strong>Timeline:</strong> ${timeline === 'urgent' ? 'Fast-Track (Express Delivery)' : 'Standard (2–3 Weeks)'}</p>
        </div>
      `;
    }

    // WhatsApp Message Generator
    if (calcWhatsappBtn) {
      const msg = `🚀 *Webora Website Estimate Inquiry*\n\n` +
        `🌐 *Type:* ${typeLabel}\n` +
        `📄 *Pages:* ${pageLabel}\n` +
        `⚡ *Add-ons:* ${selectedFeatures.length ? selectedFeatures.join(', ') : 'Base features'}\n` +
        `⏱️ *Timeline:* ${timeline === 'urgent' ? 'Express Delivery' : 'Standard'}\n` +
        `💰 *Estimated Investment:* ${formattedPrice}\n\n` +
        `I would like to verify this scope and discuss kickstarting the project.`;

      const num = typeof WEBORA_CONFIG !== 'undefined' ? WEBORA_CONFIG.whatsappNumber : '919876543210';
      calcWhatsappBtn.onclick = (e) => {
        e.preventDefault();
        window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank');
      };
    }
  }

  // Bind event listeners
  [...typeOptions, ...pageOptions, ...featureCheckboxes, ...timelineOptions].forEach(input => {
    input.addEventListener('change', calculateEstimate);
  });

  // Make whole card clickable
  document.querySelectorAll('.calc-option-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const input = card.querySelector('input');
      if (input && e.target !== input) {
        if (input.type === 'radio') {
          input.checked = true;
        } else if (input.type === 'checkbox') {
          input.checked = !input.checked;
        }
        input.dispatchEvent(new Event('change'));
      }
    });
  });

  // Initial calculation run
  calculateEstimate();
}
