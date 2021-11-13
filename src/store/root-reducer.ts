import { combineReducers } from '@reduxjs/toolkit'
import { reducer as nfaStatesReducer } from '../slices/nfaStates'
import { reducer as nfaStringsReducer } from '../slices/nfaStrings'

export const rootReducer = combineReducers({
  nfaStrings: nfaStringsReducer,
  nfaStates: nfaStatesReducer,
})
