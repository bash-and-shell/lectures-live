import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const useAuth = () => {
  const navigate = useNavigate();
  const {setUser}  = useContext(UserContext);
  const [error, setError] = useState(null);

  //create and join room
  const enterRoom = async () => {
    
  }

  const endRoom = async () => {

  }

  const sendResponse = async () => {

  }

  return { 
    enterRoom,
    sendResponse,
    endRoom
  }
}

export const useSockets;