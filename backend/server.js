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
const io = new Server(server);

const corsOptions = {
  credentials: true,
  origin: true
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
  socket.on('joinRoom', ({room, userType}) => {
    socket.join(`${room}-${userType}`)
  })

  socket.on('leaveRoom', ({room, userType}) => {
    socket.leave(`${room}-${userType}`)
  })

  //if submit response
  socket.on('submitresponse', (response, room) => {
    socket.to(`${room}-teacher`).emit(response)
  })


  //maybe allow lecturer to send question to students to answer??
})

export default server;