import { configureStore } from '@reduxjs/toolkit';
import { codeVaultApi } from './services/codeVaultApi';

export const store=configureStore({
    reducer:{[codeVaultApi.reducerPath]:codeVaultApi.reducer},
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(codeVaultApi.middleware)
})