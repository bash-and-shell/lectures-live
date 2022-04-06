import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export const useAuth = () => {
  const navigate = useNavigate();
  const {setUser}  = useContext(UserContext);
  const [error, setError] = useState(null);

  //set user in context and push them to account page
  const setUserContext = () => {
    axios.get('/users/checkUser').then(res => {
      setUser(res.data.currentUser);
      navigate(`/account/${res.data.currentUser.type}/${res.data.currentUser.username}`)
    }).catch((err) => {
      setError(err.response.data);
      navigate('/login')
    })
  }

   //set user in context and push them to account page
   const checkUser = () => {
    axios.get('/users/checkUser').then(res => {
      setUser(res.data.currentUser);
      navigate(`/account/${res.data.currentUser.type}/${res.data.currentUser.username}`)
    })
  }

  //register user
  const registerUser = (email, username, password, type) => {
    axios.post('/users/register', JSON.stringify({
      email: email,
      username: username,
      password: password,
      type: type
    })).then((response) => {
        navigate('/login')
        console.log(response);
    }).catch((err) => {
      setError(err.response.data.msg)
      console.error(err);
    })
  };

  //login user
  const loginUser = (email, password) => {
     axios.post('/users/user', JSON.stringify({
      email: email,
      password: password,
    })).then((response) => {
        console.log(response);
        setUserContext();
    }).catch((err) => {
      console.error(err);
      setError(err.response.data);
    })
  }

   //login user
   const logoutUser =  () => {
    axios.post('/users/logout').then((response) => {
        console.log(response);
        setUserContext();
    }).catch((err) => {
      console.error(err);
      setError(err.response.data);
    })

    navigate('/login')
  }

  return {
    registerUser,
    loginUser,
    checkUser,
    logoutUser,
    error
  }
}