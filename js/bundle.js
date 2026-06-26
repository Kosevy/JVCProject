// header.js - Handles sticky navigation on scroll
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('sticky', window.scrollY > 0);
    });
  }
});// sidebar.js - Handles mobile sidebar open/close
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.querySelector('.menu__button');
  const closeBtn = document.querySelector('.home__sidebar li:first-child a'); // first li contains close icon
  const sidebar = document.querySelector('.home__sidebar');

  if (openBtn && sidebar) {
    openBtn.addEventListener('click', () => {
      sidebar.style.display = 'flex';
      // Optional: trap focus
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => {
      sidebar.style.display = 'none';
    });
  }

  // Close on ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const sidebar = document.querySelector('.home__sidebar');
      if (sidebar && sidebar.style.display === 'flex') {
        sidebar.style.display = 'none';
      }
    });
  });
});// gallery-filter.js - Filter portfolio items with event delegation
document.addEventListener('DOMContentLoaded', () => {
  const filterContainer = document.getElementById('filter__btn');
  const galleryItems = document.querySelectorAll('.project__gallery .item');

  if (!filterContainer) return;

  filterContainer.addEventListener('click', e => {
    const btn = e.target.closest('li');
    if (!btn) return;

    // Update active state
    filterContainer.querySelectorAll('li').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.getAttribute('data-target');

    galleryItems.forEach(item => {
      const show = target === 'all' || item.getAttribute('data-id') === target;
      item.style.display = show ? 'block' : 'none';
    });
  });
});// main.js - Entry point for custom JS (currently just ensures DOM is ready)
document.addEventListener('DOMContentLoaded', () => {
  // Modules are self-initializing via their own DOMContentLoaded listeners
  console.log('DOM loaded, custom scripts ready');
});