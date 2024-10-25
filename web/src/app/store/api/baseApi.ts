import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cookies } from 'react-cookie';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers) => {
      const accessToken = new Cookies().get('accessToken');
      headers.set('Authorization', `Bearer ${accessToken}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({}),
});