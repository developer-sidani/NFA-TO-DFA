import React, { FC } from 'react'
import {
  Box, Button, Container, Typography, useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import ErrorImage from './error.svg'

const NotFoundPage:FC = () => {
  const theme = useTheme()
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          flexGrow: 1,
          py: '80px',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            align="center"
            variant={mobileDevice ? 'h4' : 'h2'}
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color="textSecondary"
            sx={{ mt: 0.5 }}
            variant="subtitle2"
          >
            You either tried some shady route or you
            came here by mistake. Whichever it is, try using the
            navigation.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Box
              alt="Under development"
              component="img"
              src={ErrorImage}
              sx={{
                height: 'auto',
                maxWidth: '100%',
                width: 400,
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Link
              to="/"
              style={{ textDecoration: 'none' }}
            >
              <Button
                component="a"
                variant="outlined"
              >
                Back to HomePage
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export { NotFoundPage }
