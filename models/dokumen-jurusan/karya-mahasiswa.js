import mongoose from 'mongoose'
import modelOptions from '../options.js'

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
