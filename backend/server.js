import express from 'express';
import { Server } from 'socket.io'
import {createServer} from 'http';
import cors from 'cors';
import headers from './middleware/headers.js'
import users from './api/users.routes.js';
import lectures from './api/lectures.routes.js';

const app = express();
const server = createServer(app)
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(headers);

app.use("/api/v1/users", users);
app.use("/api/v1/lectures", lectures);

app.use("*", (req, res, next) => res.status(404).json({error: 'Route not found'}));

//if connect to socket
io.on('connection', socket => {

  //on connection take params of room number/code and then join room of that code

  socket.on('room', room => {
    socket.join(room)
  })


  //if submit emoticon
  socket.on('submitreaction', reaction => {

  })

  //if submit question
  socket.on('submitquesiton', question => {

  })

  //maybe allow lecturer to send question to students to answer??
})

export default server;