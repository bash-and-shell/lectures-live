import express from 'express';
import UsersController from './user.controller.js';
const router = express.Router();

router.route('/')
.get(UsersController.getUsers)

router.route('/register')
.post(UsersController.createUser)

router.route('/user')
.post(UsersController.getUser)
.put(UsersController.updateUser)
.delete(UsersController.deleteUser)

export default router;