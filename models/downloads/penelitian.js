import modelOptions from '../options.js'
import mongoose from 'mongoose'

const penelitianSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  deskripsi: {
    type: String
  },
  link: {
    type: String
  }
}, modelOptions)

export default mongoose.model('Penelitian', penelitianSchema)
