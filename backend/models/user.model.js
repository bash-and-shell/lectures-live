import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    type: {type: String, enum: ['student', 'teacher'], required: true},
  },
  {collection: 'users'}
)

const model = mongoose.model('User', userSchema)

export default model

