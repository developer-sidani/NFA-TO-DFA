import React, { FC } from 'react'
import { Graphviz } from 'graphviz-react'
import { getTransitions } from '../../utils'
import { TransitionInterface } from '../../types'

interface GraphvizProps{
  transitions:TransitionInterface|string
  initialState:string
  finalStates:string[]
  allStates:string[]
}

const GraphViz:FC<GraphvizProps> = ({
  finalStates, allStates, initialState, transitions,
}) => {
  const myFSM = `digraph finite_state_machine {
	rankdir=LR;
	// bgcolor="#89CFF0"
	size="8,5"
	node [shape = doublecircle]; ${finalStates};
  init [label="", shape=point]
	node [shape = circle];
  ${allStates}
  init -> ${initialState} [style="solid"]
	${getTransitions(transitions)}
	// q1 -> q1 [label = "b"];
}`
  return (
  <>
    <Graphviz dot={myFSM} />
  </>
  )
}

export { GraphViz }
