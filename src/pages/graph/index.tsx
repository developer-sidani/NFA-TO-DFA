import React, {
  FC,
  useState,
  useEffect,
} from 'react'
import {
  Button,
  Grid,
  Box,
  Container,
  Divider,
  Typography,
  Link,
  DialogTitle,
  DialogContent, Dialog, DialogContentText, TextField, DialogActions, Alert,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useSelector } from '../../store'
import { DataGridComponent, GraphViz } from '../../components'
import { State, TransitionInterface } from '../../types'
import {
  convertToDFA,
  convertTransitionObject,
  getAllStates,
  getFinalStates,
  getInitialState, getTransitions, testString, wait,
} from '../../utils'

const GraphPage:FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [enteredString, setEnteredString] = useState<string>('')
  const handleClickOpen = ():void => {
    setOpen(true)
  }

  const handleClose = ():void => {
    setOpen(false)
  }

  const navigate = useNavigate()
  const { Strings } = useSelector((state) => state.nfaStrings)
  const { States } = useSelector((state) => state.nfaStates)

  const myObj:TransitionInterface = {}
  // eslint-disable-next-line array-callback-return
  States.map(({ id }) => {
    myObj[id] = {}
    // eslint-disable-next-line array-callback-return
    Strings.map(x => {
      // eslint-disable-next-line array-callback-return
      myObj[id][x] = []
    })
  })
  const [transitionsObject,
    setTransitionsObject] = useState<TransitionInterface>(myObj)
  // @ts-ignore
  const [dfa, setDfa] = useState<{myDFAStates:State[],
    myDFATransitions:TransitionInterface }>(convertToDFA(States,
      transitionsObject))
  useEffect(() => {
    if (States.length <= 0 || Strings.length <= 0) {
      navigate('/')
    } else {
      setDfa(convertToDFA(States, transitionsObject))
    }
  }, [Strings, navigate, States, transitionsObject])
  const handleSubmit = async ():Promise<void> => {
    if (testString(enteredString,
      Strings, dfa.myDFATransitions, dfa.myDFAStates)) {
      toast.success(`${enteredString
      || 'Empty String'} is Accepted`)
    } else toast.error(`${enteredString || 'Empty String'} is Rejected`)
    await wait(900)
    setEnteredString('')
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>String</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a String to Test in Your Machine
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="String"
            type="text"
            value={enteredString}
            onChange={(e) => setEnteredString(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Test</Button>
        </DialogActions>
      </Dialog>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            justifyContent="space-between"
            spacing={2}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Finite State Machine
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ mt: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={4}
            >
             <Grid
               item
               md={12}
               xs={12}
             >
               <DataGridComponent
                 Strings={Strings}
                 States={States}
                 transitionsObject={transitionsObject}
                 setTransitionsObject={setTransitionsObject}
               />
             </Grid>
             <Grid
               item
               md={6}
               xs={12}
             >
              {States.length > 0 && (
                <>
                  <h1>NFA:</h1>
                  <GraphViz
                    transitions={getTransitions(
                      convertTransitionObject(transitionsObject),
                    )}
                    initialState={getInitialState(States)}
                    finalStates={getFinalStates(States)}
                    allStates={getAllStates(States)}
                  />
                </>
              )}
             </Grid>
               <Grid
                 item
                 md={6}
                 xs={12}
               >
                {States.length > 0 && (
                  <>
                    <h1>DFA:</h1>
                    {getFinalStates(dfa.myDFAStates).length < 1
                    && (
                      <Alert
                        severity="info"
                      >
                        There Should Be at least 1 Final State
                      </Alert>
                    )}
                    <GraphViz
                      transitions={getTransitions(
                        convertTransitionObject(dfa.myDFATransitions),
                      )}
                      initialState={getInitialState(dfa.myDFAStates)}
                      finalStates={getFinalStates(dfa.myDFAStates)}
                      allStates={getAllStates(dfa.myDFAStates)}
                    />
                    <Box sx={{ m: -1 }}>
                      {/* @ts-ignore */}
                      <Link
                        color="textPrimary"
                        to="/"
                        variant="subtitle2"
                        style={{
                          textDecoration: 'none',
                        }}
                      >
                        <Button
                          color="primary"
                          // startIcon={<PlusIcon fontSize="small" />}
                          onClick={handleClickOpen}
                          sx={{ m: 3, mx: 1 }}
                          variant="contained"
                        >
                          Test String
                        </Button>
                      </Link>
                    </Box>
                  </>

                )}
               </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export { GraphPage }
