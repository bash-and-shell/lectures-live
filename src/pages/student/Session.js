import "../scss/Session.scss"
import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext'
import { useParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import { 
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { useSockets } from '../../hooks'
import BackButton from '../../components/BackButton'

const theme = createTheme({
  palette: {
    action: {
      disabledBackground: '#e0e0e0'
    }
  }
});

const Session = () => {
  const { user } = useContext(UserContext)
  const { teacher, session } = useParams();
  const { sendResponse } = useSockets(`${teacher}/${session}`)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [questionValue, setQuestionValue] = useState('')
  const responses = ['understand', 'confused', 'bored', 'mind blown']

  const handleSelection = (e, index) => {
    if (selectedIndex === index) {
      return
    }
    setSelectedIndex(index);
    const response = {
      user_id: user.id,
      username: user.username,
      response_type: 'feeling',
      response: responses[index],
      time: new Date().toString()
    }

    sendResponse(response)
  }

  const handleSubmitQuestion = (e) => {
    e.preventDefault();

    const response = {
      user_id: user.id,
      username: user.username,
      response_type: 'question',
      response: questionValue,
      time: new Date().toString()
    }

    sendResponse(response)
    setQuestionValue('')
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} sx={{ position: 'fixed', top: '0', bottom: '0', alignContent: 'flex-start' }}>
        <Grid container item backgroundColor="primary.main" sx={{ height: '30%', flexDirection: 'column-reverse' }}>
          <BackButton />
          <Typography variant="h4" component="div" id='heading'>
            How are you feeling in this lecture?
            {session}
          </Typography>
          <Typography variant="h4" component="div" id='heading'>
            Hi username!
          </Typography>
          <Avatar sx={{ bgcolor: deepPurple[500], height: 60, width: 60, alignSelf: 'center' }}></Avatar>

        </Grid>
        <Grid container item marginTop="1rem" sx={{ paddingBottom: '0.25rem' }}>
          <Container maxWidth="xs"  >
            <Grid container item spacing={2} >
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
          <Grid item xs={12} sx={{ alignSelf: 'flex-end', paddingTop: '1rem' }}>
            <Box component='form' onSubmit={handleSubmitQuestion} className='question-form'
              sx={{
                borderTop: `1px solid ${theme.palette.primary.main}`,
                backgroundColor: 'white',
                display: 'inline-flex',
                alignItems: 'flex-end',
                gap: '1rem',
                position: 'fixed',
                bottom: 0,
                boxSizing: 'border-box',
                zIndex: 100,
                width: '100%',
                padding: '0.5rem'
              }}>
              <TextField
                variant='outlined'
                label="Send a question"
                name='question'
                value={questionValue}
                onChange={e => setQuestionValue(e.target.value)}
                fullWidth
                multiline
              />
              <Button
                type="submit"
                variant="contained"
                className="submit-question"
                endIcon={<SendIcon />}
                disabled={questionValue === ''}
                sx={{ backgroundColor: 'primary.light', height: '3.5rem' }}
              >
                Send
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Session;