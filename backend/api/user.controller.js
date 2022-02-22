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
      let fetchedUser
      // const xtoken = req.headers['x-access-token'];

      // try{
      //   const decoded = jwt.verify(xtoken, process.env.JWT_SECRET);
      //   const email = decoded.email;
      // }
      // catch (err) {
        
      // }
      User.findOne({
        email: req.body.email,
      }).then(user => {
        if(!user) {
          return res.status(401).json({ success: false, user: false })
        }

        fetchedUser=user
        return bcrypt.compare(req.body.password, user.password)
      }).then(result => {
        if(!result) {
          return res.status(401).json({ success: false, user: false, msg: 'Incorrect Password' })
        }
      })

      const token = jwt.sign(
        { email: user.email, type: user.type }, 
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      )

      return res.status(200).json({ success: true, user: token, expiresIn: 3600 })
  }

  static async createUser(req, res, next) {
    try {
      bcrypt.hash(req.body.password, 10).then(hash => {
        const user = await User.create({
          email: req.body.email,
          password: hash,
          type: req.body.type,
        })
  
      })

      console.log(`User created: ${user}`)
      return res.json({ success: true })
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