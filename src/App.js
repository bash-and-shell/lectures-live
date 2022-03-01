import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from './context/UserContext'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import AccountPage from './pages/AccountPage'

let timer

const App = () => {

  const [tokenExpiration, setTokenExpiration] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((id, username, userType, expires) => {
    setUserId(id)
    const tokenExpiration = expires || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpiration(tokenExpiration)

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: id,
        username: username,
        type: userType,
        expiration: tokenExpiration.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setTokenExpiration(null);
    setUserId(null);
    setToken(null);

    localStorage.removeItem('userData');
    
    let token = null
    
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