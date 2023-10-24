import { configureStore } from '@reduxjs/toolkit'
import { accountSlice } from './features/account/accountSlice';
export const store = configureStore({
  reducer: {
    [accountSlice.reducerPath] : accountSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;