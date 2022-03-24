import "../scss/Session.scss"
import React, { useEffect, useState, useContext } from 'react';
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
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
} from '@mui/material'

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
  const [questionList, setQuestionList] = useState([])
  const { sessionData, chartOptions, chartSeries } = useChart(state.id, theme)

  const feelings =  {
    'understand': 0,
    'confused': 0,
    'bored': 0,
    'mind blown': 0,
    'total': 0,
  }

  useEffect(() => {
    console.log(chartSeries)
  }, [chartSeries])
  
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
          {/* <Grid item xs={3} sx={{ height: '30%' }}>
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
          </Grid> */}
          <Grid item xs={12} sx={{ height: '55%' }}>
            <Paper elevation={1} sx={{ flexGrow: 1, height: '100%' }}>
              {/* <DataGrid
                rows={getRows()}
                columns={getColumns()}
                components={{
                  NoRowsOverlay: NoRowsOverlay
                }}
                hideFooter
              /> */}
              {/* <Chart
                type='line'
                options={chartOptions}
                series={chartSeries}
              /> */}
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
                    <Legend iconType='circle' formatter={(value, entry) => {return <span style={{color: 'black'}}>{value}</span>;}}/>

          <XAxis dataKey="time" 
          interval={10}
          // ticks={['1m']}
          // allowDuplicatedCategory={false}

          // tickFormatter = {(time) => {
          //   const t = new Date(time)

          //   return (t.getHours() - 1)+ ':' + t.getMinutes()
          // }}
          />
          <YAxis />
          <Tooltip />
          <Line strokeWidth={5} dot={false} type="monotone" dataKey="Understand" stroke="#81c784" activeDot={{ r: 8 }} />
          <Line strokeWidth={5} dot={false} type="monotone" dataKey="Confused" stroke="#fff176" activeDot={{ r: 8 }}/>
          <Line strokeWidth={5} dot={false} type="monotone" dataKey="Bored" stroke="#e0e0e0" activeDot={{ r: 8 }}/>
          <Line strokeWidth={5} dot={false} type="monotone" dataKey="Mind Blown" stroke="#e57373" activeDot={{ r: 8 }}/>
        </LineChart>
      </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default ViewSession;