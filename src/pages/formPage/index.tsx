import React, { FC, useState } from 'react'
import {
  Avatar,
  Box,
  Button, Card,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper, Typography,
} from '@mui/material'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {
  CheckIcon,
  GetFinalStatesStep,
  GetStatesStep,
  GetStringsStep, StepIcon,
} from '../../components'
import { wait } from '../../utils'
import { State } from '../../types'
import { useDispatch } from '../../store'
import { createStates } from '../../slices/nfaStates'
import { createStrings } from '../../slices/nfaStrings'

export interface DefaultNfaConfig{
  strings:string[]
  statesCount:number
  finalStates:string[]
}

const DefaultStatesPage:FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [complete, setComplete] = useState<boolean>(false)
  const [defaultConfig, setDefaultConfig] = useState<DefaultNfaConfig>({
    strings: [],
    statesCount: 0,
    finalStates: [],
  })
  const handleNext = ():void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = ():void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleComplete = ():void => {
    setComplete(true)
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const submitNFA = async ():Promise<void> => {
    const myArray:State[] = []
    for (let i = 1; i <= defaultConfig.statesCount; i++) {
      myArray.push({
        id: `q${i}`,
        final: defaultConfig.finalStates.indexOf(`q${i}`) != -1,
      })
    }
    myArray[0].initial = true
    dispatch(createStates(myArray))
    dispatch(createStrings(defaultConfig.strings))
    toast.success('Machine Created Successfully!')
    await wait(870)
    navigate('/graph')
  }

  const steps = [
    {
      label: 'Strings',
      content: (
        <GetStringsStep
          onNext={handleNext}
          defaultConfig={defaultConfig}
          setDefaultConfig={setDefaultConfig}
        />
      ),
    },
    {
      label: 'States',
      content: (
        <GetStatesStep
          onBack={handleBack}
          onNext={handleNext}
          defaultConfig={defaultConfig}
          setDefaultConfig={setDefaultConfig}
        />
      ),
    },
    {
      label: 'Final States',
      content: (
        <GetFinalStatesStep
          onBack={handleBack}
          onNext={handleComplete}
          defaultConfig={defaultConfig}
          setDefaultConfig={setDefaultConfig}
        />
      ),
    },
  ]
  return (
  <>
    <Box
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minWidth: '100%',
        flexGrow: 1,
      }}
    >
      <Grid
        container
      >
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            minWidth: '100%',
            p: {
              xs: 4,
              sm: 6,
              md: 8,
            },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box>
            <Typography
              sx={{ mb: 3 }}
              variant="h4"
            >
              Create Finite State Machine
            </Typography>
            {
              !complete
                ? (
                  <Stepper
                    activeStep={activeStep}
                    orientation="vertical"
                    sx={{
                      '& .MuiStepConnector-line': {
                        ml: 1,
                        borderLeftColor: 'divider',
                        borderLeftWidth: 2,
                      },
                    }}
                  >
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel StepIconComponent={StepIcon}>
                          <Typography
                            sx={{ ml: 2 }}
                            variant="overline"
                          >
                            {step.label}
                          </Typography>
                        </StepLabel>
                        <StepContent
                          // @ts-ignore
                          sx={{
                            py: (activeStep === index) && 4,
                            ml: '20px',
                            borderLeftColor: 'divider',
                            borderLeftWidth: 2,
                          }}
                        >
                          {step.content}
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                )
                : (
                  <div>
                    <Avatar
                      sx={{
                        backgroundColor: 'success.main',
                        color: 'success.contrastText',
                        height: 40,
                        width: 40,
                      }}
                    >
                      <CheckIcon />
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{ mt: 2 }}
                    >
                      All done!
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >
                      Here’s a preview of your created machine
                    </Typography>
                    <Card
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        mt: 2,
                        px: 3,
                        py: 1.5,
                      }}
                      variant="outlined"
                    >
                      <div>
                        <Typography variant="subtitle1">
                          Non-deterministic Finite Automata
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="caption"
                        >
                          Number of States
                          <Typography
                            color="inherit"
                            noWrap
                            variant="caption"
                          >
                            •
                            {` ${defaultConfig?.statesCount}`}
                          </Typography>
                        </Typography>
                      </div>
                      <div>
                        <Button
                          onClick={submitNFA}
                        >
                          Apply
                        </Button>
                      </div>
                    </Card>
                  </div>
                )
            }
          </Box>
        </Grid>
      </Grid>
    </Box>
  </>
  )
}

export { DefaultStatesPage }
