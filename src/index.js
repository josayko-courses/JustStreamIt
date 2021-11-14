const axios = require('axios');

const baseUrl = 'http://localhost:8000/api/v1/titles/';

const add_movie = (data) => {
  const newDiv = document.createElement('div');
  let el = document.createElement('h2');

  el.textContent = data[0].title;
  newDiv.appendChild(el);

  el = document.createElement('img');
  el.setAttribute('src', data[0].image_url);
  newDiv.appendChild(el);

  document.body.appendChild(newDiv);
};

axios
  .get(baseUrl)
  .then((res) => {
    console.log(res);
    add_movie(res.data.results);
  })
  .then((err) => {
    console.log(err);
  });
