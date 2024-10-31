import { configureStore } from '@reduxjs/toolkit';
import { accountSlice } from './features/Account';
import { eventSlice } from './features/Events';
import { teamSlice } from './features/Team';
import { projectSlice } from './features/Projects';

export const store = configureStore({
  reducer: {
    [accountSlice.reducerPath]: accountSlice.reducer,
    [eventSlice.reducerPath]: eventSlice.reducer,
    [teamSlice.reducerPath]: teamSlice.reducer,
    [projectSlice.reducerPath]: projectSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountSlice.middleware, eventSlice.middleware, teamSlice.middleware, projectSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
