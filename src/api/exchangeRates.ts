export const fetchExchangeRates = () => {
  return fetch('https://api.freecurrencyapi.com/v1/latest?apikey=u4fOT74Ev0O5E3p2LGKWNQF5cy6CTnKykEG4QaZR&currencies=EUR%2CUSD%2CPLN')
    .then((response) => console.log(response.json()));
};

