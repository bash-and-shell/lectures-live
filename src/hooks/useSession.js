import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export const useSession = () => {
  const navigate = useNavigate();
  const {user}  = useContext(UserContext);
  const [error, setError] = useState(null);
  //set user in context and push them to account page
  const createSession = async (title) => {
    return axios.post('lectures/createLecture', JSON.stringify({
      title,
      time: new Date().toString()
    })).then((response) =>{
      navigate(`/${user.username}/session-data/${title}`)
      console.log(response);
    }).catch((error) => {
      setError(error.response.data);
    })
  }

  const updateSession = async (title, responses) => {
    return axios.post('lectures/lecture', JSON.stringify({
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
    return axios.get('lectures/getLectures').then((response)=>{
      console.log(response);
      return response.data
    }).catch((error) => {
      setError(error.response.data);
    })
  }

  const getSession = async (id) => {
    console.log(id)

    return axios.get(`lectures/lecture`, {params: {id: id}}).catch((error) => {
      setError(error.response.data);
    }).then((response) => {
      return response.data.lecture
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
