// =========================
// SMOOTH SCROLLING
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // =========================
  // HEADER SHADOW ON SCROLL
  // =========================
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.7)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
  
  // =========================
  // SIMPLE FADE-IN ANIMATION
  // =========================
  const faders = document.querySelectorAll(
    '.section, .menu-card, .gallery-grid img, .about-text, .feature'
  );
  
  const appearOptions = {
    threshold: 0.2
  };
  
  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
  
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  
  faders.forEach(fader => {
    fader.classList.add('hidden');
    appearOnScroll.observe(fader);
  });

// =========================
// GALLERY SLIDER
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".gallery-slide");
  const nextBtn = document.querySelector(".gallery-next");

  let current = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  // auto change every 5 seconds
  setInterval(nextSlide, 5000);

  // next button
  nextBtn.addEventListener("click", nextSlide);
});