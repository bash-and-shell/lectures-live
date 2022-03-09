import "../scss/Session.scss"
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
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
import { deepPurple } from '@mui/material/colors';
import { styled } from '@mui/material/styles'
import SendIcon from '@mui/icons-material/Send';


const theme = createTheme({
  palette: {
    action: {
      disabledBackground: '#e0e0e0'
    }
  }
});


const Session = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [questionValue, setQuestionValue] = useState('')
  const handleSelection = (e, index) => {
    setSelectedIndex(index);
    console.log(index)
  }

  const handleSubmitQuestion = (e) => {
    e.preventDefault();

  }

  return (
    <ThemeProvider theme={theme}>
      {/* <PageHeader /> */}
      <Grid container backgroundColor="primary.main" sx={{ height: '30vh', flexDirection: 'column-reverse' }}>
        <Typography variant="h4" component="div" id='heading'>
          How are you feeling in this lecture?
        </Typography>
        <Typography variant="h4" component="div" id='heading'>
          Hi username!
        </Typography>
        <Avatar sx={{ bgcolor: deepPurple[500], height: 60, width: 60, alignSelf: 'center' }}></Avatar>

      </Grid>
      <Container maxWidth="xs" >
        <Grid container marginTop="0.25rem" spacing={2} >
          <Grid item xs={6}>
            <Paper
              elevation={selectedIndex === 0 ? 8 : 1}
              className={`item ${selectedIndex === 0 ? 'item--selected' : ''}`}
              onClick={e => handleSelection(e, 0)}
            >
              <Typography variant="h1" component="div" align="center">😁</Typography>
              <Typography variant="h5" component="div" align="center">Understand</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={selectedIndex === 1 ? 8 : 1}
              className={`item ${selectedIndex === 1 ? 'item--selected' : ''}`}
              onClick={e => handleSelection(e, 1)}
            >
              <Typography variant="h1" component="div" align="center">🤔</Typography>
              <Typography variant="h5" component="div" align="center">Confused</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={selectedIndex === 2 ? 8 : 1}
              className={`item ${selectedIndex === 2 ? 'item--selected' : ''}`}
              onClick={e => handleSelection(e, 2)}
            >
              <Typography variant="h1" component="div" align="center">😴</Typography>
              <Typography variant="h5" component="div" align="center">Bored</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={selectedIndex === 3 ? 8 : 1}
              className={`item ${selectedIndex === 3 ? 'item--selected' : ''}`}
              onClick={e => handleSelection(e, 3)}
            >
              <Typography variant="h1" component="div" align="center">🤯</Typography>
              <Typography variant="h5" component="div" align="center">Mind Blown</Typography>
            </Paper>
          </Grid>
        </Grid>

      </Container>
      <Box component='form' onSubmit={handleSubmitQuestion} className="question-box"
        sx={{
          borderTop: `1px solid ${theme.palette.primary.main}`,
          backgroundColor: 'white',
          display: 'inline-flex',
          alignItems: 'flex-end',
          gap: '1rem'
        }}>
        <TextField
          variant='outlined'
          label="Send a question"
          name='question'
          value={questionValue}
          onChange={e => setQuestionValue(e.target.value)}
          fullWidth
          multiline
          // sx={{ backgroundColor: 'primary.main', opacity: [0.9, 0.8, 0.7] }}
        />
        <Button
          type="submit"
          variant="contained"
          className="submit-question"
          endIcon={<SendIcon />}
          disabled={questionValue === ''}
          sx={{ backgroundColor: 'primary.light', height: '3.5rem'}}
        >
          Send
        </Button>
      </Box>
    </ThemeProvider>
  )
}

export default Session;