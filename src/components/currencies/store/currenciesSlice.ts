import { Currencies } from '@/components/currencies/Currencies';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ICurrency {
  id: string;
  symbol: string;
  name: string,
  priceUsd: string;
  changePercent24Hr: string;
  volumeUsd24Hr: string;
  marketCapUsd: string;
};

interface CurrenciesState {
  currencies: ICurrency[],
};

const initialState:CurrenciesState = {
  currencies: [],
};

export const fetchCurrencies = createAsyncThunk('currencies/fetchCurrencies', () => {
//   const response = await fetch('https://api.coincap.io/v2/assets', {
//     method: 'GET'
//   });
//   const data = response.json();
//   return data;

  // .then((response) => response.json());

  // 2
  return axios.get('https://api.coincap.io/v2/assets').then(({ data }) => {
    return data;
  });
})

export const currenciesSlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    addCurrencies: (state, action:PayloadAction<ICurrency>) => {
    //   state.currencies.push(action.payload)
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state) => {
      //TODO
      // state.loading = true;
    });
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
        console.log(action);
        
      state.currencies = action.payload.data;
    });
    builder.addCase(fetchCurrencies.rejected, (state, action) => {
      // TODO
      // state.loading = false;
      // state.errorMessage = 'ERROR!';
    });
  }
});

export const { addCurrencies } = currenciesSlice.actions;
export default currenciesSlice.reducer;