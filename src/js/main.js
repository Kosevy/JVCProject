// Main JavaScript file for JVC Urbano
import { loadDynamicData } from './services.js';

document.addEventListener('DOMContentLoaded', () => {
  
  // --- STICKY HEADER ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.add('sticky'); // Always sticky based on user pref or just keep it simple
      if(window.scrollY <= 50) header.classList.remove('sticky');
    }
  });
  
  // Initial check
  if (window.scrollY > 50) {
    header.classList.add('sticky');
  }

  // --- MOBILE MENU (Simplified) ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'var(--glass-bg)';
      navLinks.style.backdropFilter = 'blur(16px)';
      navLinks.style.padding = '2rem';
      navLinks.style.gap = '1.5rem';
    });
  }

  // --- REVEAL ON SCROLL ---
  function initRevealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // --- PROJECT FILTERING ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (filterBtns.length > 0 && projectItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 400); // match transition duration
          }
        });
      });
    });
  }

  // --- LOAD DYNAMIC DATA (SERVICES, TESTIMONIALS) ---
  loadDynamicData().then(() => {
    // Initialize reveal elements after dynamic content has been inserted
    initRevealOnScroll();
  });
});