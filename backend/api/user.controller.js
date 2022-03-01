import User from "../models/user.model.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export default class UsersController {
  static async getUsers(req, res, next) {
    try {
      const userList = await User.find()

      return res.status(200).json(userList);
    } catch (err) {
      return res.status(401).json({ success: false, msg: err.message })
    }
  }

  static async getUser(req, res, next) {
    try {
      const user = await User.findOne({email: req.body.email})
      if (!user) {
        return res.status(401).json({ success: false, user: false })
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if (!validPassword) {
        return res.status(401).json({ success: false, user: false, msg: 'Incorrect Password' })
      }

      const token = jwt.sign(
        { email: user.email, type: user.type },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      )
      console.log(user)

      return res.status(200).json({ success: true, token: token, expiresIn: 3600, userId: user._id, username: user.username, type: user.type })

    } catch (err) {
      console.error(err)
      res.status(500).json({ success: false, msg: err.message })
    }
  }

  static async createUser(req, res, next) {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);

      const userExist = await User.findOne({ email: req.body.email })

      const usernameExists = await User.findOne({ username: req.body.username })

      if(userExist) {
        return res.status(401).json({ success: false, msg: 'User with this email already exists'})
      }

      if(usernameExists) {
        return res.status(401).json({ success: false, msg: 'Username already exists'})
      }

      const user = await User.create({
        email: req.body.email,
        username: req.body.username,
        password: hash,
        type: req.body.type,
      })

      console.log(`User created: ${user}`)
      return res.status(201).json({ success: true })
    }
    catch (err) {
      //more error handling
      return res.json({ success: false, msg: err.message })
    }
  }

  static async updateUser(req, res, next) {
    try {
      const user = await User.updateOne({
        email: req.body.email,
        password: req.body.password,
      },
        {
          $set: {
            email: req.body.new_email,
            password: req.body.new_password,
            type: req.body.new_type,
          }
        })
      console.log(body.new_password)
      console.log(`User updated: ${user}`)
      return res.json({ success: true })
    }
    catch (err) {
      //more error handling
      return res.json({ success: false, msg: err.message })
    }
  }

  static async deleteUser(req, res, next) {
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
}