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
  const submitNFA = async ():Promise<void> => {
    console.log(defaultConfig)
    // reset form
    setDefaultConfig({
      strings: [],
      statesCount: 0,
      finalStates: [],
    })
    toast.success('Machine Created Successfully!')
    await wait(870)
    navigate('/graph')
  }
  const steps = [
    {
      label: 'Strings',
      content: (
        <GetStringsStep
          onBack={handleBack}
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
        flexGrow: 1,
        maxWidth: '100%',
      }}
    >
      <Grid
        container
        sx={{ flexGrow: 1 }}
      >
        <Grid
          item
          sm={4}
          xs={12}
          sx={{
            // backgroundColor: 'blue',
            // backgroundImage: 'url(https://swall.teahub.io/photos/small/15-156799_computer-science-wallpapers-hd.png)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: {
              xs: 'none',
              md: 'fixed',
            },
          }}
        />
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            p: {
              xs: 4,
              sm: 6,
              md: 8,
            },
          }}
        >
          <Box maxWidth="sm">
            <Typography
              sx={{ mb: 3 }}
              variant="h4"
            >
              Create Deterministic Finite Automata
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
                        px: 2,
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
                          {' '}
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
                        <Typography
                          color="textSecondary"
                          sx={{ mr: 2 }}
                          variant="caption"
                        >
                          1 minute ago
                        </Typography>
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
