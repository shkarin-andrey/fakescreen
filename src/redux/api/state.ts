import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { VITE_APP_BASE_URL_API } = import.meta.env;

export const stateApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_APP_BASE_URL_API,
    mode: 'cors',
    credentials: 'omit',
  }),
  endpoints: (build) => ({
    saveState: build.mutation({
      query: (body) => ({
        url: 'state',
        method: 'POST',
        body,
      }),
    }),
    getStateId: build.query<any, string>({
      query: (id) => `state/${id}`,
    }),
    getScreenshot: build.query<any, string>({
      query: (id) => ({
        url: `state/screenshot/${id}`,
        method: 'GET',
        responseHandler: async (response) => await response.blob(),
        cache: 'no-cache',
      }),
    }),
  }),
});

export const { useSaveStateMutation, useGetStateIdQuery, useLazyGetScreenshotQuery } =
  stateApi;
