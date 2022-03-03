import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRoute from './components/UserRoute'
import { UserContext } from './context/UserContext'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import AccountPage from './pages/AccountPage'
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
        <Route path="/account" element={<UserRoute><AccountPage/></UserRoute>} />
      </Routes>
    </Router>
  </React.Fragment>
  </UserContext.Provider>
  )
}

export default App