import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export const useSession = () => {
  const navigate = useNavigate();
  const {user}  = useContext(UserContext);
  const [error, setError] = useState(null);
  //set user in context and push them to account page
  const createSession = async (title) => {
    return await axios.post('lectures/createLecture', JSON.stringify({
      user_id: user.id,
      title,
      time: new Date().getTime()
    })).then((response) =>{
      navigate('/session-data')
      console.log(response);
    }).catch((error) => {
      setError(error.response.data);
    })
  }

  const updateSession = async (title, responses) => {
    return await axios.post('lectures/lecture', JSON.stringify({
      user_id: user.id,
      title: title,
      responses: responses
    })).then((response) => {
      console.log(response);
    }).catch((error) => {
      setError(error.response.data);
    })
  }

  const listSessions = async () => {
    return await axios.get('lectures/getLectures', JSON.stringify({
      user_id: user.id
    })).catch((error) => {
      setError(error.response.data);
    })
  }

  const getSession = async (id) => {
    return await axios.get('lectures/lecture', JSON.stringify({
      id: id
    })).catch((error) => {
      setError(error.response.data);
    })
  }

  return {
    createSession,
    updateSession,
    listSessions,
    getSession,
    error
  }
}
