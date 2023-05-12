import { ICurrency } from "@/components/currencies/types";

export const fetchCurrencies = () => {
  return fetch('https://api.coincap.io/v2/assets')
    .then((response) => response.json());
};

// export const fetchCurrency = (id: ICurrency['id']) => {
//     return api.get(`/tasks/${id}`, config).then(({ data }) => {
//       return data;
//     });
//   };

// export const fetchCurrency = (id: ICurrency['id']) => {
//   return fetch('https://api.coincap.io/v2/assets').then(`/currencies/${id}`).then((data) => {
//     return data;
//   });
// };
