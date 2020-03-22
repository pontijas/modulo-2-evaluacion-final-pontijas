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

function setHtmlCode(serie) {
  // esta función va a recorrer los objetos contenidos dentro de array series
  let htmlCode = '';
  htmlCode += `<article class="js-add-fav css-card">`;
  htmlCode += `<h2>${serie.show.name}</h2>`;
  htmlCode += `<img src="${serie.show.image.medium}" alt="póster de la película">`;
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
  listenAddFavBtn();
};

searchBtn.addEventListener('click', getData);

// add to favorites

// listen to buttons in previously generated htmlCode

function listenAddFavBtn() {
  const addFavBtn = document.querySelectorAll('.js-add-fav ');
  console.log(addFavBtn, 'holii');
}
