const axios = require('axios').default;
import { openModal, outsideClick, closeModal } from './modal.js';
import switchButtonsListeners from './carousel.js';

const baseUrl = 'http://localhost:8000/api/v1/titles?page=1&year=2004';
const baseUrl2 = 'http://localhost:8000/api/v1/titles?page=2&year=2004';
const category0 = document.querySelector('#category-0');

switchButtonsListeners();
getMoviesData().then((data) => {
  addDataToCarousel(category0, data);
});

async function getMoviesData() {
  let total = [];
  let result = await axios.get(baseUrl);
  result = result.data.results;
  total.push(...result);
  console.log(result);
  return result;
}

function addDataToCarousel(carrousel, data) {
  data.map((cur, index) => {
    carrousel.insertAdjacentHTML(
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
