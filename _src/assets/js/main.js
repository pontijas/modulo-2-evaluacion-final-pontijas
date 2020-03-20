'use strict';
const serieInput = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const serieTitle = document.querySelector('.js-li_title');
const serieImg = document.querySelector('.js-li_img');

function getSerieName(ev) {
  ev.preventDefault();
  console.log(serieInput.value);
  fetch(`http://api.tvmaze.com/singlesearch/shows?q=${serieInput.value}`)
    .then(response => response.json())
    .then(dataSerie => {
      serieTitle.innerHTML = dataSerie.name;
      serieImg.innerHTML = dataSerie.language;
      console.log('holiii');

      // estructura para recorrer array en el caso de que la petición a la APOi estuviera estructurada con un array
      // for (let i = 0; i < dataArr.length; i++) {
      //   serieTitle.innerHTML = dataSerie.dataArr[i].name;
      // }
    });
}

btn.addEventListener('click', getSerieName);
