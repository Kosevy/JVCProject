// header.js - Handles sticky navigation on scroll
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('sticky', window.scrollY > 0);
    });
  }
});