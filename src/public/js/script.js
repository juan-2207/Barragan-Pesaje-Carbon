// Carousel
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselDots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;

function showSlide(index) {
  carouselSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  carouselDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

carouselDots.forEach(dot => {
  dot.addEventListener('click', () => {
    showSlide(parseInt(dot.dataset.slide));
  });
});

setInterval(() => {
  const nextSlide = (currentSlide + 1) % carouselSlides.length;
  showSlide(nextSlide);
}, 4000);

// View Jobs button - redirect to empleos.html
const viewJobsBtn = document.getElementById('view-jobs-btn');
if (viewJobsBtn) {
  viewJobsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'empleos.html';
  });
}