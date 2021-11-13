import { State, TransitionInterface } from '../types'

const myStates:State[] = [
  {
    id: 'q1',
    initial: true,
    final: true,
  },
  {
    id: 'q2',
    final: true,
  },
  {
    id: 'q3',
    final: false,
  },
  {
    id: 'q4',
    final: false,
  },
]

const myAcceptableStrings:string[] = ['a', 'b']
const allStates:string[] = myStates.map(({ id }) => id)
const finalStates:string[] = myStates
  .filter(({ final }) => final).map(({ id }) => id)
const initialState:string = myStates.filter(({ initial }) => initial)
  .map(({ id }) => id)[0]
const transitions:TransitionInterface = {
  q1: {
    // a: ['q1', 'q2'],
    q2: myAcceptableStrings, // a - b
    q1: [myAcceptableStrings[0]], // a
    q4: myAcceptableStrings,
  },
  // q1 -> q2 [label = 'a,b']
  q2: {
    q2: [myAcceptableStrings[0]],
  },
  q3: {
    q2: myAcceptableStrings,
    q3: [myAcceptableStrings[0]],
    q1: [myAcceptableStrings[1]],
  },
}
export {
  myStates,
  myAcceptableStrings,
  allStates,
  finalStates,
  initialState,
  transitions,
}
