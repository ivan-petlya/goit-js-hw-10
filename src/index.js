import './css/styles.css';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');

inputCountry.addEventListener(
  'input',
  debounce(event => {
    event.preventDefault();
    const inputValue = event.target.value.trim();
    if (!inputValue) {
      return clearInputField();
    }
    fetchCountries(inputValue).then(countryMarkup).catch(error);
  }, DEBOUNCE_DELAY)
);

function countryMarkup(data) {
  if (data.length > 10) {
    clearInputField();
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (data.length >= 2 && data.length < 10) {
    multipleMarkup(data);
  } else {
    unitMarkup(data);
  }
}

function error(e) {
  clearInputField();
  Notify.failure('Oops, there is no country with that name');
}

function clearInputField() {
  countryInfo.innerHTML = '';
}

function multipleMarkup(data) {
  const countriesMarkup = data
    .map(value => {
      return `<p style="font-size: 20px"><img src="${value.flags.svg}" alt='flag' width = '40' heigth = '40'/>${value.name.official}</p>`;
    })
    .join('');
  countryInfo.innerHTML = countriesMarkup;
}

function unitMarkup(data) {
  countryInfo.innerHTML = `<article>
      <h1 style="font-size: 30px">
        <img
          src="${data[0].flags.svg}"
          alt="flag"
          width="30"
          heigth="30"
        />
        ${data[0].name.official}
      </h1>
      <p>
        <b>Capital:</b> <i>${data[0].capital}</i>
      </p>
      <p>
        <b>Population:</b> <i>${data[0].population}</i>
      </p>
      <p>
        <b>Languages:</b> <i>${Object.values(data[0].languages).join(', ')}</i>
      </p>
      
    </article>`;
}
