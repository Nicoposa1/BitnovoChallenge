import { createSlice } from '@reduxjs/toolkit';
import { currencies, CurrencyName, CreateOrderResponse, Order, Country, countries } from '../interfaces/General';

const initialState = {
  currencies: currencies as CurrencyName[],
  currencySelected: currencies.find((currency: CurrencyName) => currency.code === 'USD') as CurrencyName,
  paymentDetails: {} as CreateOrderResponse,
  paymentInfo: {} as Order,
  countries: countries as Country[],
  countryCode: {},
  valueAmount: '',
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
    setCurrencySelected: (state, action) => {
      state.currencySelected = action.payload;
    },
    setPaymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    },
    setPaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    setValueAmount: (state, action) => {
      state.valueAmount = action.payload;
    },
  },
});

export const { setCurrencies, setCurrencySelected, setPaymentDetails, setPaymentInfo, setCountryCode, setValueAmount } = currencySlice.actions;

export default currencySlice.reducer;