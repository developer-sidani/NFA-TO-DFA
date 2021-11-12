import React, { FC } from 'react'
import { Formik } from 'formik'
import {
  Autocomplete,
  Button,
  Card, CardActions,
  CardContent, CardHeader, Divider,
  Grid,
  TextField,
} from '@mui/material'
import * as Yup from 'yup'
import { toast } from 'react-hot-toast'
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
        strings: [],
        finalStates: [],
      }}
      onSubmit={async (values, { resetForm, setStatus, setSubmitting }) => {
        console.log(values)
        await wait(870)
        toast.success('ok')
        setStatus({ success: true })
        setSubmitting(false)
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
        <form autoComplete="off" onSubmit={handleSubmit}>
        <Card sx={{ mt: 20, mx: 5 }}>
          <CardHeader title="NFA Configuration" />
          <Divider />
            <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={6}
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
                      value={values.finalStates}
                      filterSelectedOptions
                      onChange={(e, value) => setFieldValue('finalStates',
                        value || '')}
                      renderInput={(params) => (
                        <TextField
                          onBlur={handleBlur}
                          name="finalStates"
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
                <CardActions
                  sx={{
                    flexWrap: 'wrap',
                    m: -1,
                  }}
                >
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    sx={{ m: 1 }}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </CardActions>

            </CardContent>
        </Card>
        </form>
      )}
    </Formik>
)

export { DefaultStatesPage }
