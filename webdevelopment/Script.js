function loadNavbar() {
    fetch('/webdevelopment/pageElements/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
}

function loadHeader() {
    fetch('/webdevelopment/pageElements/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
}

function loadFooter() {
    fetch('/webdevelopment/pageElements/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Get the current URL path
const currentPath = window.location.pathname;

// Get all links in the navbar
const links = document.querySelectorAll('#navbar a');

// Loop through the links and set the active class
links.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

window.onload = function() {
    loadHeader();
    loadNavbar();
    loadFooter();

    window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
} 

}
