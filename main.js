function toggleNavbar() {
    var links = document.querySelectorAll('.navbar a');
    links.forEach(function(link) {
      link.style.display = link.style.display === 'block' ? 'none' : 'block';
    });
  }

  function closeNavbar() {
    if (window.innerWidth <= 600) {
      var links = document.querySelectorAll('.navbar a');
      links.forEach(function(link) {
        link.style.display = 'none';
      });
    }
  }

  window.addEventListener('resize', closeNavbar);

  window.addEventListener('scroll',function(){
    var navview = document.querySelector('.navbar');
    var navheight = navview.offsetHeight;

    if(window.scrollY > navheight){
                navview.classList.add('sticky');
   
    }
    else{
        navview.classList.remove('sticky');
    }

  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

