// exports.getUsers = (req, res, next) => {
//   res.status(200).json({success: true, msg: "Show all users"});
// }

// exports.getUser = (req, res, next) => {
//   res.status(200).json({success: true, msg: `Show user ${req.user.name}`});
// }

// exports.createUsers = (req, res, next) => {
//   res.status(200).json({success: true, msg: "Create new users"});
// }

// exports.updateUser = (req, res, next) => {
//   res.status(200).json({success: true, msg: `Update user ${req.user.name}`});
// }

// exports.deleteUser = (req, res, next) => {
//   res.status(200).json({success: true, msg: `Delete user ${req.user.name}`});
// }
 
import UserDAO from "../dao/usersDAO.js"

export default class UsersController {
  static async getUsers (req, res, next) {
    const userList = await UserDAO.getUsers()
    res.status(200).json(userList)
  }

  static async getUser(req, res, next) {
    let filters = {}

    if(req.params.user_id) {
      filters.user_id = req.params.user_id
    }
    else if(req.query.email) {
      filters.email = req.query.email
    }

    const userList = await UserDAO.getUser(filters)

    let response = {
      userList: userList,
      filters: filters
    }

    res.status(200).json(response)
  }

  static async createUser (req, res, next) {
    try {
      console.log(req.body)
      console.log(req.body.user_id)
      const user_id = req.body.user_id
      const email = req.body.email
      const password = req.body.password
      const type = req.body.type
      
      const response = await UserDAO.createUser(user_id, email, password, type)
    
      res.status(200).json({success: true})
    }
    catch (err) {
      res.status(404).json({success:false, error: err, message: err.message})
    }
  }

  static async updateUser (req, res, next) {

    let userInfo = {}

    if(req.params.user_id) {
      userInfo.user_id = req.params.user_id
    }
    if(req.body.email) {
      userInfo.email = req.body.email
    }
    if(req.body.password) {
      userInfo.password = req.body.password
    }
    if(req.body.type) {
      userInfo.type = req.body.type
    }

    console.log(userInfo)

    let response = await UserDAO.updateUser(userInfo)
    
    res.json(response)
  }

  static async deleteUser (req, res, next) {

    let userInfo = {}

    if(req.params.user_id) {
      userInfo.user_id = req.params.user_id
    }
    
    let response = await UserDAO.deleteUser(userInfo)
    
    res.json(response)
  }
}