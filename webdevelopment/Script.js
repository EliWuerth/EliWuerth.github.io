function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
}

// Get the current URL
const currentLocation = window.location.href;

// Get all links in the navbar
const navLinks = document.querySelectorAll('nav ul li a');

// Loop through the links and set the active class
navLinks.forEach(link => {
    if (link.href === currentLocation) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

window.onload = function() {
    loadNavbar();
    loadFooter();

}


