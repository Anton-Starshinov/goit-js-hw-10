import debounce from 'lodash.debounce';
import './css/styles.css';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  const searchQuery = evt.target.value.trim();

  fetchCountries(searchQuery)
    .then(blockSelection)
    .catch(Notify.failure('Oops, there is no country with that name'));
}

function blockSelection(cuntry) {
  if (cuntry.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (cuntry.length > 1 && cuntry.length < 10) {
    markupCountyList(cuntry);
    countryInfoEl.innerHTML = '';
  }
  if (cuntry.length === 1) {
    countryListEl.innerHTML = '';
    markupCountyInfo(cuntry);
  }
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    return response.json();
  });
}

function markupCountyList(cuntry) {
  const markup = cuntry
    .map(({ flags, name }) => {
      return `
      <li><img src="${flags.svg}" alt="${name}" width="35" height="35" />"${name.official}"</li>`;
    })
    .join('');

  countryListEl.insertAdjacentHTML('beforeend', markup);
}

function markupCountyInfo(cuntry) {
  const markupInfo = cuntry
    .map(({ flags, name, capital, population, languages }) => {
      return `
          <h1><img src="${flags.svg}" alt="${name}" width="35" height="35" />"${name.official}"</h1>
          <ul class="country-list">
            <li><p>Capital: ${capital}</p></li>
            <li><p>Population: ${population}</p></li>
            <li><p>Languages: ${languages}</p></li>
          </ul>`;
    })
    .join('');

  countryInfoEl.insertAdjacentHTML('beforeend', markupInfo);
}
