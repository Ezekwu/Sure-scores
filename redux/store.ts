import { configureStore } from '@reduxjs/toolkit'
import calenderSlice from './features/calender/calenderSlice';

export const store = configureStore({
  reducer: {
    calender: calenderSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;