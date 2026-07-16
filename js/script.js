// =========================
// SMOOTH SCROLLING
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return; // ignore empty or '#' only
    e.preventDefault();

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =========================
// HEADER SHADOW ON SCROLL
// =========================
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (!header) return;
  header.style.boxShadow = window.scrollY > 50 ? '0 2px 15px rgba(0,0,0,0.7)' : 'none';
});

// =========================
// SIMPLE FADE-IN ANIMATION
// =========================
const faders = document.querySelectorAll('.section, .menu-card, .gallery-grid img, .about-text, .feature');
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  fader.classList.add('hidden');
  appearOnScroll.observe(fader);
});

// =========================
// SIDES TOGGLE
// =========================
const sidesToggle = document.querySelector('.sides-toggle');
const sidesBox = document.querySelector('.sides-box');
if (sidesToggle && sidesBox) {
  sidesToggle.addEventListener('click', () => sidesBox.classList.toggle('open'));
}

// =========================
// SCROLL TO TOP BUTTON
// =========================
const scrollTopBtn = document.querySelector('.scroll-top-btn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =========================
// GALLERY LIGHTBOX (images)
// =========================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentImageIndex = 0;
let imageArray = [];

function attachLightbox() {
  const imageItems = document.querySelectorAll('.mosaic-item:not(.video-item)');
  imageItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      const caption = item.querySelector('h4')?.textContent || '';
      lightboxImg.src = img.src;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('active');
      imageArray = Array.from(document.querySelectorAll('.mosaic-item.show:not(.video-item) img'));
      currentImageIndex = imageArray.indexOf(img);
    });
  });
}

if (lightboxClose) lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
}

function showImage(index) {
  if (imageArray.length === 0) return;
  currentImageIndex = (index + imageArray.length) % imageArray.length;
  const img = imageArray[currentImageIndex];
  lightboxImg.src = img.src;
  const parent = img.closest('.mosaic-item');
  lightboxCaption.textContent = parent?.querySelector('h4')?.textContent || '';
}

if (lightboxPrev) lightboxPrev.addEventListener('click', () => showImage(currentImageIndex - 1));
if (lightboxNext) lightboxNext.addEventListener('click', () => showImage(currentImageIndex + 1));

document.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
  if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
  if (e.key === 'Escape') lightbox.classList.remove('active');
});

// =========================
// VIDEO MODAL
// =========================
const videoModal = document.getElementById('videoModal');
const videoIframe = document.getElementById('videoIframe');
const videoModalClose = document.getElementById('videoModalClose');

function attachVideoModal() {
  const videoItems = document.querySelectorAll('.video-item');
  videoItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const videoId = item.getAttribute('data-video-id');
      if (videoId && videoIframe) {
        videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        videoModal?.classList.add('active');
      }
    });
  });
}

if (videoModalClose) {
  videoModalClose.addEventListener('click', () => {
    videoModal?.classList.remove('active');
    if (videoIframe) videoIframe.src = '';
  });
}
if (videoModal) {
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove('active');
      if (videoIframe) videoIframe.src = '';
    }
  });
}

// =========================
// HAMBURGER MENU TOGGLE
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const navbar = document.getElementById('navbar');
  if (burger && navbar) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      navbar.classList.toggle('active');
    });
    // Close menu when a nav link is clicked
    const navLinks = document.querySelectorAll('#navbar a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        navbar.classList.remove('active');
      });
    });
  }

  // Attach lightbox & video events after dynamic gallery renders
  attachLightbox();
  attachVideoModal();
});

// =========================
// RE‑ATTACH AFTER GALLERY UPDATES
// (called from inline script after render)
// =========================
window.attachGalleryInteractions = function() {
  attachLightbox();
  attachVideoModal();
};