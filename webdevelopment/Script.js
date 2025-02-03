function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? String(hours).padStart(2, '0') : '12'; // The hour '0' should be '12'
    const timeString = `${hours}:${minutes} ${ampm}`;

    document.getElementById('clock').textContent = timeString;
}
// Function to toggle dropdown menu on mobile
function toggleDropdown() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}

window.onload = function() {
    loadNavbar();
    setInterval(updateClock, 1000);
    updateClock(); 
}
    // Get all navigation links
const navLinks = document.querySelectorAll('.nav-link');

// Add click event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove 'active' class from all links
        navLinks.forEach(nav => nav.classList.remove('active'));
        
        // Add 'active' class to the clicked link
        this.classList.add('active');
    });
});