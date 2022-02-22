import { createContext } from 'react';

export const UserContext = createContext({
  isLoggedIn: false,
  user: null,
  type: null,
  token: null,
  login: () => {},
  logout: () => {}
});