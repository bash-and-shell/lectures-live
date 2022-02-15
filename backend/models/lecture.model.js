import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const responseSchema = new mongoose.Schema({
  email: {type: String, required: true, validate: [isEmail, 'invalid email']},
  response_type: { type: String, enum: ['feeling', 'question'], required: true },
  time: { type: Date, required: true }
})

const lectureSchema = new mongoose.Schema({
  user: {type: String, required: true, validate: [isEmail, 'invalid email']},
  title: { type: 'string', required: true },
  responses: { type: [responseSchema] }
},
  { collection: 'lectures' }
)

//make user and title unique pair
lectureSchema.index({user: 1, title: 1}, {unique: true})

const model = mongoose.model('Lecture', lectureSchema)

export default model

