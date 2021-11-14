import React, { ChangeEvent, FC } from 'react'
import {
  Autocomplete,
  Box, Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, TextField,
  Typography,
} from '@mui/material'
import { Scrollbar } from '..'
import { State, TransitionInterface } from '../../types'

interface DataGridComponentProps {
  Strings: string[];
  States: State[];
  // @ts-ignore
  onPageChange: (event: MouseEvent<HTMLButtonElement>
    | null, newPage: number) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  rowsPerPage: number;
  // @ts-ignore
  setTransitionsObject:(data:TransitionInterface)=>void
  transitionsObject:TransitionInterface
}
const DataGridComponent:FC<DataGridComponentProps> = ({
  Strings,
  States,
  onPageChange,
  onRowsPerPageChange,
  page,
  rowsPerPage,
  setTransitionsObject,
  transitionsObject,
  ...other
}) => (
  <div {...other}>
    <Scrollbar>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              States
            </TableCell>
            {Strings.map(x => (
                <TableCell>
                    {x}
                </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {States.map(({ id, final, initial }) => (
              <TableRow
                hover
                key={id}
              >
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <Box sx={{ ml: 1 }}>
                      {id}
                      {initial && (
                        <Typography
                          color="textSecondary"
                          variant="body1"
                        >
                          Initial State
                        </Typography>
                      )}
                      {final && (
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          Final State
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </TableCell>
                {Strings.map(x => (
                  <TableCell>
                  <Autocomplete
                    ListboxProps={{
                      style: {
                        maxHeight: 200,
                        overflow: 'auto',
                      },
                    }}
                    fullWidth
                    autoComplete={false}
                    key={x}
                    onChange={(e, value) => {
                      transitionsObject[id][x] = value
                      setTransitionsObject({
                        ...transitionsObject,
                      })
                    }}
                    multiple
                    options={States.map(({ id: label }) => label)}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        name={`${id}(${x})`}
                        {...params}
                        label={`${id}(${x})`}
                        placeholder={x}
                      />
                    )}
                  />
                  </TableCell>
                ))}
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
      {/* <TablePagination */}
      {/*  component="div" */}
      {/*  count={States?.length || 0} */}
      {/*  onPageChange={onPageChange} */}
      {/*  onRowsPerPageChange={onRowsPerPageChange} */}
      {/*  page={page} */}
      {/*  rowsPerPage={rowsPerPage} */}
      {/*  rowsPerPageOptions={[5, 10, 25]} */}
      {/* /> */}
  </div>
)

export { DataGridComponent }
