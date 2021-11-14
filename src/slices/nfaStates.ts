import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { State } from '../types'

interface NfaStates {
  States: State[];
}

const initialState: NfaStates = {
  States: [],
}

const slice = createSlice({
  name: 'nfaStates',
  initialState,
  reducers: {
    getStates(
      state: NfaStates,
      action: PayloadAction<State[]>,
    ): void {
      state.States = action.payload
    },
    createStates(
      state: NfaStates,
      action: PayloadAction<State[]>,
    ): void {
      state.States = action.payload
    },
  },
})
export const { getStates, createStates } = slice.actions

export const { reducer } = slice
