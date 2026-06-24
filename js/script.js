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

// Sides toggle
const sidesToggle = document.querySelector('.sides-toggle');
const sidesBox = document.querySelector('.sides-box');
sidesToggle.addEventListener('click', () => {
  sidesBox.classList.toggle('open');
});

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top-btn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// // Reservation modal logic
// const modal = document.getElementById('reservationModal');
// const closeModalBtn = document.getElementById('closeModal');
// const closeSuccessBtn = document.getElementById('closeSuccess');
// const reservationForm = document.getElementById('reservationForm');
// const formSuccess = document.getElementById('formSuccess');

// // Open modal: attach to both Reserve buttons
// document.querySelectorAll('a[href="#"]').forEach(btn => {
//   btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     modal.classList.add('active');
//   });
// });

// // Close modal
// function closeReservationModal() {
//   modal.classList.remove('active');
//   // Optional: reset form and show form again, hide success
//   reservationForm.style.display = 'block';
//   formSuccess.style.display = 'none';
//   reservationForm.reset();
// }

// closeModalBtn.addEventListener('click', closeReservationModal);
// closeSuccessBtn.addEventListener('click', closeReservationModal);

// // Close when clicking outside the modal
// modal.addEventListener('click', (e) => {
//   if (e.target === modal) closeReservationModal();
// });


// // Using fetch to submit the form and show success without redirect
// reservationForm.addEventListener('submit', async function(e) {
//   e.preventDefault();
//   const formData = new FormData(reservationForm);
//   try {
//     const response = await fetch(reservationForm.action, {
//       method: 'POST',
//       body: formData,
//       headers: { 'Accept': 'application/json' },
//       redirect: 'follow'   // <-- add this
//     });
//     // FormSubmit returns a 200 HTML page on success, even after redirect
//     if (response.ok || response.redirected) {
//       reservationForm.style.display = 'none';
//       formSuccess.style.display = 'block';
//     } else {
//       alert('Something went wrong. Please try again or call us directly.');
//     }
//   } catch (error) {
//     alert('Network error. Please check your connection and try again.');
//   }
// });

/* ── Simple Preorder Modal JS ── */
const preorderModal = document.getElementById('preorderModal');
const preorderBtn = document.getElementById('preorderBtn');
const closePreorderModalBtn = document.getElementById('closePreorderModal');
const closePreorderSuccessBtn = document.getElementById('closePreorderSuccess');
const preorderForm = document.getElementById('preorderForm');
const preorderSuccess = document.getElementById('preorderSuccess');
const browseMenuLink = document.getElementById('browseMenuLink');

// Open modal
preorderBtn.addEventListener('click', (e) => {
  e.preventDefault();
  preorderModal.classList.add('active');
});

// Close modal helpers
function closePreorder() {
  preorderModal.classList.remove('active');
  preorderForm.style.display = 'block';
  preorderSuccess.style.display = 'none';
  preorderForm.reset();
}
closePreorderModalBtn.addEventListener('click', closePreorder);
closePreorderSuccessBtn.addEventListener('click', closePreorder);

preorderModal.addEventListener('click', (e) => {
  if (e.target === preorderModal) closePreorder();
});

// "Browse the menu" link: close modal, scroll to menu
browseMenuLink.addEventListener('click', (e) => {
  e.preventDefault();
  closePreorder(); // close modal
  document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
});

// Handle form submission (no page reload)
preorderForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(preorderForm);
  try {
    const response = await fetch(preorderForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
      redirect: 'follow'   
    });
    // FormSubmit returns a 200 HTML page on success, even after redirect
    if (response.ok || response.redirected) {
      preorderForm.style.display = 'none';
      formSuccess.style.display = 'block';
    } else {
      alert('Something went wrong. Please try again or call us directly.');
    }
  } catch (error) {
    alert('Network error. Please check your connection and try again.');
  }
});

// Feedback form (same fetch logic as preorder)
const feedbackForm = document.getElementById('feedbackForm');
const feedbackSuccess = document.getElementById('feedbackSuccess');

feedbackForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(feedbackForm);
  try {
    const response = await fetch(feedbackForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
      redirect: 'follow'   // <-- add this
    });
    // FormSubmit returns a 200 HTML page on success, even after redirect
    if (response.ok || response.redirected) {
      feedbackForm.style.display = 'none';
      formSuccess.style.display = 'block';
    } else {
      alert('Something went wrong. Please try again or call us directly.');
    }
  } catch (error) {
    alert('Network error. Please check your connection and try again.');
  }
});

/* ── Gallery Filtering ── */
// const filterBtns = document.querySelectorAll('.filter-btn');
// const mosaicItems = document.querySelectorAll('.mosaic-item');

// filterBtns.forEach(btn => {
//   btn.addEventListener('click', () => {
//     filterBtns.forEach(b => b.classList.remove('active'));
//     btn.classList.add('active');
//     const filter = btn.getAttribute('data-filter');
//     mosaicItems.forEach(item => {
//       if (filter === 'all' || item.getAttribute('data-category') === filter) {
//         item.classList.add('show');
//       } else {
//         item.classList.remove('show');
//       }
//     });
//   });
// });

// Trigger 'all' on load
document.querySelector('.filter-btn.active').click();


/* ── Lightbox for Images ── */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
let imageArray = [];

// Only attach lightbox to non-video items
const imageItems = document.querySelectorAll('.mosaic-item:not(.video-item)');
imageItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.querySelector('h4')?.textContent || '';
    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    // Build array of currently visible images for navigation
    imageArray = Array.from(document.querySelectorAll('.mosaic-item.show:not(.video-item) img'));
    currentImageIndex = imageArray.indexOf(img);
  });
});

lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

function showImage(index) {
  if (imageArray.length === 0) return;
  currentImageIndex = (index + imageArray.length) % imageArray.length;
  const img = imageArray[currentImageIndex];
  lightboxImg.src = img.src;
  const parent = img.closest('.mosaic-item');
  const caption = parent.querySelector('h4')?.textContent || '';
  lightboxCaption.textContent = caption;
}

lightboxPrev.addEventListener('click', () => showImage(currentImageIndex - 1));
lightboxNext.addEventListener('click', () => showImage(currentImageIndex + 1));

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
  if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
  if (e.key === 'Escape') lightbox.classList.remove('active');
});

/* ── Video Modal ── */
const videoModal = document.getElementById('videoModal');
const videoIframe = document.getElementById('videoIframe');
const videoModalClose = document.getElementById('videoModalClose');
const videoItems = document.querySelectorAll('.video-item');

videoItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    const videoId = item.getAttribute('data-video-id');
    if (videoId) {
      videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      videoModal.classList.add('active');
    }
  });
});

videoModalClose.addEventListener('click', () => {
  videoModal.classList.remove('active');
  videoIframe.src = ''; // stop video
});

videoModal.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    videoModal.classList.remove('active');
    videoIframe.src = '';
  }
});

/* ── Event booking buttons (same as before) ── */
const eventBookBtns = document.querySelectorAll('.event-book-btn');
eventBookBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const reservationModal = document.getElementById('reservationModal');
    if (reservationModal) {
      reservationModal.classList.add('active');
    } else {
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
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
});