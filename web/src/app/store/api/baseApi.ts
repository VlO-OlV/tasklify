import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        /*prepareHeaders(headers) {
            headers.set()
            return headers;
        }*/
    }),
    endpoints: (builder) => ({}),
});