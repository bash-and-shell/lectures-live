import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';

export const useSockets = (room) => {
  const {socket} = useContext(SocketContext)
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