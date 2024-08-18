
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky Header on Scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('sticked');
        if (nextElement) nextElement.classList.add('sticked-header-offset');
      } else {
        selectHeader.classList.remove('sticked');
        if (nextElement) nextElement.classList.remove('sticked-header-offset');
      }
    }
    window.addEventListener('load', headerFixed);
    document.addEventListener('scroll', headerFixed);
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar a');
  function setActiveLink() {
    let currentPage = window.location.pathname.split("/").pop();
    let navbarlinks = document.querySelectorAll('#navbar a');
  
    navbarlinks.forEach(navbarlink => {
      navbarlink.classList.remove('active', 'active-parent');
      if (navbarlink.getAttribute('href') === currentPage) {
        if (currentPage === "" || currentPage === "index.html") {
          document.querySelector('#navbar a[href="index.html"]').classList.add('active');
        } else if (navbarlink.closest('.dropdown')) {
          navbarlink.classList.add('active');
          navbarlink.closest('.dropdown').querySelector(':scope > a').classList.add('active-parent');
        } else {
          navbarlink.classList.add('active');
        }
      }
    });
  }
  
  window.addEventListener('load', setActiveLink);
  
  document.querySelectorAll('#navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash && document.querySelector(this.hash)) {
        e.preventDefault();
        let section = document.querySelector(this.hash);
        section.scrollIntoView({ behavior: 'smooth' });
      }
      if (!this.parentElement.classList.contains('dropdown')) {
        document.querySelectorAll('#navbar a').forEach(l => l.classList.remove('active', 'active-parent'));
        this.classList.add('active');
      } else if (this.closest('ul').previousElementSibling) {
        
        document.querySelectorAll('#navbar a').forEach(l => l.classList.remove('active', 'active-parent'));
        this.classList.add('active');
        this.closest('.dropdown').querySelector(':scope > a').classList.add('active-parent');
      }
    
    });
  });
 
  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

/* modals */

const modalBtns = document.querySelectorAll(".modal-open");

modalBtns.forEach(function(btn) {
  btn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior
    const modal = btn.getAttribute("data-modal");
    document.getElementById(modal).style.display = "block";
  });
});

const closeBtns = document.querySelectorAll(".close")

closeBtns.forEach(function(btn){
  btn.addEventListener("click", function(event){
    event.preventDefault();
    const modal = btn.closest(".modal").style.display ="none"
  })
})


window.onclick = function(e){
  if(e.target.className == "modal"){
    e.target.style.display = "none"
  }
}

/*--------------------------------------------------------------
# projects Section
--------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.project-detail');
  const cards = Array.from(container.querySelectorAll('.project-card'));

  function positionCards() {
      const columnOrder = [2, 3, 1, 4];
      cards.forEach((card, index) => {
          const column = columnOrder[index % 4]; 
          const row = Math.floor(index / 4) + 1;
          card.style.gridColumn = column;  
          card.style.gridRow = row;        
      });

      if (cards.length === 1) {
          cards[0].style.gridColumn = '2 / span 1'; 
      } else if (cards.length === 2) {
          cards[0].style.gridColumn = '2 / span 1'; 
          cards[1].style.gridColumn = '3 / span 1'; 
      }
  }

  positionCards();
  window.addEventListener('resize', positionCards);
});
