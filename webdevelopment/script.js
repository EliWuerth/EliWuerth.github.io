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