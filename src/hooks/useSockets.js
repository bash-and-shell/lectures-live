import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { io } from "socket.io-client";

const useSockets = () => {
  const socket = io()
  const navigate = useNavigate();
  const {setUser}  = useContext(UserContext);
  const [error, setError] = useState(null);

  //create and join room
  const enterRoom = async (room) => {
    socket.emit("room", room);
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

export default useSockets;