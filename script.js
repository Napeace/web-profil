document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Inisialisasi Animasi AOS
  AOS.init({
    duration: 800,
    once: true,
  });

  // 2. Fungsi Smooth Scroll
  document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 3. Fungsi Image Preview saat Hover
  const previewContainer = document.querySelector('.preview-container');
  if (previewContainer) {
    // Buat elemen preview secara dinamis
    const imagePreview = document.createElement('div');
    imagePreview.className = 'image-preview';
    imagePreview.innerHTML = `
      <img>
      <div class="image-preview-overlay"></div>
    `;
    previewContainer.appendChild(imagePreview);
    
    const previewImg = imagePreview.querySelector('img');
    const previewOverlay = imagePreview.querySelector('.image-preview-overlay');

    // Targetkan semua kartu proyek dan sertifikat
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      const cardImg = card.querySelector('img');
      const cardTitle = card.querySelector('h3');

      if (cardImg && cardTitle) {
          card.addEventListener('mouseenter', () => {
              previewImg.src = cardImg.src;
              previewOverlay.textContent = cardTitle.textContent;
              imagePreview.classList.add('active');
          });

          card.addEventListener('mouseleave', () => {
              imagePreview.classList.remove('active');
          });

          card.addEventListener('mousemove', (e) => {
              let x = e.clientX + 20;
              let y = e.clientY + 20;
              
              if (x + imagePreview.offsetWidth > window.innerWidth - 20) {
                  x = e.clientX - imagePreview.offsetWidth - 20;
              }
              if (y + imagePreview.offsetHeight > window.innerHeight - 20) {
                  y = e.clientY - imagePreview.offsetHeight - 20;
              }

              imagePreview.style.left = `${x}px`;
              imagePreview.style.top = `${y}px`;
          });
      }
    });
  }
});