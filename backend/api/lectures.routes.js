import express from 'express';
import checkAuth from '../middleware/checkAuth.js'
import LecturesController from './lectures.controller.js';
const router = express.Router();

router.route('/getLectures')
.get(LecturesController.getUserLectures)

router.route('/createLecture')
.post(LecturesController.createLecture)

router.route('/lecture')
.get(LecturesController.getLecture)
.post(LecturesController.updateLecture)
.delete(LecturesController.deleteLecture)

export default router;