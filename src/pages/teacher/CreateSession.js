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

const CreateSession = () => {
  // const { user } = useContext(UserContext)

  const user = {
    username: "dummy"
  }
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <ThemeProvider theme={theme}>
      {/* <PageHeader /> */}
      <Grid container backgroundColor="primary.main" sx={{ height: '30vh', flexDirection: 'column-reverse' }}>
        <Typography variant="h3" component="div" id='heading' >
          Create Session
        </Typography>
      </Grid>
      <Container maxWidth="xs">

        <Box component="form" onSubmit={handleSubmit} noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          maxWidth='xs'
        >
          <Grid container sx={{ textAlign: 'center', alignItems: 'center' }}>
            <Grid item xs={3}>
              <Typography>
                {user.username}/
              </Typography>

            </Grid>
            <Grid item xs={9}>
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
            </Grid>

          </Grid>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            CREATE ROOM
          </Button>
        </Box>

      </Container>
    </ThemeProvider >
  )
}

export default CreateSession;