// @ts-nocheck
import { State, TransitionInterface } from '../../types'

// const nfas:State[] = [
//   {
//     id: 'q1',
//     initial: true,
//     final: false,
//   },
//   {
//     id: 'q2',
//     final: false,
//   },
//   {
//     id: 'q3',
//     final: true,
//   },
// ]
//
// const nfat:TransitionInterface = {
//   q1: {
//     a: ['q1', 'q2'],
//     b: ['q1'],
//   },
//   q2: {
//     a: [],
//     b: ['q3'],
//   },
//   q3: {
//     a: [],
//     b: [],
//   },
// }
export const convert = (myNFATransitions:TransitionInterface,
  myNFAStates:State[]):Record<TransitionInterface, State[]> => {
  const myDFAStates:State[] = []
  const myDFATransitions:TransitionInterface = {}

  const checkIfDfaHasState = (objs, state):boolean => objs
    .filter(({ id }) => id === state)?.length > 0

  const getIsFinal = (state, nfaStates):boolean => nfaStates
    ?.filter(({ id }) => id === state)[0]?.final

  const merge = (states):TransitionInterface => {
    const transition = {}
    const nfaTransitions = JSON.parse(JSON.stringify(myNFATransitions))
    states.sort()

    // eslint-disable-next-line array-callback-return
    states.map((s) => {
      // eslint-disable-next-line array-callback-return
      Object.keys(nfaTransitions[s]).map((e) => {
        if (!transition[e]) {
          console.log(transition[e])
          transition[e] = nfaTransitions[s][e].sort()
        } else {
          transition[e].push(...nfaTransitions[s][e])
          transition[e].sort()
          transition[e] = [...new Set(transition[e])]
        }
      })
    })
    // eslint-disable-next-line array-callback-return
    Object.entries(transition).map(([key, value]) => {
      transition[key] = [value.join().replace(/[, ]+/g, '').trim()]
    })

    return transition
  }

  const trap = {
    id: 'Trap',
    final: false,
  }

  const conversion = (transition:TransitionInterface, states):void => {
    const nextStates = []
    const normalTransition = Object.values(myNFATransitions)[0]
    // check if all states present if true it exists the recursion
    const values = states
    let present = false
    if (values.length === 0) {
      present = true
    }
    for (let value of values) {
      if (value[0] !== trap.id) {
        value = [value.sort().join()]
        value = value[0]?.replace(/[, ]+/g, '').trim()
      }
      // console.log({ value });
      if (!checkIfDfaHasState(myDFAStates, value)) {
        present = false
        break
      }
      present = true
    }
    if (present) return

    // it enters here when first calling the function
    if (Object.keys(myDFATransitions).length === 0) {
      // first we push the initial state the dfaStates and it's transitions
      console.log(myNFAStates[0])
      myDFAStates.push(myNFAStates[0])
      myDFATransitions[states[0]] = JSON.parse(JSON.stringify(transition))
      // eslint-disable-next-line array-callback-return
      Object.keys(myDFATransitions[states[0]]).map((e) => {
        if (myDFATransitions[states[0]][e].length === 0) {
          myDFATransitions[states[0]][e] = [trap.id]
          nextStates.push([trap.id])
        } else if (myDFATransitions[states[0]][e].length > 1) {
          nextStates.push(myDFATransitions[states[0]][e])
          myDFATransitions[states[0]][e] = [
            myDFATransitions[states[0]][e].sort().join(),
          ]

          myDFATransitions[states[0]][e] = [
            myDFATransitions[states[0]][e][0].replace(/[, ]+/g, '').trim(),
          ]
        } else {
          nextStates.push(myDFATransitions[states[0]][e])
        }
      })
    } else {
      states.forEach((state) => {
        let value
        if (state[0] !== trap.id) {
          value = state.sort().join()
          value = value.replace(',', '')
        }
        if (
          state[0] === trap.id.toString()
          && !checkIfDfaHasState(myDFAStates, value || state[0])
        ) {
          myDFAStates.push(trap)
          myDFATransitions[state] = JSON.parse(
            JSON.stringify(normalTransition),
          )

          Object.keys(myDFATransitions[state]).map(
            (e) => (myDFATransitions[state][e] = [trap.id]),
          )
        } else if (
          state.length > 1
          && !checkIfDfaHasState(myDFAStates, value)
        ) {
          state.sort()
          value = state.sort().join()
          value = value.replace(/[, ]+/g, '').trim()
          myDFATransitions[value] = merge(state, myNFATransitions)
          Object.keys(myDFATransitions[value]).forEach((e) => {
            if (myDFATransitions[value].length === 0) {
              myDFATransitions[value][e] = [trap.id]
            }
            nextStates.push(myDFATransitions[value][e][0].match(/.{1,2}/g))
          })

          let final = false
          state.forEach((s) => {
            if (getIsFinal(s, myNFAStates)) {
              final = true
            }
          })
          if (!checkIfDfaHasState(myDFAStates, value)) {
            if (final) {
              myDFAStates.push({
                id: value,
                final: true,
              })
            } else {
              myDFAStates.push({
                id: value,
                final: false,
              })
            }
          }
        } else if (
          state.length === 1
          && !checkIfDfaHasState(myDFAStates, value || state[0])
        ) {
          myDFATransitions[state] = JSON.parse(
            JSON.stringify(myNFATransitions[state]),
          )

          Object.keys(myDFATransitions[state]).forEach((e) => {
            if (myDFATransitions[state][e].length === 0) {
              myDFATransitions[state][e] = [trap.id]
            }
            myDFATransitions[state][e] = myDFATransitions[state][e]
              .sort()
              .join()
            myDFATransitions[state][e] = [
              myDFATransitions[state][e].replace(',', ''),
            ]
            if (myDFATransitions[state][e][0] === trap.id) {
              nextStates.push(myDFATransitions[state][e])
            } else {
              nextStates.push(myDFATransitions[state][e][0].match(/.{1,2}/g))
            }
          })

          if (getIsFinal(...state, myNFAStates)) {
            myDFAStates.push({
              id: state[0],
              final: true,
            })
          } else {
            myDFAStates.push({
              id: state[0],
              final: false,
            })
          }
        }
      })
    }

    conversion(transition, nextStates, myNFATransitions, myNFAStates)
  }
  conversion(
    Object.values(myNFATransitions)[0],
    [['q1']],
    myNFATransitions,
    myNFAStates,
  )
  return [myDFATransitions, myDFAStates]
}
// [myDFATransitions, myDFAStates] = convert(nfat, nfas)
//
// console.log({ myDFAStates })
// console.log({ myDFATransitions })
