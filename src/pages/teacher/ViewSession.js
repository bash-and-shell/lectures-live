import "../scss/Session.scss"
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext'
import { SocketContext } from '../../context/SocketContext';
import { useParams, useLocation } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import ReplayIcon from '@mui/icons-material/Replay';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DataCard from '../../components/DataCard'
import { DataGrid } from '@mui/x-data-grid'
import { useChart, useSession } from '../../hooks'
import BackButton from '../../components/BackButton'
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import ms from 'pretty-ms'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const theme = createTheme({
  palette: {
    action: {
      disabledBackground: '#e0e0e0'
    }
  }
});


const ViewSession = () => {
  const { getSession } = useSession();
  const { user } = useContext(UserContext)
  const { state } = useLocation();
  const { teacher, session } = useParams();
  const { questionList, chartOptions, chartSeries } = useChart(state.id, theme)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState({ question: null, user: null, time: null })

  const getResponse = async (params) => {
    return axios.get(`lectures/response`, { params: { id: params.id } }).catch((error) => {
      setError(error.response.data);
    }).then((response) => {
      setCurrentQuestion({ question: response.data.response.response, user: response.data.user, time: ms(params.row.col1)})
    })
  }

  const getRows = () => {
    const rows = []
    questionList.map((question, index) => {
      rows.push({
        id: question._id,
        col1: question.time,
        col2: question.question,
      })
    })

    return rows
  }

  const getColumns = () => {
    return [
      { field: 'col1', headerName: 'Time', flex: 1, renderCell: (params) => timeFormatter(params.value) },
      { field: 'col2', headerName: 'Question List', flex: 6, sortable: false },
      { field: 'col3', headerName: 'View', flex: 2, renderCell: (params) => renderCellButton(params), disableClickEventBubbling: true, },
    ]
  }

  //format here so that sorting by time works correctly
  const timeFormatter = (cell) => {
    return ms(cell)
  }

  const renderQuestionDialog = (params) => {
    getResponse(params)
    setDialogOpen(true)
  }

  const renderCellButton = (params) => {
    return (
      //return dialog with user info of who sent
      <Button onClick={() => renderQuestionDialog(params)}>View Info</Button>
    )
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
      <BackButton/>
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
          <Grid item xs={12} sx={{ height: '50%' }}>
            <Paper elevation={1} sx={{ flexGrow: 1, height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart

                  data={chartSeries}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <Legend iconType='circle' formatter={(value, entry) => { return <span style={{ color: 'black' }}>{value}</span>; }} />
                  <XAxis dataKey="time"
                    interval={10}
                  />
                  <YAxis />
                  <Tooltip />
                  <Line strokeWidth={5} dot={false} type="monotone" dataKey="Understand" stroke="#81c784" activeDot={{ r: 8 }} />
                  <Line strokeWidth={5} dot={false} type="monotone" dataKey="Confused" stroke="#fff176" activeDot={{ r: 8 }} />
                  <Line strokeWidth={5} dot={false} type="monotone" dataKey="Bored" stroke="#e0e0e0" activeDot={{ r: 8 }} />
                  <Line strokeWidth={5} dot={false} type="monotone" dataKey="Mind Blown" stroke="#e57373" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} height='50%'>
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
      <Dialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false) }}
      >
        <DialogTitle>Question Info</DialogTitle>
        <DialogContent>
          <Typography>- Asked By: {currentQuestion.user}</Typography>
          <Typography>- Content: {currentQuestion.question}</Typography>
          <Typography>- Time: {currentQuestion.time}</Typography>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}

export default ViewSession;