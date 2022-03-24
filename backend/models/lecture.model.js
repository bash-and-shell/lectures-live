import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId, 
    description: 'user._id of the user who sent the response',
    required: true
  },
  response_type: {
     type: String, 
     description: 'type of the response',
     enum: ['feeling', 'question'], 
     required: true 
    },
  response : { 
    type: String, 
    description: `Response data, if feeling one of:
                  ["understand", "confused", "bored", "mind blown"], 
                  or the question from the user`,
    required: true
  },
  time: { 
    type: Date, 
    description: "Time of the event",
    required: true 
  }
})

const lectureSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId, 
    description: 'user._id of the teacher who created the session',
    required: true
  },
  title: { 
    type: 'string', 
    description: 'Title of the session',
    required: true 
  },
  time: { 
    type: Date, 
    description: 'Time of creation',
    required: true 
  },
  responses: { 
    type: [responseSchema], 
    description: 'Array of response objects',
  }
},
  { collection: 'lectures' }
)

//make user and title unique pair
lectureSchema.index({user_id: 1, title: 1}, {unique: true})

const model = mongoose.model('Lecture', lectureSchema)

export default model

