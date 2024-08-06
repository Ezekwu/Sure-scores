import { configureStore } from '@reduxjs/toolkit';
import { accountSlice } from './features/Account';
import { eventSlice } from './features/Events';

export const store = configureStore({
  reducer: {
    [accountSlice.reducerPath]: accountSlice.reducer,
    [eventSlice.reducerPath]: eventSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountSlice.middleware, eventSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
