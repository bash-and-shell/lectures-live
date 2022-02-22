import express from 'express';
import cors from 'cors';
import headers from './middleware/headers.js'
import users from './api/users.routes.js';
import lectures from './api/lectures.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(headers);

app.use("/api/v1/users", users);
app.use("/api/v1/lectures", lectures);

app.use("*", (req, res, next) => res.status(404).json({error: 'Route not found'}));

export default app;