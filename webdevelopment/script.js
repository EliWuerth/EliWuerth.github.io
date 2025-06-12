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
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
  preloader.style.opacity = '0';
  setTimeout(() => preloader.style.display = 'none', 500);
  }, 1500); // 1500 ms = 1.5 seconds delay
});
