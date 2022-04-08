import User from "../models/user.model.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { getUser } from './user.helper.js'

export const getUsers = async (req, res, next) => {
  try {
    const userList = await User.find()

    return res.status(200).json(userList);
  } catch (err) {
    return res.status(401).json({ success: false, msg: err.message })
  }
}

//login user
export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ success: false, user: false })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(401).json({ success: false, user: false, msg: 'Incorrect Password' })
    }

    const token = jwt.sign(
      { id: mongoose.Types.ObjectId(user._id) },
      process.env.JWT_SECRET
    )

    //login cookie set for 10 days
    let expires = new Date()
    expires.setDate(expires.getDate() + 10)

    res.cookie('token', token, {
      expires: expires,
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    })

    res.status(200).json({ success: true, token })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, msg: err.message })
  }
}

export const checkUser = async (req, res, next) => {
  let currentUser = null;

  if (req.cookies.token) {
    const token = req.cookies.token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    currentUser = await User.findById(decoded.id)
    console.log(currentUser)
  }
  else {
    return res.status(401).json({ currentUser: null })
  }

  const returnUser = {
    id: mongoose.Types.ObjectId(currentUser._id),
    username: currentUser.username,
    type: currentUser.type
  }

  return res.status(200).json({ currentUser: returnUser })
}

export const logoutUser = async (req, res, next) => {
  res.clearCookie('token').status(202)
  return res.json({ success: true, msg: 'user is logged out' });
}


export const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const userExist = await User.findOne({ email: req.body.email })

    const usernameExists = await User.findOne({ username: req.body.username })

    if (userExist) {
      return res.status(401).json({ success: false, msg: 'User with this email already exists' })
    }

    if (usernameExists) {
      return res.status(401).json({ success: false, msg: 'Username already exists' })
    }

    const user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: hash,
      type: req.body.type,
    })


    console.log(`User created: ${user}`)

    const token = jwt.sign(
      { email: user.email, type: user.type },
      process.env.JWT_SECRET
    )

    //login cookie set for 10 days
    let expires = new Date()
    expires.setDate(expires.getDate() + 10)

    res.cookie('token', token, {
      expires: expires,
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
      sameSite: 'none'
    })

    return res.status(201).json({ success: true, token, userId: user._id, username: user.username, type: user.type })
  }
  catch (err) {
    //more error handling
    return res.status(400).json({ success: false, msg: err.message })
  }
}

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.email) {
      const userExist = await User.findOne({ email: req.body.email })

      if (userExist) {
        return res.status(401).json({ success: false, msg: 'User with this email already exists' })
      }
    }

    if (req.body.username) {
      const usernameExists = await User.findOne({ username: req.body.username })

      if (usernameExists) {
        return res.status(401).json({ success: false, msg: 'Username already exists' })
      }
    }


    const findUser = await User.findOne({
      _id: await getUser(req)
    })

    let password = findUser.password
    if (req.body.password) {
      await bcrypt.hash(req.body.password, 10)
    }

    const user = await User.updateOne({
      _id: await getUser(req)
    },
      {
        $set: {
          email: req.body.email || findUser.email,
          username: req.body.username || findUser.username,
          password: password
          // type: req.body.new_type,
        }
      })
    console.log(`User updated: ${user}`)
    return res.status(203).json({ success: true })
  }
  catch (err) {
    //more error handling
    return res.status(401).json({ success: false, msg: err.message })
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.deleteOne({
      email: req.body.email,
      password: req.body.password,
    })

    if (user) {
      return res.status(200).json({ success: true, user: true })
    }
    else {
      return res.status(401).json({ success: false, user: false })
    }
  } catch (err) {
    return res.status(401).json({ success: false, user: false, msg: err.message })
  }
}
