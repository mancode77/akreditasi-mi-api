import modelOptions from '../options.js'
import mongoose from 'mongoose'

const karyaMahasiswaSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  nama: String,
  imageProfile: String,
  judul: String,
  deskripsi: String,
  tahun: Number,
  link: String,
  video: String
}, modelOptions)

export default mongoose.model('KaryaMahasiswa', karyaMahasiswaSchema)
