import mongoose from 'mongoose'

const bpkSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  deskripsi: {
    type: String
  },
  link: {
    type: String
  }
}, { timestamps: true })

export default mongoose.model('Bpk', bpkSchema)
