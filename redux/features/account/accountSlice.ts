import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import User from '@/types/User';

export interface AccountState {
  user: User | null
}

const initialState: AccountState = {
   user: null
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {

  }
})

export default accountSlice.reducer