import React, {
  FC,
  useEffect,
  useState,
} from 'react'
import {
  Button, Grid, Box, Container, Divider, Typography, Link,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from '../../store'
import { DataGridComponent, GraphViz } from '../../components'
import { TransitionInterface } from '../../types'
import {
  convertTransitionObject,
  getAllStates,
  getFinalStates,
  getInitialState, getTransitions,
} from '../../utils'

const GraphPage:FC = () => {
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
  useEffect(() => {
    if (Strings.length <= 0) {
      navigate('/')
    }
  }, [Strings, navigate])
  return (
    <>
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
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Finite State Machine
              </Typography>
            </Grid>
            <Box sx={{ m: -1 }}>
              {/* @ts-ignore */}
              <Link
                color="textPrimary"
                // component={RouterLink}
                to="/merchants/create"
                variant="subtitle2"
                style={{
                  textDecoration: 'none',
                }}
              >
                <Button
                  color="primary"
                  // startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Test String
                </Button>
              </Link>
            </Box>
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
               md={7}
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
               md={5}
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
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export { GraphPage }
