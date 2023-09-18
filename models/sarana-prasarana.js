import mongoose from 'mongoose'

const saranaPrasaranaSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  titleImage: { type: String, unique: true },
  urlImage: { type: Array, of: String }
}, { timestamps: true })

export default mongoose.model('SaranaPrasarana', saranaPrasaranaSchema)
