import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { VITE_APP_BASE_URL_API } = import.meta.env;

export const stateApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_APP_BASE_URL_API,
    mode: 'cors',
    credentials: 'omit',
  }),
  endpoints: (build) => ({
    uploadFile: build.mutation<{ filename: string; id: string }, any>({
      query: (body) => ({
        url: 'file/upload',
        method: 'POST',
        body,
      }),
    }),
    downloadFile: build.query<any, string>({
      query: (id) => `file/download/${id}`,
    }),
  }),
});

export const { useUploadFileMutation, useDownloadFileQuery } = stateApi;
