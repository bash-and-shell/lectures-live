import express from 'express';
import checkAuth from '../middleware/checkAuth.js'
import LecturesController from './lectures.controller.js';
const router = express.Router();

router.route('/')
.get(checkAuth, LecturesController.getLectures)

router.route('/createLecture')
.post(checkAuth, LecturesController.createLecture)

router.route('/lecture')
.get(checkAuth, LecturesController.getLecture)
.put(checkAuth, LecturesController.updateLecture)
.delete(checkAuth, LecturesController.deleteLecture)

export default router;