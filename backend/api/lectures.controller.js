import Lecture from "../models/lecture.model.js"
import jwt from 'jsonwebtoken'

 const getUser = async (req) => {
    let decoded
      if (req.cookies.token) {
        const token = req.cookies.token
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
      }
      return decoded.id
  }
    
  export  const getLectures = async (req, res, next) => {
    try {
      const lectureList = await Lecture.find()

      return res.status(200).json(lectureList);
    } catch (err) {
      return res.status(401).json({ success: false, lecture: false, msg: err.message })
    }
  }

  export const getUserLectures = async (req, res, next) => {
    try {
      //Don't need response data for this part
      const lectureList = await Lecture.find({
        user_id: await getUser(req)
      }, '_id title time')
      
      return res.status(200).json(lectureList);
    } catch (err) {
      console.log(err)
      return res.status(401).json({ success: false, lecture: false, msg: err.message })
    }
  }

  export const getLecture = async (req, res, next) => {
    try {
      console.log(req.body.id)
      let lecture
      if(req.body.id) {
        lecture = await Lecture.findOne({
          id: req.body.id,
        })
      }
      else {
        lecture = await Lecture.findOne({
          user_id: await getUser(req),
          title: req.body.title,
        })
      }
       

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

  export const createLecture = async (req, res, next) => {
    try {
      const lectureExists = await Lecture.findOne({
        user_id: await getUser(req),
        title: req.body.title
      })

      if (lectureExists) {
        return res.status(401).json({ success: false, msg: "You already have a lecture with this name" })
      }
      
      await Lecture.create({
        user_id: await getUser(req), 
        title: req.body.title,
        responses: req.body.responses,
        time: req.body.time,
      })

      return res.status(201).json({ success: true })
    } catch (err) {
      //more error handling
      return res.status(401).json({ success: false, msg: err.message })
    }
  }

  export const updateLecture = async (req, res, next) => {
    try {
      const lecture = await Lecture.updateOne({
        user_id: await getUser(req), 
        title: req.body.title,
      },
        {
          $set: {
            title: req.body.title,
            responses: req.body.responses,
          }
        })
      console.log(`Lecture updated: ${lecture}`)
      return res.status(201).json({ success: true })
    } catch (err) {
      //more error handling
      return res.json({ success: false, msg: err.message })
    }
  }

  export const deleteLecture = async (req, res, next) => {
    try {
      const lecture = await Lecture.deleteOne({
        user_id:req.body.user_id, 
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
