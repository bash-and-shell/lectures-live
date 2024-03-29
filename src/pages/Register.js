import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
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
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { useAuth } from '../hooks'
import BackButton from '../components/BackButton';

const theme = createTheme();

const SignUp = () => {

  const navigate = useNavigate();

  const userTypes = ["Student", "Teacher"]
  const [value, setValue] = useState(userTypes[0])
  const [inputValue, setInputValue] = useState(userTypes[0])
  const [emailValid, setEmailValid] = useState(null)
  const [strongPassword, setStrongPassword] = useState(null)
  const [usernameValid, setUsernameValid] = useState(null)
  const { registerUser, error } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setEmailValid(isEmail(data.get('email')))
    setStrongPassword(isStrongPassword(data.get('password')))

    if (emailValid && strongPassword) {
      console.log("here");

      registerUser(
        data.get('email'),
        data.get('username'),
        data.get('password'),
        value.toLowerCase()
      )
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


  return (
    <ThemeProvider theme={theme}>
      <BackButton/>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailValid === false}
                  helperText={emailValid === false ? "Please enter a valid email address." : null}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={strongPassword === false}
                  helperText={strongPassword === false ? passwordRequirementsText() : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password-confirm"
                  label="Confirm Password"
                  type="password"
                  id="password-confirm"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  required
                  disablePortal
                  id="user-type"
                  options={userTypes}
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="I am a..." />}
                />
              </Grid>
              {error &&
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => navigate('/login')} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp