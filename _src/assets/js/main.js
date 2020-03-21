'use strict';

const serieInput = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-btn');
let series = [];

// get data

function getData(ev) {
  ev.preventDefault();
  fetch(` http://api.tvmaze.com/search/shows?q=${serieInput.value}`)
    .then(response => response.json())
    .then(dataSerie => {
      // guardamos los datos en un array
      series = dataSerie;
      console.log(series);
    });
}

// paint data

searchBtn.addEventListener('click', getData);
