import express from 'express';
import checkAuth from '../middleware/checkAuth.js'
import UsersController from './user.controller.js';
const router = express.Router();

router.route('/')
.get(UsersController.getUsers)

router.route('/register')
.post(UsersController.createUser)

router.route('/user')
.post(UsersController.getUser)
.put(checkAuth, UsersController.updateUser)
.delete(checkAuth, UsersController.deleteUser)

export default router;