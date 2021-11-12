import React, { FC } from 'react'
import { Formik, Form } from 'formik'
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from '@mui/material'
import * as Yup from 'yup'
import { wait } from '../../utils'

const getFinalStates = (x:number):string[] => {
  const myArray:string[] = []
  for (let i = 1; i <= x; i++) {
    myArray.push(`q${i}`)
  }
  return myArray
}

const DefaultStatesPage:FC = () => (
    <Formik
      enableReinitialize
      validationSchema={Yup.object({
        states: Yup.number()
          .positive()
          .required(),
        strings: Yup.array().min(2).required(),
        finalStates: Yup.array().min(1).required(),
      })}
      initialValues={{
        states: 1,
        strings: '',
        finalStates: '',
      }}
      onSubmit={async (values, { resetForm }) => {
        console.log(values)
        // toast.success('Created Your Machine!')
        await wait(850)
        resetForm()
      }}
    >
      {({
        setFieldValue,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <Card sx={{ m: 20 }}>
          <Box sx={{ p: 3 }}>
            <CardContent>
              <Form autoComplete="off">
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <h1>NFA CONFIGURATION:</h1>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Autocomplete
                      multiple
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
                          required
                          helperText={touched.strings && errors.strings}
                          error={Boolean(touched.strings && errors.strings)}
                          {...params}
                          label="STRINGS"
                          placeholder="Strings"
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
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
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Autocomplete
                      multiple
                      onOpen={handleBlur}
                      options={getFinalStates(values.states)}
                      filterSelectedOptions
                      onChange={(e, value) => setFieldValue('finalStates',
                        value || '')}
                      renderInput={(params) => (
                        <TextField
                          onBlur={handleBlur}
                          name="finalStates"
                          required
                          helperText={touched.finalStates && errors.finalStates}
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
              </Form>

            </CardContent>
            <Box sx={{ mt: 2 }}>
              {/* @ts-ignore */}
              <Button
                onClick={handleSubmit}
                color="primary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Card>
      )}
    </Formik>
)

export { DefaultStatesPage }
