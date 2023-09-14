import KaryaMahasiswa from '../../models/dokumen-jurusan/karya-mahasiswa.js'
import response from '../../utils/response.js'
import encrypt from '../../utils/encrypt.js'
import Joi from 'joi'

export async function getKaryaMahasiswa (req, res) {
  try {
    const karyaMahasiswa = await KaryaMahasiswa.find({ year: req.params.year })

    const dataKaryaMahasiswa = response(200, 'OK', karyaMahasiswa, null)

    const encryptedResponse = encrypt(dataKaryaMahasiswa, '123')

    return res.status(200).json(encryptedResponse)
  } catch (error) {
    return res.status(500).json(response(200, 'OK', null, error))
  }
}

export async function postKaryaMahasiswa (req, res) {
  try {
    const schema = Joi.object({
      nama: Joi.string().pattern(/^[A-Za-z]+$/).min(5).max(200).required(),
      imageProfile: Joi.string().min(5).max(200).required(),
      judul: Joi.string().min(5).max(200).required(),
      deskripsi: Joi.string().min(5).max(200).required(),
      tahun: Joi.number().min(2000).max(2050).required(),
      link: Joi.string().min(5).max(200).required(),
      video: Joi.string().min(5).max(200).required()
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
      return res.status(400).json(response(400, 'User Error', null, error.details.map(error => error.message)))
    }

    await KaryaMahasiswa.create(value)

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function putKaryaMahasiswa (req, res) {
  try {
    const schema = Joi.object({
      nama: Joi.string().min(5).max(200).required(),
      imageProfile: Joi.string().min(5).max(200).required(),
      judul: Joi.string().min(5).max(200).required(),
      deskripsi: Joi.string().min(5).max(200).required(),
      tahun: Joi.number().min(2000).max(2050).required(),
      link: Joi.string().min(5).max(200).required(),
      video: Joi.string().min(5).max(200).required()
    })

    const result = schema.validate(req.body)

    if (result.error) {
      return res.status(400).json(response(400, 'User Error', null, result.error.details.map(error => error.message)))
    }

    await KaryaMahasiswa.findByIdAndUpdate(req.params.idKaryaMahasiswa, req.body, { new: true })

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error.errors))
  }
}

export async function deleteKaryaMahasiswa (req, res) {
  try {
    await KaryaMahasiswa.findByIdAndDelete(req.params.idKaryaMahasiswa)

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
