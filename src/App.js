import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import TeacherRoute from './components/TeacherRoute'
import StudentRoute from './components/StudentRoute'
import { UserContext } from './context/UserContext'
import { SocketContext, socket } from './context/SocketContext'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import StudentAccountPage from './pages/student/StudentAccountPage'
import TeacherAccountPage from './pages/teacher/TeacherAccountPage'
import JoinSession from './pages/student/JoinSession'
import Session from './pages/student/Session'
import CreateSession from './pages/teacher/CreateSession'
import SessionData from './pages/teacher/SessionData'
import ViewSession from './pages/teacher/ViewSession'
import TeacherAccountInfo from './pages/teacher/TeacherAccountInfo'
import {useCheckUser} from './hooks'

const App = () => {
  const { user, setUser } = useCheckUser();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SocketContext.Provider value={{socket}}>
        <React.Fragment>
          <Router>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="account/student/:id" element={<StudentRoute><StudentAccountPage /></StudentRoute>} />
              <Route path="account/teacher/:id" element={<TeacherRoute><TeacherAccountPage /></TeacherRoute>} />
              <Route path="account/teacher/:id/info" element={<TeacherRoute><TeacherAccountInfo /></TeacherRoute>} />
              <Route path="join" element={<StudentRoute><JoinSession /></StudentRoute>} />
              <Route path=":teacher/create" element={<TeacherRoute><CreateSession /></TeacherRoute>} />
              <Route path="session/:teacher/:session" element={<TeacherRoute><Session /></TeacherRoute>} />
              <Route path=":teacher/session-data/:session" element={<TeacherRoute><SessionData /></TeacherRoute>} />
              <Route path=":teacher/session-data/:session" element={<TeacherRoute><SessionData /></TeacherRoute>} />
              <Route path=":teacher/view-session/:session" element={<TeacherRoute><ViewSession /></TeacherRoute>} />
              {/* <Route path="account/student/:id" element={<StudentAccountPage />} />
              <Route path="account/teacher/:id" element={<TeacherAccountPage />} />
              <Route path="join" element={<JoinSession />} />
              <Route path=":teacher/create" element={<CreateSession />} />
              <Route path="session/:teacher/:session" element={<Session />} />
              <Route path=":teacher/session-data/:session" element={<SessionData />} />
              <Route path=":teacher/session-data/:session" element={<SessionData />} />
              <Route path=":teacher/view-session/:session" element={<ViewSession />} /> */}
            </Routes>
          </Router>
        </React.Fragment>
      </SocketContext.Provider>
    </UserContext.Provider>
  )
}

export default App