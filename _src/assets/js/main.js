'use strict';
const serieInput = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');

function getSerieName(ev) {
  ev.preventDefault();
  console.log(serieInput.value);
  fetch(`http://api.tvmaze.com/search/shows?q=${serieInput.value}`)
    .then(response => response.json())
    .then(dataSerie => dataSerie);
  // devueve un array vacío
  console.log(dataSerie);
}

btn.addEventListener('click', getSerieName);
