const sliders = document.querySelector('.carousel-box');
const switchLeft = document.querySelector('.switchLeft');
const switchRight = document.querySelector('.switchRight');

export default function switchButtonsListeners() {
  let scrollAmount = 0;
  let scrollPerClick = 250;
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
