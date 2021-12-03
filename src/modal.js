import axios from 'axios';

const modal = document.querySelector('#simpleModal');
const header = document.querySelector('.modal-header');
const body = document.querySelector('.modal-body');
const footer = document.querySelector('.modal-footer');

async function getMovieData(id) {
  const res = await axios.get('http://localhost:8000/api/v1/titles/' + id);
  return res.data;
}

function parseGenres(genres) {
  let str = '';
  genres.forEach((g, i) => {
    str += g;
    if (i != genres.length - 1) {
      str += ', ';
    }
  });
  return str;
}

function fillMovieBody(data) {
  // Image
  let div = document.createElement('div');
  let el = document.createElement('img');

  div.setAttribute('class', 'movie-image');
  el.setAttribute('src', data.image_url);
  div.appendChild(el);
  body.appendChild(div);

  // Infos
  const contents = {
    Genre: parseGenres(data.genres),
    Year: data.year,
    Description: data.description
  };

  div = document.createElement('div');
  div.setAttribute('class', 'movie-info');

  for (const key in contents) {
    let el = document.createElement('h3');
    el.innerHTML = key;
    div.appendChild(el);
    el = document.createElement('p');
    el.innerHTML = contents[key];
    div.appendChild(el);
  }
  body.appendChild(div);
}

function fillMovieFooter(data) {}

function openModal(e) {
  modal.style.display = 'block';
  // rated
  // imdb score
  // directors
  // actors
  // from imdb_url: duration
  // from imdb_url: origin country
  // from imdb_url: box office results
  getMovieData(e.target.id).then((data) => {
    let el = document.createElement('h2');

    // Title
    el.innerHTML = data.original_title;
    header.appendChild(el);

    fillMovieBody(data);
    fillMovieFooter(data);
  });
}

function closeModal(e) {
  modal.style.display = 'none';
  header.lastChild.innerHTML = '';
  body.innerHTML = '';
  footer.innerHTML = '';
}

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
    header.lastChild.innerHTML = '';
    body.innerHTML = '';
    footer.innerHTML = '';
  }
}

export { openModal, outsideClick, closeModal };
