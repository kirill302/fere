//scrolling

window.addEventListener('scroll', () => {
   let scrolling = window.pageYOffset;

   //header
   const header = document.querySelector('.header__inner');
   if (scrolling > 150) {
      header.classList.add('header-fixed');
   } else {
      header.classList.remove('header-fixed');
   }
});

function isMobile() {
   if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      return true
   } else {
      return false;
   }
}

//burger
function burger(obj) {

   const body = document.body;
   const burger = document.querySelector(obj.burger);
   const burgerContent = document.querySelector(obj.burgerContent);
   const burgerClose = document.querySelector(obj.burgerClose);

   burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      burgerContent.classList.toggle('bg-active');
      body.classList.toggle('_look');
   });
   burgerClose.addEventListener('click', (e) => {
      console.log(burgerClose.classList);
      burger.classList.remove('active');
      burgerContent.classList.remove('bg-active');
      body.classList.remove('_look');
   })
}

const bur = burger({
   burger: '.header__burger',
   burgerClose: '.header-nav__close',
   burgerContent: '.header-nav'
});


// header nav
const headerNavItems = Array.from(document.querySelectorAll('.header-nav__item'));
const navHeaderItemsArr = headerNavItems.filter(item => isChildClass(item, 'header-nav__arrow'));

const footerNavItems = Array.from(document.querySelectorAll('.footer-nav__item'));

const navArr = navHeaderItemsArr.concat(footerNavItems);

let size = window.innerWidth;

if (size <= 768 || isMobile()) {
   navArr.forEach(item => {
      item.addEventListener('click', () => {
         item.classList.toggle('_hover');
      });
   });
}

// footer nav

// map
// функция проверяет, есть ли у patent дочерний элэмент с классом childrenClass;
function isChildClass(parent, childrenClass) {
   const parentChild = parent.children;

   if (parentChild.length > 0) {
      for (let i = 0; i < parentChild.length; i++) {
         if (parentChild[i].classList.contains(childrenClass)) {
            return true;
         }
      }
      return false;
   }
}

const mapSectors = Array.from(document.querySelectorAll('.map-svg__item'));
console.log(mapSectors);

const mapSectorsInits = mapSectors.filter(item => isChildClass(item, 'map-svg__icon'));

mapSectorsInits.forEach(item => {
   const icon = item.querySelector('.map-svg__icon');
   const mapWrapper = document.querySelector('.map__container');

   const id = item.getAttribute('href')
   const modal = document.querySelector(`[data-id="${id}"]`);

   let bool = false;

   document.addEventListener('click', (e) => {
      if (e.target == mapWrapper) {
         if (modal.classList.contains('_visible')) {
            modal.classList.remove('_visible')
         }
      }
   })

   if (modal) {
      icon.addEventListener('click', (e) => {
         const x = e.layerX / 2;
         const y = e.layerY + 40;
         modal.style.left = `${x}px`;
         modal.style.top = `${y}px`;
         modal.classList.toggle('_visible');
      });
   }
});

// swiper sliders

// intro slider 

function Slider(obj) {
   const slider = document.querySelector(obj.slider);
   const track = document.querySelector(obj.track);
   const next = document.querySelector(obj.next);
   const prev = document.querySelector(obj.prev);
   const slides = document.querySelectorAll(obj.slides);
   const scrollSlider = slides[0].offsetWidth;

   let pos = 0;

   next.addEventListener('click', sliderNext);
   prev.addEventListener('click', sliderPrev)

   chekBtns();

   function sliderNext() {
      console.log('next');
      pos -= scrollSlider;

      track.style.transform = `translateX(${pos}px)`;
      chekBtns();
   };

   function sliderPrev() {
      console.log('prev');

      pos += scrollSlider;

      track.style.transform = `translateX(${pos}px)`;
      chekBtns();
   };

   function chekBtns() {
      if (pos == 0) {
         prev.disabled = true;
      } else {
         prev.disabled = false;
      }

      if (-pos >= (slides.length - 1) * scrollSlider) {
         next.disabled = true;
      } else {
         next.disabled = false;
      };
   };

   /*
      let x1 = null;
      let y1 = null;
   
      slider.addEventListener('touchstart', (event) => {
         const tuch = event.touches[0];
         x1 = tuch.clientX;
         y1 = tuch.clientY;
      });

      slider.addEventListener('touchmove', (event) => {
         if (!x1 || !y1) {
            return false;
         }

         let x2 = event.touches[0].clientX;
         let y2 = event.touches[0].clientY;

         let xDiff = x2 - x1;
         let yDiff = y2 - y1;

         if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0 && !sliderPrev.disabled) {
               console.log(!sliderPrev.disabled);
               sliderPrev();
            } else if (xDiff < 0 && !sliderNext.disabled) {
               console.log(!sliderNext.disabled);
               sliderNext();
            } 
         }
         x1 = null;
         y1 = null;

         // console.log(-pos / slideWidth) 
      }); 
   */
};

