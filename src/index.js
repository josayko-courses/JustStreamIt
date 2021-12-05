const axios = require('axios').default;
import { outsideClick, openModal, closeModal } from './modal.js';
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

    // Add data to header
    if (i == 0) {
      getHeaderMovie(movies[0][3]);
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

function getHeaderMovie(movie) {
  axios.get('http://localhost:8000/api/v1/titles/' + movie.id).then((res) => {
    const btn = document.querySelector('.button-60');
    btn.setAttribute('id', movie.id);
    btn.addEventListener('click', openModal);

    const info = document.querySelector('.header-info');
    let title = document.createElement('h1');
    title.innerHTML = res.data.original_title;

    info.insertAdjacentElement('afterbegin', title);

    let description = document.createElement('p');
    description.innerHTML = res.data.description;
    info.insertAdjacentElement('beforeend', description);

    const image = document.querySelector('.header-image');
    let img = document.createElement('img');
    img.setAttribute('src', res.data.image_url);
    image.appendChild(img);
  });
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
