import express from 'express';
import checkAuth from '../middleware/checkAuth.js'
import {
  getUserLectures,
  createLecture,
  getLecture,
  updateLecture,
  deleteLecture
} from './lectures.controller.js';
const router = express.Router();

router.route('/getLectures')
.get(getUserLectures)

router.route('/createLecture')
.post(createLecture)

router.route('/lecture')
.get(getLecture)
.post(updateLecture)
.delete(deleteLecture)

export default router;