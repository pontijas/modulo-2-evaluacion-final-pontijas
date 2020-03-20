'use strict';
const serieInput = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const serieInfo = document.querySelector('.js-ul');
let series = [];
let favSeries = [];

// single search
// function getData(ev) {
//   ev.preventDefault();
//   // console.log(serieInput.value);
//   fetch(`http://api.tvmaze.com/singlesearch/shows?q=${serieInput.value}`)
//     .then(response => response.json())
//     .then(dataSerie => {
//       serieInfo.innerHTML += `<li><h2>${dataSerie.name}</h2></li>`;
//       serieInfo.innerHTML += `<li><img src="${dataSerie.image.medium}" alt="póster de la serie"></li>`;
//       serieInfo.innerHTML += `<li><h3>${dataSerie.genres}</h3></li>`;
//       serieInfo.innerHTML += `<li><p>${dataSerie.summary}</p></li>`;
//     });
// }

function getData(ev) {
  ev.preventDefault();
  console.log(serieInput.value);
  fetch(`http://api.tvmaze.com/search/shows?q=${serieInput.value}`)
    .then(response => response.json())
    .then(dataSerie => {
      series = dataSerie;
      paintData();
    });
}

function paintData() {
  for (const serie of series) {
    let htmlCode = '';
    htmlCode += `<li class="css-li_serie"><h2>${serie.show.name}</h2>`;
    htmlCode += `<img src="${serie.show.image.medium}" alt="póster de la serie"`;
    htmlCode += `</li>`;
    serieInfo.innerHTML += htmlCode;
  }
}

btn.addEventListener('click', getData);
