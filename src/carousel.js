function addDataToCarousel(carrousel, data) {
  data.map((cur, index) => {
    carrousel.insertAdjacentHTML(
      'beforeend',
      `<img class="img-${index} slider-img" src="${cur.image_url}" />`
    );
  });
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

export { addDataToCarousel, switchButtonsListeners };
