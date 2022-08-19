import './css/styles.css';

const DEBOUNCE_DELAY = 300;

fetch(
  'https://restcountries.com/v2/all?fields=name,capital,population,flags.svg,languages'
)
  .then(response => {
    return response.json();
  })
  .then(cuntry => {
    console.log(cuntry);
  })
  .catch(error => {
    console.log(error);
  });
