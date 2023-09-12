import mongoose from 'mongoose'

const visitorSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  cookie: {
    type: String
  }
}, { timestamps: true })

export default mongoose.model('Visitor', visitorSchema)
