'use strict';

const serieInput = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-btn');
const seriesDisplay = document.querySelector('.js-search-display');
let series = [];

// get data

function getData(ev) {
  ev.preventDefault();
  fetch(` http://api.tvmaze.com/search/shows?q=${serieInput.value}`)
    .then(response => response.json())
    .then(dataSerie => {
      // guardamos los datos en un array
      series = dataSerie;
      paintCards();
    });
}

// paint data

function setHtmlCode() {
  // esta función va a recorrer los objetos contenidos dentro de array series
  let htmlCode = '';
  htmlCode += `<article class="css-card">`;
  htmlCode += `<h2>hola mundo</h2>`;
  htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="póster de la película">`;
  htmlCode += `</article>`;
  // console.log(series);
  return htmlCode;
}

const paintCards = () => {
  // esta función va a recorrer los objetos dentro del array series en el cual hay un objeto-serie- en cada posición-index-
  let seriesCode = '';
  for (const serie of series) {
    seriesCode += setHtmlCode(serie);
  }
  seriesDisplay.innerHTML = seriesCode;
  console.log(series);
};

searchBtn.addEventListener('click', getData);
