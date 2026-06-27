// Decap CMS Custom Preview Templates initialization
// This script can be loaded inside the Decap CMS admin panel to register custom previews

// Example:
// CMS.registerPreviewStyle("/src/css/main.css");
// CMS.registerPreviewTemplate("services", ({ entry }) => {
//   const services = entry.getIn(['data', 'services']);
//   return h('div', { className: 'services-grid' }, 
//     services.map(service => 
//       h('div', { className: 'service-card' },
//         h('h4', {}, service.get('title')),
//         h('p', {}, service.get('description'))
//       )
//     )
//   );
// });
console.log('Decap CMS previews initialized');
