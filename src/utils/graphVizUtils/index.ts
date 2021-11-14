import { State } from '../../types'

export const getAllStates = (states:State[]):string[] => states
  .map(({ id }) => id)
export const getFinalStates = (states:State[]):string[] => states
  .filter(({ final }) => final)
  .map(({ id }) => id)
export const getInitialState = (states:State[]):string => states
  .filter(({ initial }) => initial)
  .map(({ id }) => id)[0]
