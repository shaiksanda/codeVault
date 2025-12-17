
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const codeVaultApi = createApi({
    reducerPath: 'codeVaultApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL, prepareHeaders: (headers) => {
            const token = Cookies.get("jwt_token"); 
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Snippets'], 
    endpoints: () => ({
        
    }),
});

