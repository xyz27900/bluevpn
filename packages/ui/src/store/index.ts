import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/api/auth';
import { paymentsApi } from '@/api/payments';
import { appReducer } from '@/store/app';
import { toastReducer } from '@/store/toast';

export const store = configureStore({
  reducer: {
    app: appReducer,
    toast: toastReducer,
    [authApi.reducerPath]: authApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware).concat(paymentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
