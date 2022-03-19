import "../scss/Session.scss"
import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from "prop-types";
import { UserContext } from '../../context/UserContext'
import { SocketContext } from '../../context/SocketContext';
import useSockets from '../../hooks/useSockets'
import { useNavigate, useParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { deepPurple } from '@mui/material/colors';
import { styled } from '@mui/material/styles'
import SendIcon from '@mui/icons-material/Send';
import DataCard from '../../components/DataCard'
import { VariableSizeList } from 'react-window';
import { DataGrid } from '@mui/x-data-grid'
import {
  Avatar,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
  Card,
  Typography,
  Container,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText
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
  const { session } = useParams();
  const [feelings, setFeelings] = useState({
    'understand': 0,
    'confused': 0,
    'bored': 0,
    'mind blown': 0,
    'total': 0
  })
  const [questionList, setQuestionList] = useState([{username: 'dummy', question: 'hi'}, {username: 'dummy', question: 'hi'}])
  const [showDialog, setShowDialog] = useState(false)
  let landscape = true;
  let sessionData = []


  // const room = `${user.username}/${session}`
  const room = `dummy/${session}`

  useSockets(room)

  useEffect(() => {
    socket.on('receiveResponse', (response) => {
      sessionData.push({
        user_id: response.user_id,
        response_type: response.response_type,
        response: response.response,
        time: response.time
      })

      if (response.response_type === 'feeling') {
        let updateResponse = {
          [response.response]: feelings[response.response]++,
          total: feelings.total++
        }
        setFeelings(feelings => ({
          ...feelings,
          updateResponse
        }))
      }

      if (response.response_type === 'question') {
        setQuestionList((currentList) => {
          return ([...currentList, {
            username: response.username,
            question: response.response
          }])
          })
      }
    })

  }, [])

  useEffect(() => {
    if (window.innerHeight > window.innerWidth) {
      landscape = false
      return
    }
    landscape = true
  }, [window.innerWidth, window.innerHeight])

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
      { field: 'col1', headerName: 'From', flex:1 },
      { field: 'col2', headerName: 'Question List', flex:6 },
    ]
  }

  const getLayout = () => {
    if (landscape)
      return (
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
            <Typography variant='h4' textAlign="center" onClick={() => { navigate('/account') }}>
              Click here to display join info
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
            <Grid container item xs={12} sx={{ height: '70%' }}>
              <Paper elevation={1} sx={{ flexGrow: 1, height: '100%' }}>
              {/* <Grid container item xs={12} sx={{ height: '100%', flexDirection: 'column-reverse' }}>
                {questionList.map((question) => {
                  return (
                    <Grid item >
                      <Paper elevation={2}>
                        <Typography variant="h4">{question}</Typography>
                      </Paper>
                    </Grid>
                  )
                })}
                </ Grid> */}
                <DataGrid rows={getRows()} columns={getColumns()}/>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      )
    //     return (<React.Fragment>
    // <Grid container xs={12} sx={{ height: 'fit-content', backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column', paddingTop: "2rem !important"}}>
    //             <Avatar sx={{ bgcolor: deepPurple[500], height: 60, width: 60, alignSelf: 'center' }}></Avatar>
    //             <Typography variant='h4' textAlign="center">
    //               Hi, username!
    //             </Typography>
    //             <Typography variant='h4' textAlign="center">
    //               Here is the data for lecture
    //             </Typography>
    //             <Typography variant='h4' textAlign="center">
    //               *lecture code*
    //             </Typography>
    //           </Grid>
    //           <Grid container xs={9} spacing={2} sx={{ paddingRight: "2rem !important" }}>
    //             <Grid item xs={3} >
    //               <Paper elevation={0} sx={{ flexGrow: 1, height: "30%" }}>
    //                 <DataCard emotion="understand" totalReactions={100} currentReactions={20} />
    //               </Paper>
    //             </Grid>
    //             <Grid item xs={3} >
    //               <Paper elevation={0} sx={{ flexGrow: 1, height: "30%" }}>
    //                 <DataCard emotion="confused" totalReactions={100} currentReactions={60} />
    //               </Paper>
    //             </Grid>
    //             <Grid item xs={3} >
    //               <Paper elevation={0} sx={{ flexGrow: 1, height: "30%" }}>
    //                 <DataCard emotion="bored" totalReactions={100} currentReactions={15} />
    //               </Paper>
    //             </Grid>
    //             <Grid item xs={3} >
    //               <Paper elevation={0} sx={{ flexGrow: 1, height: "30%" }}>
    //                 <DataCard emotion="mind" totalReactions={100} currentReactions={5} />
    //               </Paper>
    //             </Grid>
    //           </Grid>
    //     </React.Fragment>

    //     )
  }


  return (
    <ThemeProvider theme={theme}>
      {getLayout()}
    </ThemeProvider>
  )
}

export default SessionData;