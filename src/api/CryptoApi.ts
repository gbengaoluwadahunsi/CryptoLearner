import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const coinGeckoApikey = import.meta.env.VITE_GECKO_API_KEY
const cryptoApiHeaders = {
  'accept': 'application/json',
  'x-cg-demo-api-key': coinGeckoApikey
};

const baseUrl = 'https://api.coingecko.com/api/v3';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl, headers: cryptoApiHeaders }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => '/global',
    }),
    getCryptoCoins: builder.query({
      query: () => '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1',
    }),
    
    getCryptoDetails: builder.query({
      query: (id) => `/coins/${id}`
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoCoinsQuery,
  useGetCryptoDetailsQuery,
} = cryptoApi;
