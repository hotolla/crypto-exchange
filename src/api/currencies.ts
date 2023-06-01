import { ICurrency } from "@/components/currencies/types";
 
export const fetchCurrencies = () => {
  return fetch('https://api.coincap.io/v2/assets')
    .then((response) => response.json());
};

export const fetchCurrency = (id: ICurrency['id']) => {
  return fetch(`https://api.coincap.io/v2/assets/${id}`)
    .then((response) => response.json());
};