const introSlider = new Slider({
   slider: '.intro-slider',
   track: '.intro-list',
   next: '.intro-slider-btn._next',
   prev: '.intro-slider-btn._prev',
   slides: '.intro-list__item',
});

function offset(el) {
   const rect = el.getBoundingClientRect()
   const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

   return {
      top: rect.top + scrollTop,
      left: rect.left + scrollTop
   }
}

function scrollAnimation(parent, func, functionRepeat = false) {
   let scrolling = window.pageYOffset;

   const pos = parent.getBoundingClientRect();
   const elementHeigth = pos.height;
   const elementOffset = offset(parent).top;

   window.addEventListener('scroll', (e) => {
      let scrolling = window.pageYOffset;

      const pos = parent.getBoundingClientRect();
      const elementHeigth = pos.height;
      const elementOffset = offset(parent).top;

      if (elementOffset / 2 <= scrolling && !functionRepeat) {
         func()
      } else if (elementOffset / 2 <= scrolling) {
         func();
      }

   });
}

const info = document.querySelector('.info');
scrollAnimation(info, () => {
   info.classList.add('_anim')
}, false);

const map = document.querySelector('.map');
scrollAnimation(map, () => {
   map.classList.add('_anim')
}, false);



const partners_slider = new Swiper('.partners__inner', {
   wrapperClass: 'partners-container',
   slideClass: 'partners-slide',

   slidesPerView: 7,
   slidesPerGroup: 1,
   spaceBetween: 10,
   initialSlide: 3,

   freeMode: true,
   watchOverFlow: true,

   navigation: {
      nextEl: '.partners-button-next',
      prevEl: '.partners-button-prev',
   },
   breakpoints: {
      320: {
         slidesPerView: 2,
      },
      480: {
         slidesPerView: 3,
      },
      640: {
         slidesPerView: 4,
      }
   },
   pagination: {
      el: '.patrners-pagination',
      type: 'bullets',
      bulletActiveClass: '_active',
      bulletClass: 'patrners-pagination__item',
   },
});

const map_slider = new Swiper('.map__container', {
   wrapperClass: 'map__modals',
   slideClass: 'map-modal',

   slidesPerView: 1,
   slidesPerGroup: 1,
   spaceBetween: 10,

   freeMode: true,
   watchOverFlow: true,

});

const about_slider = new Swiper('.about-slider', {
   wrapperClass: 'about-slider__wrapper',
   slideClass: 'about-slider__slide',

   slidesPerView: 1,
   slidesPerGroup: 1,

   watchOverFlow: true,

   navigation: {
      nextEl: '.about-slider-next',
      prevEl: '.about-slider-prev',
   },
}) 

function animateNumbers(elements, time) {
   if (elements.length > 0) {
      const elementsArr = Array.from(elements);

      elementsArr.forEach(element => {
         const max = parseInt(element.textContent);
         const delay = time / max;

         element.textContent = '';

         let i = 0

         setInterval(function () {
            if (i < max) {
               i++;
               element.textContent = `${i}`;
            }
         }, delay);
      })
   }
}


// const placeList = document.querySelector('.place__list');
// const placeNums = document.querySelectorAll('.place__num');

// scrollAnimation(placeList, () => {
//    animateNumbers(placeNums, 500)
// }, false)