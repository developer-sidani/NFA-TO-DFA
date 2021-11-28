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

interface GetStringsStepProps {
  onNext: () => void
  defaultConfig:DefaultNfaConfig
  // eslint-disable-next-line no-unused-vars
  setDefaultConfig:(data:DefaultNfaConfig)=>void
}

const GetStringsStep:FC<GetStringsStepProps> = ({
  onNext,
  defaultConfig,
  setDefaultConfig,
}) => (
    <>
      <Typography variant="h6">
        Enter Strings to your machine
      </Typography>
      <Box sx={{ mt: 3 }}>
          <Formik
            enableReinitialize
            validationSchema={Yup.object({
              strings: Yup.array().min(1).required(),
            })}
            initialValues={{
              strings: defaultConfig.strings || [''],
            }}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              setDefaultConfig({
                ...defaultConfig,
                strings: values.strings,
              })
              onNext()
              setStatus({ success: true })
              setSubmitting(false)
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
                          value={values.strings}
                          freeSolo
                          onOpen={handleBlur}
                          options={['0', '1', 'a', 'b', 'c']}
                          filterSelectedOptions
                          onChange={(e, value) => setFieldValue('strings',
                            value || '')}
                          renderInput={(params) => (
                            <TextField
                              onBlur={handleBlur}
                              name="strings"
                              helperText={touched.strings && errors.strings}
                              error={Boolean(touched.strings && errors.strings)}
                              {...params}
                              label="STRINGS"
                              placeholder="Strings"
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
                        Continue
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </form>
            )}
          </Formik>
      </Box>

    </>
)

export { GetStringsStep }
