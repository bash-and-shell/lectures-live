import "../scss/Session.scss"
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext'
import { SocketContext } from '../../context/SocketContext';
import { useNavigate, useParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid'
import { SessionDialog } from '../../components'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddIcon from '@mui/icons-material/Add';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSession, useAuth } from '../../hooks'
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
} from '@mui/material'
import BackButton from "../../components/BackButton";

const theme = createTheme({
  palette: {
    action: {
      disabledBackground: '#e0e0e0'
    }
  }
});

const TeacherAccountPage = () => {
  const { user, isLoading } = useContext(UserContext)
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate();
  const { id } = useParams();

  const [rows, setRows] = useState([])
  const { listSessions, getSession } = useSession()
  const { logoutUser } = useAuth()

  useEffect(() => {
    const fetchSessions = async () => {
      const table = []
      const sessions = await listSessions()
  
      sessions.map((session) => {
        table.push({
          id: session._id,
          col1: session.title,
          col2: new Date(session.time).toLocaleDateString()
        })
      })
      
      setRows(table)
    }

    fetchSessions()
  }, [])

  const renderCellButton = (params) => {
    console.log(params)
    return (
        <Button onClick={()=>{navigate(`/${user.username}/view-session/${params.row.col1}`, {replace: true, state: {id: params.id}})}}>View</Button>
     )
  }
 
  const getColumns = () => {
    return [
      { field: 'col1', headerName: 'Session Title', flex: 4 },
      { field: 'col2', headerName: 'Date', flex: 4 },
      { field: 'col3', headerName: 'View', flex: 2, renderCell: renderCellButton, disableClickEventBubbling: true, },
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
        <SchoolOutlinedIcon sx={{ fontSize: 100, color: theme.palette.grey[400] }} />
        <Typography variant="body1">No lectures saved</Typography>
      </Container>
    )
  }
  
  return (
    <ThemeProvider theme={theme}>
      <BackButton/>
        <Grid container spacing={2} sx={{ position: 'fixed', top: 0, bottom: 0 }}>
          <Grid item xs={3} height="100%" sx={{ backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column', paddingTop: "4rem !important" }}>
            <Avatar sx={{ bgcolor: deepPurple[500], height: 60, width: 60, alignSelf: 'center' }}></Avatar>
            <Typography variant='h4' textAlign="center" color='white'>
              Hi, {id}!
            </Typography>
            <Typography variant='h4' textAlign="center" color='white'>
              Welcome to your account page
            </Typography>
          </Grid>
          <Grid container item xs={9} spacing={2} sx={{ marginTop: '0rem', paddingBottom: '1rem', paddingRight: "2rem !important" }}>
          <Grid item xs={4} sx={{ height: '30%' }}>
            <Button fullWidth sx={{height:'100%', display: 'flex', flexDirection: 'column'}} variant="outlined" onClick={() => {navigate(`/${user.username}/create`)}}>
            <AddIcon color='primary'/>
              Create Session
            </Button>
          </Grid>
          <Grid item xs={4} sx={{ height: '30%' }}>
            <Button fullWidth sx={{height:'100%', display: 'flex', flexDirection: 'column'}} variant="outlined" onClick={() => {navigate(`info`)}}>
            <ManageAccountsIcon color='primary'/>
              Account Info
            </Button>
          </Grid>
          <Grid item xs={4} sx={{ height: '30%' }}>
            <Button fullWidth sx={{height:'100%', display: 'flex', flexDirection: 'column'}} variant="outlined" onClick={() => {logoutUser()}}>
            <LogoutIcon color='primary'/>
              Sign Out
            </Button>
          </Grid>
          <Grid container item xs={12} sx={{ height: '70%' }}>
            <Paper elevation={1} sx={{ flexGrow: 1, height: '100%' }}>
              <DataGrid
                rows={rows}
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

export default TeacherAccountPage;