const axios = require('axios').default;
import { openModal, outsideClick, closeModal } from './modal.js';
import { switchButtonsListeners, addDataToCarousel } from './carousel.js';

const urls = [
  'http://localhost:8000/api/v1/titles?imdb_score_min=9',
  'http://localhost:8000/api/v1/titles?imdb_score_min=8.8&genre=adventure',
  'http://localhost:8000/api/v1/titles?imdb_score_min=8.5&genre=sci-fi',
  'http://localhost:8000/api/v1/titles?imdb_score_min=8.5&genre=crime'
];

const categories = [
  document.querySelector('#category-0'),
  document.querySelector('#category-1'),
  document.querySelector('#category-2'),
  document.querySelector('#category-3')
];

const movies = [[], [], [], []];

for (let i = 0; i < 4; i++) {
  getMoviesData(urls[i]).then((data) => {
    data = data
      .sort((a, b) => {
        return a.imdb_score - b.imdb_score;
      })
      .reverse();

    for (let movie of data) {
      if (movies[i].length < 7) {
        movies[i].push(movie);
      } else break;
    }
    console.log(movies[i]);
    addDataToCarousel(categories[i], movies[i]);
  });
}

async function getMoviesData(baseUrl) {
  let total = [];
  let res = null;
  do {
    res = await axios.get(baseUrl);
    total.push(...res.data.results);
    baseUrl = res.data.next;
  } while (baseUrl != null);
  return total;
}

// Event listeners
const carouselBox = document.querySelectorAll('.carousel-box');
const closeBtn = document.querySelector('.closeBtn');
const sliders = document.querySelectorAll('.carousel-box');

sliders.forEach((el) => {
  switchButtonsListeners(el);
});

carouselBox.forEach((el) => {
  el.addEventListener('click', openModal);
});

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
