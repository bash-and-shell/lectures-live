import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io'
import { createServer } from 'http';
import cors from 'cors';
import jwt from 'express-jwt';
import cookieParser from 'cookie-parser';
import headers from './middleware/headers.js'
import users from './api/users.routes.js';
import lectures from './api/lectures.routes.js';

dotenv.config();
const app = express();
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: true,
    withCredentials: true
  }
});

const corsOptions = {
  withCredentials: true,
  origin: 'http://localhost:5005'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(headers);

app.use("/api/v1/users", users);
app.use("/api/v1/lectures", lectures);

app.use("*", (req, res, next) => res.status(404).json({ error: 'Route not found' }));

//if connect to socket
io.on('connection', socket => {

  //on connection take params of room number/code and then join room of that code
  socket.on('joinRoom', (room, user) => {
    socket.join(`${room}`)
    console.log(`User ${user.username} joined room ${room}`)
  })

  socket.on('leaveRoom', (room, user) => {
    socket.leave(`${room}`)
    console.log(`User ${user.username} left room ${room}`)
  })

  //if submit response
  socket.on('sendResponse', (response, room) => {
    socket.to(`${room}`).emit(('receiveResponse'), response)
    console.log(response)
  })


  //maybe allow lecturer to send question to students to answer??
})

export default server;