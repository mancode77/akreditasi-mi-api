import mongoose from 'mongoose'

const dokumenMahasiswaSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  url: {
    type: String
  },
  year: {
    type: Number
  }
}, { timestamps: true })

export default mongoose.model('DokumenMahasiswa', dokumenMahasiswaSchema)
