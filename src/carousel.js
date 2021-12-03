import { openModal } from './modal';

function addImageToCarousel(carousel, data) {
  data.map((cur) => {
    carousel.insertAdjacentHTML(
      'beforeend',
      `<img id="${cur.id}" class="slider-img" src="${cur.image_url}" />`
    );
  });

  for (let img of carousel.children) {
    img.addEventListener('click', openModal);
  }
}

function switchButtonsListeners(sliders) {
  let scrollAmount = 0;
  let scrollPerClick = 250;
  const switchLeft = sliders.nextElementSibling;
  switchLeft.addEventListener('click', () => {
    sliders.scrollTo({
      top: 0,
      left: (scrollAmount -= scrollPerClick),
      behavior: 'smooth'
    });
    if (scrollAmount < 0) {
      scrollAmount = 0;
    }
  });
  const switchRight = sliders.nextElementSibling.nextElementSibling;
  switchRight.addEventListener('click', () => {
    if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
      sliders.scrollTo({
        top: 0,
        left: (scrollAmount += scrollPerClick),
        behavior: 'smooth'
      });
    }
  });
}

export { addImageToCarousel, switchButtonsListeners };
