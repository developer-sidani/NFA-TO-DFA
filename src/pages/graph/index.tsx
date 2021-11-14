import React, {
  ChangeEvent, FC, useEffect, useState,
} from 'react'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from '../../store'
import { DataGridComponent, GraphViz } from '../../components'
import { State } from '../../types'
import { getAllStates, getFinalStates, getInitialState } from '../../utils'

const applyPagination = (
  states: State[],
  page: number,
  rowsPerPage: number,
): State[] => states.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
const GraphPage:FC = () => {
  const navigate = useNavigate()
  const { Strings } = useSelector((state) => state.nfaStrings)
  const { States } = useSelector((state) => state.nfaStates)
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(States.length || 10)
  // @ts-ignore
  const handlePageChange = (event: MouseEvent<HTMLButtonElement>
    | null, newPage: number): void => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (event:
    ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10))
  }
  const paginatedStates = applyPagination(States, page, rowsPerPage)
  useEffect(() => {
    if (Strings.length <= 0) {
      navigate('/')
    }
  }, [Strings, navigate])
  return (
    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        md={6}
        xs={12}
      >
        <DataGridComponent
          Strings={Strings}
          States={paginatedStates}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        {States.length > 0 && (
          <GraphViz
            transitions={{}}
            initialState={getInitialState(States)}
            finalStates={getFinalStates(States)}
            allStates={getAllStates(States)}
          />
        )}
      </Grid>
    </Grid>
  )
}

export { GraphPage }
