import React, { FC } from 'react'
import {
  Box,
  Button, Card, CardActions, CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ArrowRightIcon } from '../index'
import { DefaultNfaConfig } from '../../pages/formPage'

interface GetStatesStepProps {
  onNext: () => void;
  onBack: () => void;
  defaultConfig:DefaultNfaConfig
  // eslint-disable-next-line no-unused-vars
  setDefaultConfig:(data:DefaultNfaConfig)=>void
}

const GetStatesStep:FC<GetStatesStepProps> = (props) => {
  const {
    onNext,
    onBack,
    defaultConfig,
    setDefaultConfig,
  } = props
  return (
    <>
      <Typography variant="h6">
        Enter States Count to your machine
      </Typography>
      <Box sx={{ mt: 3 }}>
        <>
          <Formik
            enableReinitialize
            validationSchema={Yup.object({
              states: Yup.number()
                .positive()
                .required(),
            })}
            initialValues={{
              states: defaultConfig.statesCount || 1,
            }}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              setDefaultConfig({
                ...defaultConfig,
                statesCount: values.states,
              })
              onNext()
              setStatus({ success: true })
              setSubmitting(false)
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
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
                        <TextField
                          error={Boolean(touched.states && errors.states)}
                          helperText={touched.states && errors.states}
                          fullWidth
                          onBlur={handleBlur}
                          label="Number of States"
                          type="number"
                          name="states"
                          required
                          onChange={handleChange}
                          value={values.states}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <CardActions
                      sx={{
                        flexWrap: 'wrap',
                        m: -1,
                      }}
                    >
                      <Box sx={{ mt: 3 }}>
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          endIcon={(<ArrowRightIcon fontSize="small" />)}
                          variant="contained"
                        >
                          Continue
                        </Button>
                        <Button
                          type="button"
                          onClick={onBack}
                          sx={{ ml: 2 }}
                        >
                          Back
                        </Button>
                      </Box>
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

export { GetStatesStep }
