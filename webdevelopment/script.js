function incrementCount() {
    if (localStorage.getItem('visits')) {
        localStorage.setItem('visits', parseInt(localStorage.getItem('visits')) + 1);
    } else {
        localStorage.setItem('visits', 1);
    }
    document.getElementById('count').textContent = localStorage.getItem('visits');
}

// Update visitor count when the page loads
document.addEventListener('DOMContentLoaded', function () {
    incrementCount();
});

const toggle = document.getElementById('theme-toggle');
const body = document.body;

  // Initialize based on previous setting
if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
    toggle.checked = true;
}

toggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', body.classList.contains('dark-mode'));
});

// AOS.js setup (if library is included)
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("[data-aos]");
  const options = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate");
      }
    });
  }, options);

  elements.forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.read-more-toggle');
  toggles.forEach(toggle => {
    const label = document.querySelector(`label[for="${toggle.id}"]`);
    if (!label) return;
    // Initialize label text (in case page loads with checked)
    label.textContent = toggle.checked ? 'Read Less' : 'Read More';
    toggle.addEventListener('change', () => {
      label.textContent = toggle.checked ? 'Read Less' : 'Read More';
    });
  });
});

window.addEventListener('load', function () {
  // Merge + expand after rise/fall
  setTimeout(() => {
    document.querySelector('.column1').classList.add('merge');
    document.querySelector('.column2').classList.add('merge');
    document.querySelector('.column3').classList.add('merge');
    document.querySelector('.column4').classList.add('merge');
  }, 1200); // after initial rise/drop

  // Fade out preloader after full animation
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 800); // matches CSS transition
  }, 2500); // total animation duration
});

let cSlide = 0;
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');

function slideCarousel(direction) {
  const visibleCount = Math.floor(track.offsetWidth / 640); // assumes 640px item + margin
  const maxSlide = items.length - visibleCount;
  cSlide = Math.max(0, Math.min(cSlide + direction, maxSlide));
  track.style.transform = `translateX(-${cSlide * 640}px)`;
}

function goBack() {
  window.history.back();
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let thumbs = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < thumbs.length; i++) {
    thumbs[i].className = thumbs[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  thumbs[slideIndex - 1].className += " active";
  captionText.innerHTML = thumbs[slideIndex - 1].alt;
}