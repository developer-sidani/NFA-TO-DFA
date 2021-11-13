import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppThunk } from '../store'
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
      action: PayloadAction<State>,
    ): void {
      state.States.push(action.payload)
    },
  },
})
export const { getStates, createStates } = slice.actions

export const { reducer } = slice

// export const getStates = (): AppThunk => async (dispatch): Promise<void> => {
//   const data = await calendarApi.getEvents()
//
//   dispatch(slice.actions.getStates(data))
// }
//
// export const createState = (createData:string[]): AppThunk => async (dispatch): Promise<void> => {
//   const data = await calendarApi.createEvent(createData)
//
//   dispatch(slice.actions.createEvent(data))
// }
