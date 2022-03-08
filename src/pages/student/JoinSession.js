import "../scss/JoinSession.scss"
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';


const theme = createTheme();

const JoinSession = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <ThemeProvider theme={theme}>
      {/* <PageHeader /> */}
        <Grid container backgroundColor="primary.main" sx={{ height: '30vh', flexDirection: 'column-reverse' }}>
          <Typography variant="h3" component="div" id='heading' >
            Join Session
          </Typography>
        </Grid>
        <Container maxWidth="xs">
        <Grid container>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Box component="form" onSubmit={handleSubmit} noValidate 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            maxWidth='xs'
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label="Enter Room Code"
                name="code"
                autoFocus
              // error={isValidUser === false}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                JOIN
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* <Box backgroundColor="primary.main"
          sx={{
            height: '30vh',
            // flexGrow: 4,
            // marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
          }}
        >
        </Box>
        <Box 
        sx={{
          height: '70vh',
          flexGrow: 6,
          // marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <Avatar id="user-icon" sx={{ bgcolor: deepPurple[500], height: 60, width: 60 }}></Avatar>

        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Typography variant="h5" component="div" id='heading'>
            *username*
          </Typography>
          </Grid>
          <Grid item xs={12}>

          <Typography variant="body1" component="div">
           Change your account info here
          </Typography>

          </Grid>

          <Grid item xs={12}>

          <Box component="form" onSubmit={handleChangeUsername} noValidate sx={{ mt: 1 }}>
          <Typography variant="body1" component="div">
           Username
          </Typography>
          <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  error={usernameValid === false}
                  helperText={usernameValid === false ? "This username already exists" : null}
                />
          </Box>
          </Grid>

            //TODO: Have account options on page -> change username, password etc.

            //TODO: Show stats for teachers



            //TODO: Floating button to join session


          }
        </Grid>
        </Box> */}
      </Container>
    </ThemeProvider>
  )
}

export default JoinSession;