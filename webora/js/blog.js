/**
 * WEBORA — Blog & Article Functionality
 * Handles client-side article search, category filtering, and scroll reading progress
 */

document.addEventListener('DOMContentLoaded', () => {
  initBlogFilters();
  initReadingProgressBar();
  initTableOfContentsSpy();
});

function initBlogFilters() {
  const searchInput = document.getElementById('blog-search-input');
  const categoryTabs = document.querySelectorAll('.blog-filter-btn');
  const blogArticles = document.querySelectorAll('.blog-card[data-category]');

  if (!blogArticles.length) return;

  let currentCategory = 'all';
  let currentSearchQuery = '';

  const filterCards = () => {
    let visibleCount = 0;
    blogArticles.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTitle = (card.querySelector('.blog-card-title')?.textContent || '').toLowerCase();
      const cardSummary = (card.querySelector('.blog-card-summary')?.textContent || '').toLowerCase();

      const matchesCategory = currentCategory === 'all' || cardCategory.toLowerCase() === currentCategory.toLowerCase();
      const matchesSearch = !currentSearchQuery || cardTitle.includes(currentSearchQuery) || cardSummary.includes(currentSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResults = document.getElementById('blog-no-results');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  if (categoryTabs.length) {
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.getAttribute('data-category') || 'all';
        filterCards();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      filterCards();
    });
  }
}

function initReadingProgressBar() {
  const progressBar = document.getElementById('reading-progress-bar');
  const articleBody = document.querySelector('.article-prose');
  if (!progressBar || !articleBody) return;

  const updateProgress = () => {
    const totalHeight = articleBody.clientHeight;
    const windowHeight = window.innerHeight;
    const scrollPos = window.scrollY - articleBody.offsetTop;
    
    if (scrollPos < 0) {
      progressBar.style.width = '0%';
    } else {
      const progress = Math.min(100, Math.max(0, (scrollPos / (totalHeight - windowHeight + 200)) * 100));
      progressBar.style.width = `${progress}%`;
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

function initTableOfContentsSpy() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const headings = document.querySelectorAll('.article-prose h2, .article-prose h3');
  if (!tocLinks.length || !headings.length) return;

  const onScroll = () => {
    let currentId = '';
    const scrollY = window.scrollY + 140;

    headings.forEach(heading => {
      if (heading.offsetTop <= scrollY) {
        currentId = heading.getAttribute('id') || '';
      }
    });

    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}
