// @ts-nocheck
import { State, TransitionInterface } from '../../types'

export const convertToDFA = (myNFAStates,
  myNFATransitions):{myDFAStates:State[],
  myDFATransitions:TransitionInterface } => {
  const myDFAStates = []
  const myDFATransitions = {}
  if (myNFAStates.length < 1) {
    return { myDFAStates, myDFATransitions }
  }
  const trap = {
    id: 'Trap',
    final: false,
  }
  const checkIfDfaHasState = (objs, state):boolean => objs
    ?.filter(({ id }) => id === state)?.length > 0

  // to get if a state is final from the nfa.
  const getIsFinal = (state):boolean => myNFAStates
    ?.filter(({ id }) => id === state)[0]?.final

  const removeRepeatedStates = (arr):string[] => [...new Set(arr)]
    .length > 1 ? arr.filter(x => x !== 'Trap') : [...new Set(arr)]

  const merge = (states, nfaT):TransitionInterface => {
    const transition = {}
    const nfaTransitions = JSON.parse(JSON.stringify(nfaT))
    states.sort()
    // eslint-disable-next-line array-callback-return
    states.map((s) => {
      // eslint-disable-next-line array-callback-return
      Object.keys(nfaTransitions[s]).map((e) => {
        if (!transition[e]) {
          transition[e] = nfaTransitions[s][e].sort()
        } else {
          if (nfaTransitions[s][e].length === 0)nfaTransitions[s][e] = [trap.id]
          transition[e].push(...nfaTransitions[s][e])
          transition[e] = [...new Set(transition[e].sort())]
        }
      })
    })
    // eslint-disable-next-line array-callback-return
    Object.keys(transition).map((key) => {
      transition[key] = removeRepeatedStates(transition[key])
      // if(transition[key]!==)
      transition[key] = [transition[key].join().replace(/[, ]+/g, '').trim()]
    })

    return transition
  }

  // 1- first add q1 transitions where if 2 states are in one symbol
  // combine them and if there is a if destination add it as a trap
  // 2-same thing with other transitions

  const conversion = (transition, states):void => {
    const nextStates = []
    const normalTransition = Object.values(myNFATransitions)[0]
    // check if all states present if true it exists the recursion
    const values = states
    let present = false
    if (values.length === 0) {
      present = true
    }
    for (let value of values) {
      if (value?.[0] !== trap.id) {
        value = [value?.sort()?.join()]
        value = value[0]?.replace(/[, ]+/g, '').trim()
      }
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
      myDFAStates.push(myNFAStates?.filter(({ id }) => id === 'q1')[0])
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
          value = value.replace(/[, ]+/g, '').trim()
        }
        if (
          state[0] === trap.id.toString()
          && !checkIfDfaHasState(myDFAStates, value || state[0])
        ) {
          myDFAStates.push(trap)
          myDFATransitions[state] = JSON.parse(JSON.stringify(normalTransition))

          Object.keys(myDFATransitions[state]).map(
            (e) => (myDFATransitions[state][e] = [trap.id]),
          )
        } else if (state.length > 1
          && !checkIfDfaHasState(myDFAStates, value)) {
          state.sort()
          value = state.sort().join()
          value = value.replace(/[, ]+/g, '').trim()
          myDFATransitions[value] = merge(state, myNFATransitions)
          Object.keys(myDFATransitions[value]).forEach((e) => {
            if (myDFATransitions[value].length === 0) {
              myDFATransitions[value][e] = [trap.id]
            } else if (myDFATransitions[value][e][0] === trap.id) {
              nextStates.push([myDFATransitions[value][e][0]])
            } else {
              nextStates.push(myDFATransitions[value][e][0].match(/.{1,2}/g))
            }
          })

          let final = false
          state.forEach((s) => {
            if (getIsFinal(s)) {
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
              .sort().join()
            myDFATransitions[state][e] = [
              myDFATransitions[state][e].replace(/[, ]+/g, '').trim(),
            ]
            if (myDFATransitions[state][e][0] === trap.id) {
              nextStates.push(myDFATransitions[state][e])
            } else {
              nextStates.push(myDFATransitions[state][e][0].match(/.{1,2}/g))
            }
          })

          if (getIsFinal(...state)) {
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
    conversion(transition, nextStates)
  }
  conversion(Object.values(myNFATransitions)[0], [['q1']])
  return {
    myDFAStates,
    myDFATransitions,
  }
}
