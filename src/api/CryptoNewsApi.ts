

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;


 const cryptoNewsApiHeaders = {
  
   'x-rapidapi-host': 'crypto-news51.p.rapidapi.com',
   'x-rapidapi-key': rapidApiKey 
 } 

 const baseUrl =  'https://crypto-news51.p.rapidapi.com'

 export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl, headers: cryptoNewsApiHeaders }),
    endpoints: (builder) => ({
      getCryptoNews: builder.query({
        query: () => 
        `api/v1/crypto/articles?page=1&limit=100&time_frame=24h&format=json`
      }),
    }),
  });
  
  export const {
    useGetCryptoNewsQuery,
  } = cryptoNewsApi;
  