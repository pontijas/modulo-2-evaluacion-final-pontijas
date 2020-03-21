'use strict';

// http://api.tvmaze.com/search/shows?q=

// get data

const serieInput = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-btn');

function getData(ev) {
  ev.preventDefault();
  console.log('holiii');
  fetch(` http://api.tvmaze.com/search/shows?q=${serieInput.value}`)
    .then(response => response.json())
    .then(dataSerie => {
      console.log(dataSerie);
    });
}

searchBtn.addEventListener('click', getData);
