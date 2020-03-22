'use strict';

// global variables

const serieInput = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-btn');
const seriesDisplay = document.querySelector('.js-search-display');

// arrays

let series = [];
let favSeries = [];

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

  if (serie.show.image === null) {
    htmlCode += `<article class="js-add-fav css-card" data-id="${serie.show.id}">`;
    htmlCode += `<h2>${serie.show.name}</h2>`;
    htmlCode += `<img src=https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="póster de la película">`;
    htmlCode += `</article>`;
  } else {
    htmlCode += `<article class="js-add-fav css-card" data-id="${serie.show.id}">`;
    htmlCode += `<h2>${serie.show.name}</h2>`;
    htmlCode += `<img src="${serie.show.image.medium}" alt="póster de la película">`;
    htmlCode += `</article>`;
  }
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
  const addFavBtns = document.querySelectorAll('.js-add-fav');
  // recorremos el array donde está la información del código generado, para poder trabajar con cada objeto individualmente
  for (const favBtn of addFavBtns) {
    // le añadimos un add event listener a los botones creados
    favBtn.addEventListener('click', addFavSerie);
  }
}

function addFavSerie(event) {
  // console.log('evento', event.currentTarget, event.currentTarget.dataset);
  // hemos identificado el objeto clickado y nos quedamos con esa info
  // console.log(event.currentTarget.dataset.id);
  // guardamos la información del elemento clickado en una constante
  const clickedId = parseInt(event.currentTarget.dataset.id);
  console.log('el id clickado es', clickedId);
  // vamos a recorrer el array para quedarnos con los id que coincidan
  // declaramos fav serie fuera del for porque lo queremos reutilizar después
  let favSerie;
  for (const serie of series) {
    console.log('holiii', serie.show);
    // serie.show me escribe todas las series guardadas en el arrays series, ahora necesito que se quede con la que tiene el id igual
    if (serie.show.id === clickedId) {
      // si el id del serie.show coincide con clickedId entonces favSerie tiene el valor de serie.show
      favSerie = serie.show;
      console.log('bingo', favSerie);
    }
  }
  // ahora me interesa que los objetos favSerie los vaya metiendo en el array favSeries que declaré al principio
  console.log('rebingo', favSerie);
  // añadimos la serie seleccionada como favorita al array de favSeries
  favSeries.push(favSerie);
  console.log('esto es favSerie', favSerie);

  console.log('wee', favSeries);
  getFavListCode();
}

// paint favorite series list

const favList = document.querySelector('.js-fav-list');

function getFavListCode() {
  for (const favSerie of favSeries) {
    let favListCode = '';
    favListCode += `<li class="css-fav-li">`;
    favListCode += `<h3>${favSerie.name}</h3>`;
    favListCode += `<img src="${favSerie.image.medium}" alt="póster de la serie">`;
    favListCode += `<button class="css-clear-btn">Quitar</button>`;
    favListCode += `</li>`;
    return (favList.innerHTML = favListCode);
  }
}
