'use strict';
const serieInput = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const serieInfo = document.querySelector('.js-ul');

function getSerieName(ev) {
  ev.preventDefault();
  // console.log(serieInput.value);
  fetch(`http://api.tvmaze.com/singlesearch/shows?q=${serieInput.value}`)
    .then(response => response.json())
    .then(dataSerie => {
      serieInfo.innerHTML += `<li><h2>${dataSerie.name}</h2></li>`;
      serieInfo.innerHTML += `<li><img src="${dataSerie.image.medium}" alt="póster de la serie"></li>`;
      console.log('holiii');
      serieInfo.innerHTML += `<li><h3>${dataSerie.genres}</h3></li>`;
      serieInfo.innerHTML += `<li><p>${dataSerie.summary}</p></li>`;
    });
}

btn.addEventListener('click', getSerieName);
