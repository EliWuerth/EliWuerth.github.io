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