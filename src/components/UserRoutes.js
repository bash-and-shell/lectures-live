import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const StudentRoute = ({children}) => {
  const { user } = useContext(UserContext);

  return user && user.type == 'student' ? children : <Navigate to='/login' />
}

export const TeacherRoute = ({children}) => {
  const { user } = useContext(UserContext);

  return user && user.type == 'teacher' ? children : <Navigate to='/login' />
}
