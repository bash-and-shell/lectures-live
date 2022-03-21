import '../scss/AccountPage.scss'
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../../components/PageHeader'
import { deepPurple } from '@mui/material/colors';


const theme = createTheme();

const AccountPage = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();
  const [emailValid, setEmailValid] = useState(null)
  const [usernameValid, setUsernameValid] = useState(null)

  const handleChangeEmail = (e) => {
    e.preventDefault();
  }

  const handleChangeUsername = (e) => {
    e.preventDefault();
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <PageHeader /> */}
      <Container disableGutters>
        <Grid container spacing={2}>
          <Grid backgroundColor="primary.main" xs={12} sx={{ height: '30vh' }}>
          </Grid>
          <Grid container sx={{ justifyContent: 'center' }}>
            <Avatar id="user-icon" sx={{ bgcolor: deepPurple[500], height: 60, width: 60, alignSelf: 'center' }}></Avatar>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography variant="h5" component="div" id='heading' >
                *username*
              </Typography>
              <Typography variant="body1" component="div">
                Update your account info here
              </Typography>
            </Grid>
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
        <Fab variant='extended' color='primary' id='fab-join' onClick={() => navigate('/join')}>
          Join Session
        </Fab>
      </Container>
    </ThemeProvider>
  )
}

export default AccountPage;