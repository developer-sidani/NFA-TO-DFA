import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface NfaStrings {
  Strings: string[];
}

const initialState: NfaStrings = {
  Strings: [],
}

const slice = createSlice({
  name: 'nfaStrings',
  initialState,
  reducers: {
    getStrings(
      state: NfaStrings,
      action: PayloadAction<string[]>,
    ): void {
      state.Strings = action.payload
    },
    createStrings(
      state: NfaStrings,
      action: PayloadAction<string[]>,
    ): void {
      state.Strings = action.payload
    },
  },
})
export const { getStrings, createStrings } = slice.actions

export const { reducer } = slice
