import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'

export const store = configureStore({
  reducer: rootReducer,
})
export type AppDispatch = typeof store.dispatch;

export const useDispatch = ():any => useReduxDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
