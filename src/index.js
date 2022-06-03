import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-report-aio';

const DEBOUNCE_DELAY = 300;

const refs={
    inputField: document.querySelector("#search-box"),
    countryList: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info"),
}


refs.inputField.addEventListener("input", onImputChanche);
let search='';
function onImputChanche(){
search = String(refs.inputField.value);

fetch(`https://restcountries.com/v3.1/name/${search}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(countries =>{refs.countryList.innerHTML = makeMarkupList(countries),
  console.log(countries);})
  .catch(error => {
    Notify.failure(error, 'Oops, there is no country with that name');
  });
}

function makeMarkupList(data){
    return data.map(({name, flags})=>{return `<li><img src="${flags.png}" alt="flag" width=30px> ${name.official}</li>`;}).join('');};

// function addMarkupList(markup)
// refs.countryList.innerHTML(markup)

// function createGalleryMarkup(galleryItems) {
//     return galleryItems.map(({preview, original, description}) => {
//         return `<a class="gallery__item" href="${original}">
//   <img class="gallery__image" src="${preview}" alt="${description}" />
// </a>`;
// }).join('');
// };
// data=>data.map(country=>{console.log(country.name.common)})