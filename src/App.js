import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/login/login'
import Register from './pages/register/register'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'

const App = () => {
  return  <React.Fragment>
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />}/>
        <Route path="/register" exact element={<Register />}/>
        <Route path="/forgot-password" exact element={<ForgotPassword />}/>                            
      </Routes>
    </Router>,
  </React.Fragment>
}

export default App