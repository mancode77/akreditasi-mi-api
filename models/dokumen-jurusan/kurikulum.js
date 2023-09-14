import mongoose from 'mongoose'
import modelOptions from '../options.js'

const kurikulumSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  idKurikulum: {
    type: Number
  },
  matkul: {
    type: String
  },
  sks: {
    type: Number
  },
  tp: {
    type: String
  },
  semester: {
    type: Number
  }
}, modelOptions)

export default mongoose.model('Kurikulum', kurikulumSchema)
