import mongoose from 'mongoose'
import modelOptions from '../options.js'

const kontrakKuliahSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  deskripsi: {
    type: String
  },
  link: {
    type: String
  }
}, modelOptions)

export default mongoose.model('KontrakKuliah', kontrakKuliahSchema)
