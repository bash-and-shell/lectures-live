import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from './context/UserContext'
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import AccountPage from './pages/account/AccountPage'

let timer

const App = () => {

  const [token, setToken] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState();
  const [userId, setUserId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback((id, token, expires) => {
    setToken(token)
    setUserId(id)
    setIsLoading(false)
    const tokenExpiration = expires || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpiration(tokenExpiration)

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: id,
        token: token,
        expiration: tokenExpiration.toISOString()
      })
    );

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

  const logout = useCallback(() => {
    setTokenExpiration(null);
    setUserId(null);
    setToken(null);

    localStorage.removeItem('userData');
    
    let token = null
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

  useEffect(() => {
    if (token && tokenExpiration) {
      const timeRemaining = tokenExpiration.getTime() - new Date().getTime();
      timer = setTimeout(logout, timeRemaining);
    } 
    else {
      clearTimeout(timer);
    }
  }, [token, logout, tokenExpiration]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    setIsLoading(false)
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);


  return (<UserContext.Provider
     value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}>
  <React.Fragment>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  </React.Fragment>
  </UserContext.Provider>
  )
}

export default App