'use strict';

// global variables

const serieInput = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-btn');
const seriesDisplay = document.querySelector('.js-search-display');
const favList = document.querySelector('.js-fav-list');

// arrays

let series = [];
let favSeries = [];

// get data

function getData(ev) {
  ev.preventDefault();
  fetch(` http://api.tvmaze.com/search/shows?q=${serieInput.value}`)
    .then(response => response.json())
    .then(dataSerie => {
      series = dataSerie;
      paintCards();
    });
}

// paint data

function setHtmlCode(serie) {
  let htmlCode = '';

  htmlCode += `<article class="js-add-fav css-card" data-id="${serie.show.id}">`;
  htmlCode += `<h3>${serie.show.name}</h3>`;

  if (serie.show.image === null) {
    htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="póster de la película">`;
  } else {
    htmlCode += `<img src="${serie.show.image.medium}" alt="póster de la película">`;
  }

  htmlCode += `</article>`;

  return htmlCode;
}

const paintCards = () => {
  let seriesCode = '';
  for (const serie of series) {
    seriesCode += setHtmlCode(serie);
  }
  seriesDisplay.innerHTML = seriesCode;
  listenAddFavBtn();
};

searchBtn.addEventListener('click', getData);

// add to favorites

function listenAddFavBtn() {
  const addFavBtns = document.querySelectorAll('.js-add-fav');

  for (const favBtn of addFavBtns) {
    favBtn.addEventListener('click', addFavSerie);
  }
}

// -------------------------------------------------------------------

// esta función añade el objeto 'serie' al array favSeries con el método push

function addFavSerie(event) {
  const clickedId = parseInt(event.currentTarget.dataset.id);

  // isInFav es false >> partimos de la base de que la serie no está añadida en favSeries
  let isInFav = false;
  // necesitamos encontrar el índice donde se encuentra la serie que queremos añadir a favSeries
  let favIndex;
  // le pedimos que lo busque en el array
  for (const serie of favSeries) {
    if (serie.id === clickedId) {
      isInFav = true;
      // favIndex = ¿?
    }
  }

  // console.log(favIndex);

  if (isInFav) {
    // si isInFav (isInFav es false>> si no está en el array)
    // splice
    // buscalo en mdn splice
    // necesitas el índice de la serie dentro favSeries
  } else {
    let favSerie;
    for (const serie of series) {
      if (serie.show.id === clickedId) {
        favSerie = serie.show;
      }
    }
    favSeries.push(favSerie);
  }

  paintCards();
  paintFavSeriesList();
  setInLocalStorage();
}

// function addFavSerie(event) {
//   const clickedId = parseInt(event.currentTarget.dataset.id);

//   let favSerie;
//   for (const serie of series) {
//     if (serie.show.id === clickedId) {
//       favSerie = serie.show;
//     }
//   }
//   favSeries.push(favSerie);
//   paintFavSeriesList();
//   setInLocalStorage();
// }

// -------------------------------------------------------------------

// paint favorite series list

function getFavListCode(favSerie) {
  let favListCode = '';

  if (favSerie.image === null) {
    favListCode += `<li class="css-fav-li">`;
    favListCode += `<h3>${favSerie.name}</h3>`;
    favListCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="póster de la serie" class="css-fav-img">`;
    favListCode += `<button class="css-clear-btn">Quitar</button>`;
    favListCode += `</li>`;
  } else {
    favListCode += `<li class="css-fav-li">`;
    favListCode += `<h3>${favSerie.name}</h3>`;
    favListCode += `<img src="${favSerie.image.medium}" alt="póster de la serie" class="css-fav-img">`;
    favListCode += `<button class="css-clear-btn">Quitar</button>`;
    favListCode += `</li>`;
  }
  return favListCode;
}

function paintFavSeriesList() {
  favList.innerHTML = '';
  for (const favSerie of favSeries) {
    favList.innerHTML += getFavListCode(favSerie);
  }
}

// local storage

function setInLocalStorage() {
  const stringifyFavSeries = JSON.stringify(favSeries);
  localStorage.setItem('favSeries', stringifyFavSeries);
}

function getFromLocalStorage() {
  const storedData = localStorage.getItem('favSeries');
  console.log('Esto es storedData', storedData);
  if (storedData !== null) {
    favSeries = JSON.parse(storedData);
    paintFavSeriesList();
  }
}

getFromLocalStorage();
