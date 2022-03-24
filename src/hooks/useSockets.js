import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';
// import { io } from "socket.io-client";

export const useSockets = (room) => {
  const {socket} = useContext(SocketContext)
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

  const sendResponse = (response) => {
    socket.emit('sendResponse', response, room)
  }

  return {sendResponse}
}