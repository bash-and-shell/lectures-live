import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const responseSchema = new mongoose.Schema({
  user_id: {type: mongoose.Types.ObjectId, required: true},
  response_type: { type: String, enum: ['feeling', 'question'], required: true },
  response : { type: String, required: true},
  time: { type: Date, required: true }
})

const lectureSchema = new mongoose.Schema({
  user_id: {type: mongoose.Types.ObjectId, required: true},
  title: { type: 'string', required: true },
  time: { type: Date, required: true },
  responses: { type: [responseSchema] }
},
  { collection: 'lectures' }
)

//make user and title unique pair
lectureSchema.index({user_id: 1, title: 1}, {unique: true})

const model = mongoose.model('Lecture', lectureSchema)

export default model

