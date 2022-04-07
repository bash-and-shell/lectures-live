import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const StudentRoute = ({children}) => {
  const { user } = useContext(UserContext);

  return user && user.type == 'student' ? children : <Navigate to='/login' />
}

export default StudentRoute;