import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const stateApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ac65-3-125-188-66.ngrok-free.app/api/v1',
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
  }),
});

export const { useSaveStateMutation, useGetStateIdQuery } = stateApi;
