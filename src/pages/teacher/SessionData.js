import "../scss/Session.scss"
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext'
import { SocketContext } from '../../context/SocketContext';
import { useNavigate, useParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import ReplayIcon from '@mui/icons-material/Replay';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DataCard from '../../components/DataCard'
import { DataGrid } from '@mui/x-data-grid'
import { JoinDialog, EndDialog } from '../../components'
import { useSession, useSockets } from '../../hooks'
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
} from '@mui/material'


const theme = createTheme({
  palette: {
    action: {
      disabledBackground: '#e0e0e0'
    }
  }
});


const SessionData = () => {
  const { user } = useContext(UserContext)
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate();
  const { teacher, session } = useParams();
  const [feelings, setFeelings] = useState({
    'understand': 0,
    'confused': 0,
    'bored': 0,
    'mind blown': 0,
    'total': 0
  })
  const [questionList, setQuestionList] = useState([])
  const [sessionData, setSessionData] = useState([])
  const { updateSession } = useSession();

  let landscape = true;

  const room = `${teacher}/${session}`

  //join room
  useSockets(room)

  // add socket listeners for receiving a response
  useEffect(() => {
    socket.on('receiveResponse', (response) => {
      // handle question
      if (response.response_type === 'question') {
        setQuestionList((currentList) => {
          return ([...currentList, {
            username: response.username,
            question: response.response
          }])
        })
      }

      setSessionData((currentList) => {
        return ([{
          user_id: response.user_id,
          response_type: response.response_type,
          response: response.response,
          time: response.time
        }, ...currentList])
      })
    })
  }, [])

  //When session data updates update feelings
  useEffect(() => {
    if(sessionData === [])
      return

    let response = sessionData[0]
    if(!response)
      return

    if (response.response_type === 'feeling') {
      let total
      let feelingChange
      let updateResponse
      //check to see if user has previously submitted response
      if (sessionData.slice(1).some((s) => {
        if ((s.response_type === 'feeling' && s.user_id === response.user_id)) {
          feelingChange = s.response
          console.log(feelingChange)
          return true
        }
        return false
      })) {
        //if they have, change totals to reflect this by removing old and replacing with new feeling
        updateResponse = {
          [response.response]: feelings[response.response]++,
          [feelingChange]: feelings[feelingChange]--,
          total: feelings.total
        }
      }
      else {
        //else add new feeling 
        updateResponse = {
          [response.response]: feelings[response.response]++,
          total: feelings.total++
        }
      }

      setFeelings(feelings => ({
        ...feelings,
        updateResponse
      }))

      console.log(feelings)
    }
  }, [sessionData])

  const handleResetFeelings = () => {
    setFeelings({
      'understand': 0,
      'confused': 0,
      'bored': 0,
      'mind blown': 0,
      'total': 0
    })
  }

  const handleResetQuestions = () => {
    setQuestionList([])
  }

  const handleSaveSession = () => {
    updateSession(session, sessionData)
    navigate(`/account/teacher/${user.username}`)
  }

  const getRows = () => {
    const rows = []
    questionList.map((question, index) => {
      rows.push({
        id: index,
        col1: question.username,
        col2: question.question
      })
    })

    return rows
  }

  const getColumns = () => {
    return [
      { field: 'col1', headerName: 'From', flex: 1 },
      { field: 'col2', headerName: 'Question List', flex: 6 },
    ]
  }

  const NoRowsOverlay = () => {
    return (
      <Container sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <QuestionAnswerIcon sx={{ fontSize: 100, color: theme.palette.grey[400] }} />
        <Typography variant="body1">No questions submitted</Typography>
      </Container>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} sx={{ position: 'fixed', top: 0, bottom: 0 }}>
        <Grid item xs={3} height="100%" sx={{ backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column', paddingTop: "2rem !important" }}>
          <Avatar sx={{ bgcolor: deepPurple[500], height: 60, width: 60, alignSelf: 'center' }}></Avatar>
          <Typography variant='h4' textAlign="center">
            Hi, username!
          </Typography>
          <Typography variant='h4' textAlign="center">
            Here is the data for lecture
          </Typography>
          <Typography variant='h4' textAlign="center">
            *lecture name*
          </Typography>
        </Grid>
        <Grid container item xs={9} spacing={2} sx={{ marginTop: '0rem', paddingBottom: '1rem', paddingRight: "2rem !important" }}>
          <Grid item xs={3} sx={{ height: '30%' }}>
            <Paper elevation={0} sx={{ flexGrow: 1, height: '100%' }}>
              <DataCard emotion="understand" reactions={feelings} />
            </Paper>
          </Grid>
          <Grid item xs={3} sx={{ height: '30%' }}>
            <Paper elevation={0} sx={{ flexGrow: 1, height: '100%' }}>
              <DataCard emotion="confused" reactions={feelings} />
            </Paper>
          </Grid>
          <Grid item xs={3} sx={{ height: '30%' }}>
            <Paper elevation={0} sx={{ flexGrow: 1, height: '100%' }}>
              <DataCard emotion="bored" reactions={feelings} />
            </Paper>
          </Grid>
          <Grid item xs={3} sx={{ height: '30%' }}>
            <Paper elevation={0} sx={{ flexGrow: 1, height: '100%' }}>
              <DataCard emotion="mind blown" reactions={feelings} />
            </Paper>
          </Grid>
          <Grid item xs={3} sx={{ height: '10%' }}>
            <JoinDialog room={room} />
          </Grid>
          <Grid item xs={3} sx={{ height: '10%' }}>
            <Button
              variant="contained" endIcon={<ReplayIcon />}
              onClick={handleResetFeelings} fullWidth
              sx={{ height: '100%' }}
            >
              Clear Feelings
            </Button>
          </Grid>
          <Grid item xs={3} sx={{ height: '10%' }}>
            <Button
              variant="contained" endIcon={<ReplayIcon />}
              onClick={handleResetQuestions} fullWidth
              sx={{ height: '100%' }}
            >
              Clear Questions
            </Button>
          </Grid>
          <Grid item xs={3} sx={{ height: '10%' }}>
            <EndDialog handleSaveSession={handleSaveSession} />
          </Grid>
          <Grid container item xs={12} sx={{ height: '60%' }}>
            <Paper elevation={1} sx={{ flexGrow: 1, height: '100%' }}>
              <DataGrid
                rows={getRows()}
                columns={getColumns()}
                components={{
                  NoRowsOverlay: NoRowsOverlay
                }}
                hideFooter
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default SessionData;