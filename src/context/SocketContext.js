import React from 'react';
import {io} from "socket.io-client";

export const socket = io(`http://${window.location.hostname}:5005`);
export const SocketContext = React.createContext();