import React, { FC } from 'react'
import { Formik, Form } from 'formik'
import {
  Autocomplete,
  Box, Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from '@mui/material'
import * as Yup from 'yup'
import { wait } from '../../utils'

const DefaultStatesPage:FC = () => (
    <Formik
      validationSchema={Yup.object({
        states: Yup.number()
          .positive()
          .required(),
        strings: Yup.array().min(2).required(),
      })}
      initialValues={{
        states: 1,
        strings: '',
      }}
      onSubmit={async (values, { resetForm }) => {
        // @ts-ignore
        // values.strings = defaultStrings
        console.log(values)
        await wait(500)
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
        <Card>
          <Box sx={{ p: 3 }}>
            <CardContent>
              <Form autoComplete="off">
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
                      freeSolo
                      onOpen={handleBlur}
                      options={['0', '1', 'a', 'b', 'c']}
                      filterSelectedOptions
                      onChange={(e, value) => setFieldValue('strings',
                        value || '')}
                      // onChange={(e, newVal) => {
                      //   handleChange(newVal)
                      // }}
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
                Next
              </Button>
            </Box>
          </Box>
        </Card>
      )}
    </Formik>
)

export { DefaultStatesPage }
