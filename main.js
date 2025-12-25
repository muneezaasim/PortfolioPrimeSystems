const navbar = document.querySelector('.navbar');
const navbarLinks = document.querySelector('.headerA');

function toggleNavbar() {
    navbarLinks.classList.toggle('active');
}

function closeNavbar() {
    if (window.innerWidth <= 991) {
        navbarLinks.classList.remove('active');
    }
}

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

const preloader = document.querySelector('#preloader');
if (preloader) {
    window.addEventListener('load', () => {
        preloader.remove();
    });
}

