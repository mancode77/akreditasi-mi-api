import mongoose from 'mongoose'
import modelOptions from '../options.js'

const seminarSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  url: {
    type: String
  },
  fileName: {
    type: String
  },
  year: {
    type: Number
  }
}, modelOptions)

export default mongoose.model('Seminar', seminarSchema)
