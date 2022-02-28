import { configureStore } from '@reduxjs/toolkit';
import { accessApi } from '@/api/access';
import { authApi } from '@/api/auth';
import { appReducer } from '@/store/app';
import { toastReducer } from '@/store/toast';

export const store = configureStore({
  reducer: {
    app: appReducer,
    toast: toastReducer,
    [authApi.reducerPath]: authApi.reducer,
    [accessApi.reducerPath]: accessApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware).concat(accessApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
