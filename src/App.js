import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRoute from './components/UserRoute'
import { UserContext } from './context/UserContext'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import AccountPage from './pages/AccountPage'
import JoinSession from './pages/student/JoinSession'
import Session from './pages/student/Session'
import CreateSession from './pages/teacher/CreateSession'
import useCheckUser from './hooks/useCheckUser'

const App = () => {
  const { user, setUser } = useCheckUser();

  return (<UserContext.Provider value={{user, setUser}}>
  <React.Fragment>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/join" element={<JoinSession />} />
        <Route path="/create" element={<CreateSession />} />
        <Route path="/session" element={<Session />} />
        {/* <Route path='/account/:username' element={<UserRoute><AccountPage/></UserRoute>} /> */}
        {/* <Route path="/join" element={<UserRoute><JoinSession/></UserRoute>} /> */}
        {/* <Route path="/create" element={<UserRoute><CreateSession/></UserRoute>} /> */}
        {/* <Route path="/session/:session-id" element={<UserRoute><Session/></UserRoute>} /> */}
      </Routes>
    </Router>
  </React.Fragment>
  </UserContext.Provider>
  )
}

export default App