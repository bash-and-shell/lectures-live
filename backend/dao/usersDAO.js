import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let users

export default class UsersDAO {
  static async injectDB(connect) {
    if(users) {
      return;
    }
    try {
      users = await connect.db(process.env.LL_NS).collection('users')
    }
    catch(err) {
      console.error(`Unable to establish connection in usersDAO ${err}`);
    }
  }


  static async getUsers() {
    let cursor

    try {
      cursor = await users.find()
    }
    catch (err) {
      console.error(`Unable to find users in usersDAO: ${err}`)
      return []
    }

    try{
      const usersList = await cursor.toArray()
      return usersList
    } 
    catch (err) {
      console.error(`Unable to convert cursor to users list: ${err}`)
      return []
    }
  }

  static async getUser(filters = {}) {
    let query 
    if(filters.user_id) {
      query =  { "user_id" : filters["user_id"]}
    }
    else if (filters.email) {
      query =  { "email" : filters["email"]}
    }

    let cursor

    try {
      cursor = await users.findOne(query)
      return cursor
    }
    catch (err) {
      console.error(`Unable to find users in usersDAO: ${err}`)
      return []
    }
  }

  static async createUser(user_id, email, password, type) {
    try {
      const user = {
        user_id: user_id,
        email: email,
        password: password,
        type: type,
      }
      const result = await users.insertOne(user);
      console.log(`User created: ${user}`)
    }
    catch (err) {
      console.error(`Unable to insert user: ${err}`)
    }
  }

  static async updateUser(filters = {}) {
    
    try {
      console.log(filters.user_id)
      const result = await users.updateOne({user_id: filters['user_id']}, {$set: filters});
      console.log(`User updated: ${result}`)
      return result
    }
    catch (err) {
      console.error(`Unable to insert user: ${err}`)
    }
  }

  static async deleteUser(user) {
    try {
      const result = await users.deleteOne(user);
      console.log(`Deleted created: ${user}`)
      return user
    }
    catch (err) {
      console.error(`Unable to insert user: ${err}`)
    }
  }
}