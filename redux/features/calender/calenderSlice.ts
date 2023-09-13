import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalenderState  {
  value : number
}

const initialState : CalenderState = {
  value : 0
}

export const calenderSlice = createSlice({
  name: 'calender',
  initialState,
  reducers: {

  }
})

export default calenderSlice.reducer