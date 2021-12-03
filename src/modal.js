import axios from 'axios';

const modal = document.querySelector('#simpleModal');
const header = document.querySelector('.modal-header');
const body = document.querySelector('.modal-body');
const footer = document.querySelector('.modal-footer');

async function getMovieData(id) {
  const res = await axios.get('http://localhost:8000/api/v1/titles/' + id);
  return res.data;
}

function openModal(e) {
  modal.style.display = 'block';
  // title
  // image
  // genres
  // year
  // rated
  // imdb score
  // directors
  // actors
  // from imdb_url: duration
  // from imdb_url: origin country
  // from imdb_url: box office results
  // from imdb_url: synopsis
  console.log(e.target);
  getMovieData(e.target.id).then((data) => {
    console.log(data);
    const title = document.createElement('h2');
    title.innerHTML = data.title;
    header.appendChild(title);
  });
}

function closeModal(e) {
  modal.style.display = 'none';
  header.lastChild.innerHTML = '';
}

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
    header.lastChild.innerHTML = '';
  }
}

export { openModal, outsideClick, closeModal };
