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

  // 3. Fungsi Image Preview saat Hover (Hanya pada gambar)
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

    // Targetkan hanya bagian gambar di dalam kartu proyek dan sertifikat
    const imageContainers = document.querySelectorAll('.project-card .image-container');

    imageContainers.forEach(container => {
      const cardImg = container.querySelector('img');
      const card = container.closest('.project-card');
      const cardTitle = card.querySelector('h3');

      if (cardImg && cardTitle) {
          // Event hover untuk preview gambar - hanya pada image container
          container.addEventListener('mouseenter', () => {
              previewImg.src = cardImg.src;
              previewOverlay.textContent = cardTitle.textContent;
              imagePreview.classList.add('active');
          });

          container.addEventListener('mouseleave', () => {
              imagePreview.classList.remove('active');
          });

          container.addEventListener('mousemove', (e) => {
              let x = e.clientX + 20;
              let y = e.clientY + 20;
              
              // Cek batas kanan layar
              if (x + imagePreview.offsetWidth > window.innerWidth - 20) {
                  x = e.clientX - imagePreview.offsetWidth - 20;
              }
              
              // Cek batas bawah layar
              if (y + imagePreview.offsetHeight > window.innerHeight - 20) {
                  y = e.clientY - imagePreview.offsetHeight - 20;
              }

              imagePreview.style.left = `${x}px`;
              imagePreview.style.top = `${y}px`;
          });
      }
    });
  }

  // 4. Fungsi Card Hover Effect (Untuk efek card muncul ke depan)
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Hover effect untuk card (tidak termasuk preview gambar)
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-12px) scale(1.05) rotateX(5deg)';
      card.style.zIndex = '10';
      card.style.boxShadow = `
        0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(16, 185, 129, 0.1),
        0 0 20px rgba(16, 185, 129, 0.1)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.zIndex = '';
      card.style.boxShadow = '';
    });
  });
});