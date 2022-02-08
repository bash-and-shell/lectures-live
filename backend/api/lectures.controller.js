import Lecture from "../models/lecture.model.js"

export default class LecturesController {
  static async getLectures(req, res, next) {
    try {
      const lectureList = await Lecture.find()

      return res.status(200).json(lectureList);
    } catch (err) {
      return res.status(401).json({ success: false, lecture: false, msg: err.message })
    }
  }

  static async getUserLectures(req, res, next) {
    try {
      const lectureList = await Lecture.find({
        user: req.body.user
      })

      return res.status(200).json(lectureList);
    } catch (err) {
      return res.status(401).json({ success: false, lecture: false, msg: err.message })
    }
  }

  static async getLecture(req, res, next) {
    try {
      const lecture = await Lecture.findOne({
        user: req.body.user,
        title: req.body.title,
      })

      if (lecture) {
        return res.status(200).json({ success: true, lecture: true })
      }
      else {
        return res.status(401).json({ success: false, lecture: false })
      }
    } catch (err) {
      return res.status(401).json({ success: false, lecture: false, msg: err.message })
    }
  }

  static async createLecture(req, res, next) {
    try {
      const lecture = await Lecture.create({
        user: req.body.user,
        title: req.body.title,
        responses: req.body.responses,
      })

      console.log(`Lecture created: ${lecture}`)
      return res.json({ success: true })
    } catch (err) {
      //more error handling
      return res.json({ success: false, msg: err.message })
    }
  }

  static async updateLecture(req, res, next) {
    try {
      const lecture = await Lecture.updateOne({
        user: req.body.user,
        title: req.body.title,
      },
        {
          $set: {
            title: req.body.title,
            responses: req.body.responses,
          }
        })
      console.log(`Lecture updated: ${lecture}`)
      return res.json({ success: true })
    } catch (err) {
      //more error handling
      return res.json({ success: false, msg: err.message })
    }
  }

  static async deleteLecture(req, res, next) {
    try {
      const lecture = await Lecture.deleteOne({
        user: req.body.user,
        title: req.body.title,
      })

      if (lecture) {
        return res.status(200).json({ success: true, lecture: true })
      }
      else {
        return res.status(401).json({ success: false, lecture: false })
      }
    } catch (err) {
      return res.status(401).json({ success: false, lecture: false, msg: err.message })
    }
  }
}