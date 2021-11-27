import { State, TransitionInterface } from '../../types'

// const myTransition:TransitionInterface = {
//   q1: {
//     0: ['q1'],
//     1: ['q2'],
//   },
//   q2: {
//     0: ['q2'],
//     1: ['q2'],
//   },
// }
//
// const myStrings:string[] = ['0', '1']
//
// const myStates:State[] = [
//   {
//     id: 'q1',
//     initial: true,
//     final: false,
//   },
//   {
//     id: 'q2',
//     final: true,
//   },
// ]

const getFinalStateFromString = (myString:string,
  state:string, myStrings:string[],
  myTransition:TransitionInterface):string|number => {
  if (myString.length === 0) {
    return state
  }
  if (myStrings.indexOf(myString[0]) === -1) {
    return -1
  }
  return getFinalStateFromString(myString
    .substring(1), myTransition[state][myString[0]]
    .toString(), myStrings, myTransition)
}

export const testString = (myString:string,
  myStrings:string[],
  myTransition:TransitionInterface,
  myStates:State[]):boolean => {
  const res = getFinalStateFromString(myString, 'q1', myStrings, myTransition)
  return res === undefined ? false : Boolean(myStates
    .filter(({ id }) => id === res)?.[0]?.final)
}
