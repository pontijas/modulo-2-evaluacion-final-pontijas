'use strict';
const serieInput = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const serieInfo = document.querySelector('.js-ul');

function getSerieName(ev) {
  ev.preventDefault();
  console.log(serieInput.value);
  fetch(`http://api.tvmaze.com/singlesearch/shows?q=${serieInput.value}`)
    .then(response => response.json())
    .then(dataSerie => {
      serieInfo.innerHTML += `<li>${dataSerie.name}</li>`;
      serieInfo.innerHTML += `<li><img src="${dataSerie.image.medium}" alt="póster de la serie"></li>`;
      console.log('holiii');
    });
}

btn.addEventListener('click', getSerieName);
