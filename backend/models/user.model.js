import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      description: 'Email of the user',
      required: true, 
      unique: true, 
      validate: [isEmail, 'invalid email']
    },
    username: {
      type: String, 
      description: 'Username of the user',
      required: true,
       unique: true
      },
    password: {
      type: String, 
      description: 'Plaintext password of the user that will be hashed by the server',
      required: true
    },
    type: {
      type: String, 
      description: 'User type',
      enum: ['student', 'teacher'], 
      required: true
    },
  },
  {collection: 'users'}
)

const model = mongoose.model('User', userSchema)

export default model

