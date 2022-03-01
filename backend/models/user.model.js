import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, validate: [isEmail, 'invalid email']},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    type: {type: String, enum: ['student', 'teacher'], required: true},
  },
  {collection: 'users'}
)

const model = mongoose.model('User', userSchema)

export default model

