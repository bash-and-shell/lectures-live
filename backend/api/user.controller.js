import User from "../models/user.model.js"
export default class UsersController {
  static async getUsers(req, res, next) {
    try {
      const userList = await User.find()

      return res.status(200).json(userList);
    } catch (err) {
      return res.status(401).json({ success: false, user: false, msg: err.message })
    }
  }

  static async getUser(req, res, next) {
    try {
      const user = await User.findOne({
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

  static async createUser(req, res, next) {
    try {
      const user = await User.create({
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
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