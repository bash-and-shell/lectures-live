import express from 'express';
// import { getUser, getUsers, createUser, updateUser, deleteUser } from './user.controller';
import UsersController from './user.controller.js';
const router = express.Router();

// router.route('/')
// .get(getUsers)
// .post(createUser)

// router.route('/:id')
// .get(getUser)
// .put(updateUser)
// .delete(deleteUser)

router.route('/')
.get(UsersController.getUsers)
.post(UsersController.createUser)

router.route('/:user_id')
.get(UsersController.getUser)
.put(UsersController.updateUser)
.delete(UsersController.deleteUser)

export default router;