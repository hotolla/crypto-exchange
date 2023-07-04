export const fetchExchangeRates = () => {
  return fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.REACT_APP_FREE_CURRENCY_API_KEY}`)
    .then((response) => response.json());
};
