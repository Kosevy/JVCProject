// gallery-filter.js - Filter portfolio items with event delegation
document.addEventListener('DOMContentLoaded', () => {
  const filterContainer = document.getElementById('filter__btn');
  const galleryItems = document.querySelectorAll('.project__gallery .item');

  if (!filterContainer) return;

  filterContainer.addEventListener('click', e => {
    const btn = e.target.closest?';

<tool_call>
<function=Write>
<parameter=content>
// gallery-filter.js - Filter portfolio items with event delegation
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
});