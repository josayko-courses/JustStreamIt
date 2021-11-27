const axios = require('axios').default;
import { openModal, outsideClick, closeModal } from './modal.js';

const baseUrl = 'http://localhost:8000/api/v1/titles?page=1&year=2004';
const baseUrl2 = 'http://localhost:8000/api/v1/titles?page=2&year=2004';

const sliders = document.querySelector('.carousel-box');
const switchLeft = document.querySelector('.switchLeft');
const switchRight = document.querySelector('.switchRight');

showMovieData();
switchButtonsListeners();

function switchButtonsListeners() {
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

async function showMovieData() {
  let total = [];
  let result = await axios.get(baseUrl);
  let result2 = await axios.get(baseUrl2);
  result = result.data.results;
  result2 = result2.data.results;
  total.push(...result);
  total.push(...result2);
  console.log(total);

  total.map((cur, index) => {
    sliders.insertAdjacentHTML(
      'beforeend',
      `<img class="img-${index} slider-img" src="${cur.image_url}" />`
    );
  });
}

// Get modal element

const carouselBox = document.querySelector('.carousel-box');
const closeBtn = document.querySelector('.closeBtn');

carouselBox.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
