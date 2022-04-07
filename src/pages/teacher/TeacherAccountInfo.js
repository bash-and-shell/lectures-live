import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import BackButton from '../../components/BackButton';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { useAuth } from '../../hooks'
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material'

const theme = createTheme();

const AccountPage = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();
  const { id } = useParams()
  const [emailValid, setEmailValid] = useState(null)
  const [usernameValid, setUsernameValid] = useState(null)
  const [confirmValid, setConfirmValid] = useState(null)
  const [strongPassword, setStrongPassword] = useState(null)
  const { updateUser, logoutUser, error, setError } = useAuth()
  const [successMessage, setSuccessMessage] = useState(null)
  const handleForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!data.get('email') && !data.get('username') && !data.get('password')) {
      setError("No data entered")
      return
    }
    let updateData = {}
    if (data.get('email')) {
      setEmailValid(isEmail(data.get('email')))
      if (!emailValid)
        return
      updateData.email = data.get('email')
    }

    if (data.get('username')) {
      updateData.username = data.get('username')
    }

    if (data.get('password') && data.get('confirmPassword')) {
      if (data.get('password') !== data.get('confirmPassword')) {
        setConfirmValid(false)
        return
      }

      setStrongPassword(isStrongPassword(data.get('password')))
      if (!strongPassword)
        return

      updateData.password = data.get('password')
    }

    updateUser(updateData)

    if (!error) {
      setSuccessMessage("Account updated successfully")
    }
  }

  const passwordRequirementsText = () => {
    return <p>
      Please enter a password with at least:
      <li>8 characters</li>
      <li>1 uppercase</li>
      <li>1 lowercase</li>
      <li>1 special character</li>
    </p>
  }

  const speedDialActions = [
    { icon: <CoPresentIcon />, name: 'Join Session', onClick: () => navigate('/join') },
    { icon: <LogoutIcon />, name: 'Logout', onClick: () => logoutUser() },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item backgroundColor="primary.main" xs={12} sx={{ height: '5rem' }}>
          <BackButton sx={{ paddingLeft: '2rem' }} />
        </Grid>
        <Grid container item sx={{ justifyContent: 'center' }}>
          <Avatar id="user-icon" sx={{ bgcolor: deepPurple[500], height: 60, width: 60, alignSelf: 'center', transform: 'translateY(-25px)' }}></Avatar>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="div" >
              {id}
            </Typography>
            <Typography variant="body1" component="div">
              Update your account info here
            </Typography>
          </Grid>
          <Container maxWidth='xs'>
            <Box component="form" onSubmit={handleForm} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    error={usernameValid === false}
                    helperText={usernameValid === false ? "This username already exists" : null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    error={usernameValid === false}
                    helperText={usernameValid === false ? "This username already exists" : null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password"
                    label="New Password"
                    name="password"
                    error={strongPassword === false}
                    helperText={strongPassword === false ? passwordRequirementsText() : null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    error={confirmValid === false}
                    helperText={confirmValid === false ? "Please ensure passwords match" : null}
                  />
                </Grid>
                {error &&
                  <Grid item xs={12}>
                    <Alert severity="error">{error}</Alert>
                  </Grid>}
                {successMessage &&
                  <Grid item xs={12}>
                    <Alert severity="success">{successMessage}</Alert>
                  </Grid>}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Update Info
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default AccountPage;