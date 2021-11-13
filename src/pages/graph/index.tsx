import React, { FC } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { useSelector } from '../../store'
import {
  allStates,
  finalStates,
  initialState,
  myAcceptableStrings,
  myStates,
  transitions,
} from '../../tempData'
import { GraphViz } from '../../components'
import { State } from '../../types'

const myArray:State[] = []
for (let i = 1; i <= 4; i++) {
  myArray.push({
    id: `q${i}`,
  })
}
myArray[0].initial = true

const GraphPage:FC = () => {
  const { Strings } = useSelector((state) => state.nfaStrings)
  const { States } = useSelector((state) => state.nfaStates)
  console.log({ Strings, States })
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
    }}
    >
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
      <div style={{
        width: '20%',
        padding: 10,
      }}
      >
        <Autocomplete
          multiple
          id="tags-outlined"
          freeSolo
          fullWidth
          options={['0', '1', 'a', 'b', 'c']}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="STRINGS"
              placeholder="Strings"
            />
          )}
        />
        <Autocomplete
          multiple
          id="tags-outlined"
          fullWidth
          options={myArray.map(({ id }) => id)}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Final States"
              placeholder="final states"
            />
          )}
        />
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
}

export { GraphPage }
