import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { io } from "socket.io-client";

const useSockets = (room) => {
  const socket = io()
  const navigate = useNavigate();
  const {user}  = useContext(UserContext);

  useEffect(()=> {
    //on mount of useSockets, join rom
    if(user === null)
      return
    socket.emit("joinRoom", room, user)
    //dismount, leave room
    return () => {
      socket.emit("leaveRoom", room, user)
    }
  }, [user])

  const sendResponse = (reaction, room) => {
    socket.emit('submitResponse', reaction, room)
  }

  return {
    sendResponse,
  }
}

export default useSockets;