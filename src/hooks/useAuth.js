import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const useAuth = () => {
  const navigate = useNavigate();
  const {setUser}  = useContext(UserContext);
  const [error, setError] = useState(null);

  //set user in context and push them to account page
  const setUserContext = async () => {
    return await axios.get('/users/checkUser').then(res => {
      setUser(res.data.currentUser);
      navigate('/account')
    }).catch((err) => {
      setError(err.response.data);
    })
  }

  //register user
  const registerUser = async (email, username, password, type) => {
    return axios.post('/users/register', JSON.stringify({
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
  const loginUser = async (email, password) => {
    axios.post('/users/user', JSON.stringify({
      email: email,
      password: password,
    })).then(async (response) => {
        console.log(response);
        await setUserContext();
    }).catch((err) => {
      console.error(err);
      setError(err.response.data);
    })
  }

  return {
    registerUser,
    loginUser,
    error
  }
}

export default useAuth