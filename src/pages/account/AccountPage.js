import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { useJwt } from 'react-jwt';
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
import PageHeader from '../../components/PageHeader'


const theme = createTheme();

const AccountPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const {user, isExpired } = useJwt(token)

      if(!user && !isExpired) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <PageHeader />
      <Container component="main" maxWidth="xs">
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
        </Box>
</Container>
    </ThemeProvider>
  )
}

export default AccountPage;