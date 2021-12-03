const axios = require('axios').default;
import { outsideClick, closeModal } from './modal.js';
import {
  switchButtonsListeners,
  addDataToCarousel,
  addImageToCarousel
} from './carousel.js';

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

// Add movies to carousel boxes
for (let i = 0; i < 4; i++) {
  const movies = [[], [], [], []];

  getMoviesList(urls[i]).then((data) => {
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
    addImageToCarousel(categories[i], movies[i]);
  });
}

// Get movies from url
async function getMoviesList(baseUrl) {
  let total = [];
  let res = null;
  do {
    res = await axios.get(baseUrl);
    total.push(...res.data.results);
    baseUrl = res.data.next;
  } while (baseUrl != null);
  return total;
}

/* Event listeners */
const closeBtn = document.querySelector('.closeBtn');
const sliders = document.querySelectorAll('.carousel-box');

// Carousel sliders buttons
for (let el of sliders) {
  switchButtonsListeners(el);
}

// Close modal
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
