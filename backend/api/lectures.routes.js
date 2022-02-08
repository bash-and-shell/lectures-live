import express from 'express';
import LecturesController from './lectures.controller.js';
const router = express.Router();

router.route('/')
.get(LecturesController.getLectures)

router.route('/register')
.post(LecturesController.createLecture)

router.route('/lecture')
.get(LecturesController.getLecture)
.put(LecturesController.updateLecture)
.delete(LecturesController.deleteLecture)

export default router;