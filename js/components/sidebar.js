// sidebar.js - Handles mobile sidebar open/close
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
});