import React, { useState, createContext } from 'react';

export const UserContext = createContext({
  isLoggedIn: false,
  user: null,
  type: null,
  login: () => {},
  logout: () => {}
});

export const UserProvider = props => {
  const [userState, setUserState] = useState({
    _id: '', 
    type: '',
    username: '',
  })

  return <UserContext.Provider value={[userState, setUserState]}>
    {props.children}
  </UserContext.Provider>
}