import mongoose from 'mongoose'

const saranaPrasaranaPerpustakaanSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  year: { type: String, unique: true },
  link: { type: String, unique: true }
}, { timestamps: true })

export default mongoose.model('SaranaPrasaranaPerpustakaan', saranaPrasaranaPerpustakaanSchema)
