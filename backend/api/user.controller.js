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

  //login user
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
        { id: user._id },
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

      res.status(200).json({ success: true, token, userId: user._id, username: user.username, type: user.type })

    } catch (err) {
      console.error(err)
      res.status(500).json({ success: false, msg: err.message })
    }
  }

  static async checkUser(req, res, next) {
    let currentUser = null;
    
    if (req.cookies.token) {
      console.log("hi")
      const token = req.cookies.token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET)
      currentUser = await User.findById(decoded.id)

      console.log(currentUser)
    }

    return res.status(200).json({ currentUser: currentUser })
  }

  static async logoutUser(req, res, next) {
    res.cookie('jwt', 'logout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.status(200).json({ success: true, msg: 'user is logged out'});
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