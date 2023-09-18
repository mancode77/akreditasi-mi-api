import SaranaPrasaranaPerpustakaan from '../models/sarana-prasarana-perpustakaan.js'
import response from '../utils/response.js'
import encrypt from '../utils/encrypt.js'
import Joi from 'joi'

export async function getSaranaPrasaranaPerpustakaan (req, res) {
  try {
    const saranaPrasaranaPerpustakaan = await SaranaPrasaranaPerpustakaan.find()

    const dataSaranaPrasaranaPerpustakaan = response(200, 'OK', saranaPrasaranaPerpustakaan, null)

    const encryptedResponse = encrypt(dataSaranaPrasaranaPerpustakaan, '123')

    return res.status(200).json(encryptedResponse)
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function postSaranaPrasaranaPerpustakaan (req, res) {
  try {
    //* Inisialisasi Schema Validasi data input user
    const schema = Joi.object({
      year: Joi.string().min(2010).max(2050).required(),
      link: Joi.string().min(5).max(200).required()
    })

    //* Data input user, setiap karakternya dijadikan lowercase
    const lowercaseData = {}

    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        lowercaseData[key] = req.body[key].toLowerCase()
      } else {
        lowercaseData[key] = req.body[key]
      }
    })

    //* Validasi data input user
    const result = schema.validate({ year: lowercaseData.year, link: lowercaseData.link })

    //* Jika tidak memenuhi standart validasi, maka memberikan "response error"
    if (result.error) {
      return res.status(400).json(response(400, 'User Error', null, result.error.details.map(error => error.message)))
    }

    //* Mengambil data dalam Database berdasarkan input user
    const existingSaranaPrasaranaPerpustakaan = await SaranaPrasaranaPerpustakaan.find({ year: lowercaseData.year, link: lowercaseData.link })

    //* Jika data input user terdapat pada Database, maka memberikan response "data sudah ada"
    if (existingSaranaPrasaranaPerpustakaan.length > 0) {
      return res.status(400).json(response(400, 'User Error', { message: 'Sarana Prasarana sudah ada' }, null))
    }
    const saranaPrasaranaPerpustakaan = new SaranaPrasaranaPerpustakaan({ year: lowercaseData.year, link: lowercaseData.link })

    await saranaPrasaranaPerpustakaan.save()

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function putSaranaPrasaranaPerpustakaan (req, res) {
  try {
    //* Inisialisasi Schema Validasi params route
    const schemaIdSaranaPrasaranaPerpustakaan = Joi.object({
      IdSaranaPrasaranaPerpustakaan: Joi.string().pattern(/^[a-z]+$/).min(3).max(200).required()
    })

    //* Validasi params route
    const resultIdSaranaPrasaranPerpustakaan = schemaIdSaranaPrasaranaPerpustakaan.validate({ IdSaranaPrasaranaPerpustakaan: req.params.toLowerCase() })

    //* Jika tidak memenuhi standart validasi, maka memberikan "response error"
    if (resultIdSaranaPrasaranPerpustakaan.error) {
      return res.status(400).json(response(400, 'User Error', null, resultIdSaranaPrasaranPerpustakaan.error.details.map(error => error.message)))
    }

    //* Inisialisasi Schema Validasi data input user
    const schemaBodySaranaPrasaranPerpustakaan = Joi.object({
      year: Joi.string().min(2010).max(2050).required(),
      link: Joi.string().min(5).max(200).required()
    })

    //* Data input user, setiap karakternya dijadikan lowercase
    const lowercaseData = {}

    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        lowercaseData[key] = req.body[key].toLowerCase()
      } else {
        lowercaseData[key] = req.body[key]
      }
    })

    //* Validasi data input user
    const resultBodySaranaPrasaranPerpustakaan = schemaBodySaranaPrasaranPerpustakaan.validate(lowercaseData)

    //* Jika tidak memenuhi standart validasi, maka memberikan "response error"
    if (resultBodySaranaPrasaranPerpustakaan.error) {
      return res.status(400).json(response(400, 'User Error', null, resultBodySaranaPrasaranPerpustakaan.error.details.map(error => error.message)))
    }

    //* Mengambil data dalam Database berdasarkan input user
    const existingSaranaPrasaranaPerpustakaan = await SaranaPrasaranaPerpustakaan.find({ titleImage: lowercaseData.titleImage })

    //* Jika data input user terdapat pada Database, maka memberikan response "data sudah ada"
    if (existingSaranaPrasaranaPerpustakaan.length > 0) {
      return res.status(400).json(response(400, 'User Error', { message: 'Sarana Prasarana sudah diupdate' }, null))
    }

    await SaranaPrasaranaPerpustakaan.findByIdAndUpdate(req.params.idSaranaPrasaranaPerpustakaan.toLowerCase(), resultBodySaranaPrasaranPerpustakaan.value, { new: true })

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteSaranaPrasaranaPerpustakaan (req, res) {
  try {
    //* Inisialisasi Schema Validasi params route
    const schemaIdSaranaPrasaranaPerpustakaan = Joi.object({
      idSaranaPrasaranaPerpustakaan: Joi.string().pattern(/^[a-z0-9]+$/).min(3).max(200).required()
    })

    //* Validasi params route
    const resultIdSaranaPrasaran = schemaIdSaranaPrasaranaPerpustakaan.validate({ idSaranaPrasaranaPerpustakaan: req.params.idSaranaPrasaranaPerpustakaan })

    //* Jika tidak memenuhi standart validasi, maka memberikan "response error"
    if (resultIdSaranaPrasaran.error) {
      return res.status(400).json(response(400, 'User Error', null, resultIdSaranaPrasaran.error.details.map(error => error.message)))
    }

    const saranaPrasaranaPerpustakaan = await SaranaPrasaranaPerpustakaan.findById(resultIdSaranaPrasaran.value.idSaranaPrasaranaPerpustakaan)

    if (!saranaPrasaranaPerpustakaan) {
      return res.status(404).json(response(404, 'Data Not Found', null, { message: 'Data tidak ditemukan' }))
    }

    await saranaPrasaranaPerpustakaan.deleteOne()

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
