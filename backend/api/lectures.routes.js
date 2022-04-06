import express from 'express';
import checkAuth from '../middleware/checkAuth.js'
import {
  getUserLectures,
  createLecture,
  getLecture,
  updateLecture,
  deleteLecture,
  getResponse
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

router.route('/response')
.get(getResponse)

export default router;