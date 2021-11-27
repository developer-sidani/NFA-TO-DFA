import React, { FC, useState } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { State, TransitionInterface } from '../../types'
import { wait } from '../../utils'

interface DataGridComponentProps {
  Strings: string[];
  States: State[];
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  setTransitionsObject:(data:TransitionInterface)=>void
  transitionsObject:TransitionInterface
}
const DataGridComponent:FC<DataGridComponentProps> = ({
  Strings,
  States,
  setTransitionsObject,
  transitionsObject,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleClickOpen = ():void => {
    setOpen(true)
  }

  const handleClose = ():void => {
    setOpen(false)
  }
  const handleSubmit = async ():Promise<void> => {
    setOpen(false)
    toast.success('Machine Reset Successfully')
    await wait(900)
    navigate('/')
  }
  return (
    <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Reset your Machine
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure That You Want to Reset Your
              Machine and Reconfigure It?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} autoFocus>
              Reset
            </Button>
          </DialogActions>
        </Dialog>
      <Card>
        <Box
          sx={{
            backgroundColor: 'neutral.100',
            px: 2,
            py: 0.5,
          }}
        >
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={handleClickOpen}
          >
            Reset Machine
          </Button>
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ visibility: 'visible' }}>
            <TableRow>
              <TableCell>
                States
              </TableCell>
              {Strings.map(x => (
                <TableCell key={x}>
                  {x}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {States.map(({
              id,
              final,
              initial,
            }) => (
              <TableRow
                hover
                key={id}
              >
                <TableCell>
                  <Box>
                    <Box>
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
                  <TableCell key={x}>
                    <Autocomplete
                      key={x}
                      ListboxProps={{
                        style: {
                          maxHeight: 200,
                          overflow: 'auto',
                        },
                      }}
                      fullWidth
                      autoComplete={false}
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
      </Card>
    </>
  )
}

export { DataGridComponent }
