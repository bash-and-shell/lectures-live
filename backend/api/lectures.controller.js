import Lecture from "../models/lecture.model.js"
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import User from '../models/user.model.js'

const getUser = async (req) => {
  let decoded
  if (req.cookies.token) {
    const token = req.cookies.token
    decoded = await jwt.verify(token, process.env.JWT_SECRET)
  }
  return decoded.id
}

export const getLectures = async (req, res, next) => {
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
    console.log(req.query.id)
    const lecture = await Lecture.findOne({
      _id: req.query.id,
    })
    console.log(lecture)

    if (lecture)
      return res.status(200).json({ success: true, lecture })

    return res.status(404).json({ success: false, lecture: false })
  } 
  catch (err) {
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
      user_id: req.body.user_id,
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

export const getResponse = async (req, res, next) => {
  try {
    const response = await Lecture.find({
      'responses._id' : mongoose.Types.ObjectId(req.query.id)
    }, {
      responses: {
        '$elemMatch' : {
          "_id": mongoose.Types.ObjectId(req.query.id)
        }
      }
    })

    console.log(response[0].responses[0])

    const user = await User.findOne({
      "_id": mongoose.Types.ObjectId(response[0].responses[0].user_id)
    })

    console.log(user)


    if(response) {
      return res.status(200).json({ success: true, response: response[0].responses[0], user: user.username})
    }

  } catch (err) {
    return res.status(404).json({ success: false, response: false, msg: err.message })
  }
}