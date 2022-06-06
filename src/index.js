import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 1000;

const refs={
    inputField: document.querySelector("#search-box"),
    countryList: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info"),
}


refs.inputField.addEventListener("input", debounce(onImputChanche, DEBOUNCE_DELAY));
let search='';
function onImputChanche(){
search = (String(refs.inputField.value)).trim();
if (search!==''){
fetchCountries(search).then(makeInterface)
  .catch(error => {
    Notify.failure(('Йой, здається такої країни немає...'), {position: 'center-top', timeout: 1000, fontSize: '20px', width: '380px',});
  });}
}

function makeInterface(array){
    refs.countryInfo.classList.add('is-hidden');
    clearMarkupList();
    clearCountry();
    if (array.length>10){  
        return Notify.info(('Щось забагато варіантів, давай конкретніше...'), {position: 'center-top', timeout: 1000, fontSize: '20px', width: '380px',});
   }
    else if(array.length===1){
        refs.countryInfo.innerHTML=makeMarkupCountry(array[0])}
    else if(array.length===0){clearMarkupList()}
    else {
        refs.countryList.innerHTML = makeMarkupList(array)}
}

function makeMarkupCountry({name, capital, population, flags, languages}){
    refs.countryInfo.classList.remove('is-hidden');
    return ` <h3 class="country"><img src="${flags.png}" alt="flag" width=30px> ${name.official}</h3>
    <p class="info">Capital: ${capital}</p>
    <p class="info">Population: ${population}</p>
    <p class="info">Languages: ${Object.values(languages)}</p>`
}

function makeMarkupList(data){
    // refs.countryInfo.classList.add('is-hidden');
    return data.map(({name, flags})=>{return `<li><img src="${flags.png}" alt="flag" width=30px> ${name.official}</li>`;}).join('');};

function clearMarkupList(){
    refs.countryList.innerHTML ='';
}

function clearCountry(){
    refs.countryInfo.innerHTML='';
}