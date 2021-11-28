import React, { FC } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Card, CardActions, CardContent,
  Grid, TextField,
  Typography,
} from '@mui/material'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ArrowRightIcon } from '../index'
import { DefaultNfaConfig } from '../../pages/formPage'

interface GetFinalStatesStepProps {
  onNext: () => void
  onBack: () => void
  defaultConfig:DefaultNfaConfig
  // eslint-disable-next-line no-unused-vars
  setDefaultConfig:(data:DefaultNfaConfig)=>void
}
const getFinalStates = (x:number):string[] => {
  const myArray:string[] = []
  for (let i = 1; i <= x; i++) {
    myArray.push(`q${i}`)
  }
  return myArray
}
const GetFinalStatesStep:FC<GetFinalStatesStepProps> = (props) => {
  const {
    onNext,
    onBack,
    defaultConfig,
    setDefaultConfig,
  } = props
  return (
    <>
      <Typography variant="h6">
        Select Final States to your machine
      </Typography>
      <Box sx={{ mt: 2 }}>
        <>
          <Formik
            enableReinitialize
            validationSchema={Yup.object({
              finalStates: Yup.array().min(1).required(),
            })}
            initialValues={{
              finalStates: defaultConfig.finalStates || [],
              states: defaultConfig.statesCount,
            }}
            onSubmit={(values) => {
              setDefaultConfig({
                ...defaultConfig,
                finalStates: values.finalStates,
              })
              onNext()
            }}
          >
            {({
              setFieldValue,
              errors,
              handleBlur,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <Autocomplete
                          multiple
                          onOpen={handleBlur}
                          options={getFinalStates(values.states)}
                          value={values.finalStates}
                          filterSelectedOptions
                          onChange={(e, value) => setFieldValue('finalStates',
                            value || '')}
                          renderInput={(params) => (
                            <TextField
                              onBlur={handleBlur}
                              name="finalStates"
                              helperText={touched.finalStates
                              && errors.finalStates}
                              error={Boolean(touched.finalStates
                                && errors.finalStates)}
                              {...params}
                              label="Final States"
                              placeholder="Final States"
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                    <CardActions
                      sx={{
                        flexWrap: 'wrap',
                        my: 2,
                        mx: -1,
                      }}
                    >
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        endIcon={(<ArrowRightIcon fontSize="small" />)}
                        variant="contained"
                      >
                        Create Machine
                      </Button>
                      <Button
                        type="button"
                        onClick={onBack}
                        sx={{ ml: 2 }}
                      >
                        Back
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </form>
            )}
          </Formik>
        </>
      </Box>
    </>
  )
}

export { GetFinalStatesStep }
