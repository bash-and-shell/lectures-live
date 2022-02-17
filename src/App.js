import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/login/login'
import Register from './pages/register/register'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import AccountPage from './pages/account/AccountPage'

const App = () => {
  return  <React.Fragment>
    <Router>
      <Routes>
        <Route path="/login"  element={<Login />}/> 
        <Route path="/register"  element={<Register />}/>
        <Route path="/forgot-password"  element={<ForgotPassword />}/>  
        <Route path="/account"  element={<AccountPage />}/>                                                      
      </Routes>
    </Router>
  </React.Fragment>
}

export default App