import express from 'express';
import {
  getUsers,
  loginUser,
  createUser,
  checkUser,
  logoutUser,
  updateUser,
  deleteUser
} from './user.controller.js';
const router = express.Router();

router.route('/')
.get(getUsers)

router.route('/register')
.post(createUser)

router.route('/checkUser')
.get(checkUser)

router.route('/logout')
.post(logoutUser)

router.route('/user')
.post(loginUser)
.put(updateUser)
.delete( deleteUser)

export default router;