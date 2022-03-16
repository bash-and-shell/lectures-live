import "../scss/Session.scss"
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { deepPurple } from '@mui/material/colors';
import { styled } from '@mui/material/styles'
import SendIcon from '@mui/icons-material/Send';
import DataCard from '../../components/DataCard'

import {
  Avatar,
  Button,
  Box,
  Paper,
  TextField,
  Card,
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
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [questionValue, setQuestionValue] = useState('')
  let landscape = true;
  let questionList = ['How will i...', 'Is this correct']

  const handleSelection = (e, index) => {
    setSelectedIndex(index);
    console.log(index)
  }

  const handleSubmitQuestion = (e) => {
    e.preventDefault();

  }

  const getQuestions = (question) => {
    
    return 
            <Typography variant='body1' >
              {question}  
            </Typography>
          // </Paper>
  }

  useEffect(() => {
    if (window.innerHeight > window.innerWidth) {
      landscape = false
      return
    }
    landscape = true
  }, [window.innerWidth, window.innerHeight])

  useEffect(() => {
    getQuestions()
  }, [questionList])

  const getLayout = () => {
    if (landscape)
      return (
        <Grid container spacing={2} sx={{ height: '100vh', width: '100wh', margin: '0' }}>
          <Grid item xs={3} height="100%" sx={{ backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column', paddingTop: "2rem !important" }}>
            <Avatar sx={{ bgcolor: deepPurple[500], height: 60, width: 60, alignSelf: 'center' }}></Avatar>
            <Typography variant='h4' textAlign="center">
              Hi, username!
            </Typography>
            <Typography variant='h4' textAlign="center">
              Here is the data for lecture
            </Typography>
            <Typography variant='h4' textAlign="center">
              *lecture code*
            </Typography>
          </Grid>
          <Grid container item xs={9} spacing={2} sx={{ paddingRight: "2rem !important"}}>
            <Grid item xs={3} sx={{height: '30%'}}>
              <Paper elevation={0} sx={{ flexGrow: 1, height: '100%' }}>
                <DataCard emotion="understand" totalReactions={100} currentReactions={20} />
              </Paper>
            </Grid>
            <Grid item xs={3} sx={{height: '30%'}}>
              <Paper elevation={0} sx={{ flexGrow: 1, height: '100%' }}>
                <DataCard emotion="confused" totalReactions={100} currentReactions={60} />
              </Paper>
            </Grid>
            <Grid item xs={3} sx={{height: '30%'}}>
              <Paper elevation={0} sx={{ flexGrow: 1, height: '100%' }}>
                <DataCard emotion="bored" totalReactions={100} currentReactions={15} />
              </Paper>
            </Grid>
            <Grid item xs={3} sx={{height: '30%'}}>
              <Paper elevation={0} sx={{ flexGrow: 1, height: '100%' }}>
                <DataCard emotion="mind" totalReactions={100} currentReactions={5} />
              </Paper>
            </Grid>
            <Grid item xs={12} sx={{height: '70%'}}>
              <Paper elevation={1} sx={{ flexGrow: 1, height: '100%' }}>
                {/* {questionList.forEach((question) => {
                  console.log(question)
                  return <Paper>
                    <Typography variant="h4">
                      question  
                    </Typography>
                  </Paper>
                })} */}
                <Paper>
                    <Typography variant="h4">
                      {questionList}  
                    </Typography>
                  </Paper>
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