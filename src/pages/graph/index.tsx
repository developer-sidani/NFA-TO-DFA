import React, { FC } from 'react'
import {
  allStates,
  finalStates,
  initialState,
  myAcceptableStrings,
  myStates,
  transitions,
} from '../../tempData'
import { GraphViz } from '../../components'

const GraphPage:FC = () => (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h1>States:</h1>
        {myStates.map(({
          id: label,
          final,
          initial,
        }) => (
          <div key={label}>
            <h3>{label}</h3>
            {final && <p>is Final</p>}
            {initial && <p>is Initial</p>}
          </div>
        ))}
      </div>
      <div>
        <h1>Strings:</h1>
        {myAcceptableStrings.map(x => <p key={x}>{x}</p>)}
      </div>
      <div>
        <GraphViz
          transitions={transitions}
          initialState={initialState}
          finalStates={finalStates}
          allStates={allStates}
        />
      </div>
    </div>
)

export { GraphPage }
