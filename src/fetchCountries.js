const BASE_URL = 'https://restcountries.com/v3.1/name';
const FIELDS = 'fields=name,capital,population,flags,languages';

export default function fetchCountries(name) {
  if (name) {
    return fetch(`${BASE_URL}/${name}?${FIELDS}`).then(onSuccessFetch);
  }
}
function onSuccessFetch(response) {
  console.log(response.status);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
}
