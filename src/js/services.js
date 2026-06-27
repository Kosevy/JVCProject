// Import services and testimonials data from JSON directly (Vite bundles them)
import servicesData from '../data/services.json';
import testimonialsData from '../data/testimonials.json';

export async function loadDynamicData() {
  // Load Services
  try {
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid && servicesData.services) {
      servicesGrid.innerHTML = servicesData.services.map(service => `
        <div class="service-card reveal">
          <div class="service-icon"><i class="${service.icon}"></i></div>
          <h4>${service.title}</h4>
          <p>${service.description}</p>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading services:', error);
  }

  // Load Testimonials
  try {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (testimonialsGrid && testimonialsData.testimonials) {
      testimonialsGrid.innerHTML = testimonialsData.testimonials.map(t => `
        <div class="testimonial-card reveal">
          <p>${t.comment}</p>
          <div class="client-info">
            <h5>${t.client}</h5>
            <span>${t.location}</span>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading testimonials:', error);
  }
}
