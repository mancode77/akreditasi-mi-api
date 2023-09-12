import mongoose from 'mongoose'
import modelOptions from '../options.js'

const karyaMahasiswaSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  nama: {
    type: String
  },
  imageProfile: {
    type: String
  },
  judul: {
    type: String
  },
  deskripsi: {
    type: String
  },
  tahun: {
    type: Number
  },
  link: {
    type: String
  },
  video: {
    type: String
  }
}, modelOptions)

export default mongoose.model('KaryaMahasiswa', karyaMahasiswaSchema)
