import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const TeacherRoute = ({children}) => {
  const { user } = useContext(UserContext);

  return user && user.type == 'teacher' ? children : <Navigate to='/login' />
}

export default TeacherRoute;