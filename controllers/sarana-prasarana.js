import SaranaPrasarana from '../models/sarana-prasarana.js'
import response from '../utils/response.js'
import encrypt from '../utils/encrypt.js'
import Joi from 'joi'
import { storage } from '../config.js'

export async function getSaranaPrasarana (req, res) {
  try {
    //* Inisialisasi Schema Validasi params route
    const schema = Joi.object({
      namaSaranaPrasarana: Joi.string().pattern(/^[a-z]+$/).min(3).max(200).required()
    })

    //* Validasi params route
    const result = schema.validate({ namaSaranaPrasarana: req.params.namaSaranaPrasarana.toLowerCase() })

    //* Jika tidak memenuhi standart validasi, maka memberikan "response error"
    if (result.error) {
      return res.status(400).json(response(400, 'User Error', null, result.error.details.map(error => error.message)))
    }

    const saranaPrasarana = await SaranaPrasarana.find({ titleImage: result.value.namaSaranaPrasarana })

    const dataSaranaPrasarana = response(200, 'OK', saranaPrasarana, null)

    const encryptedResponse = encrypt(dataSaranaPrasarana, '123')

    return res.status(200).json(encryptedResponse)
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function postSaranaPrasarana (req, res) {
  try {
    //* Inisialisasi Schema Validasi data input user
    const schema = Joi.object({
      titleImage: Joi.string().min(5).max(200).required()
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
    const result = schema.validate({ titleImage: lowercaseData.titleImage })

    //* Jika tidak memenuhi standart validasi, maka memberikan "response error"
    if (result.error) {
      return res.status(400).json(response(400, 'User Error', null, result.error.details.map(error => error.message)))
    }

    //* Mengambil data dalam Database berdasarkan input user
    const existingSaranaPrasarana = await SaranaPrasarana.find({ titleImage: lowercaseData.titleImage })

    //* Jika data input user terdapat pada Database, maka memberikan response "data sudah ada"
    if (existingSaranaPrasarana.length > 0) {
      return res.status(400).json(response(400, 'User Error', { message: 'Sarana Prasarana sudah ada' }, null))
    }

    //* Operasi file gambar
    const image = req.file

    if (!image) {
      return res.status(400).json(response(400, 'User Error', { message: 'Tidak ada gambar' }, null))
    }

    const bucket = storage.bucket()

    const dest = req.params.namaSaranaPrasarana

    const fileName = `${Date.now()}_${image.originalname}`
    const file = bucket.file(`${dest}/${fileName}`)

    const fileStream = file.createWriteStream({
      metadata: {
        contentType: image.mimetype
      }
    })

    fileStream.on('error', () => {
      return res.status(400).json(response(400, 'User Error', { message: 'Error ketika menupload gambar' }, null))
    })

    fileStream.on('finish', async () => {
      const saranaPrasarana = new SaranaPrasarana({
        titleImage: lowercaseData.titleImage,
        urlImage: fileName
      })

      await saranaPrasarana.save()

      return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
    })

    fileStream.end(image.buffer)
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function putSaranaPrasarana (req, res) {
  try {
    //* Inisialisasi Schema Validasi params route
    const schemaIdSaranaPrasarana = Joi.object({
      namaSaranaPrasarana: Joi.string().pattern(/^[a-z]+$/).min(3).max(200).required()
    })

    //* Validasi params route
    const resultIdSaranaPrasaran = schemaIdSaranaPrasarana.validate({ namaSaranaPrasarana: req.params.namaSaranaPrasarana.toLowerCase() })

    //* Jika tidak memenuhi standart validasi, maka memberikan "response error"
    if (resultIdSaranaPrasaran.error) {
      return res.status(400).json(response(400, 'User Error', null, resultIdSaranaPrasaran.error.details.map(error => error.message)))
    }

    //* Inisialisasi Schema Validasi data input user
    const schemaBodySaranaPrasaran = Joi.object({
      titleImage: Joi.string().min(5).max(200).required()
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
    const resultBodySaranaPrasaran = schemaBodySaranaPrasaran.validate(lowercaseData)

    //* Jika tidak memenuhi standart validasi, maka memberikan "response error"
    if (resultBodySaranaPrasaran.error) {
      return res.status(400).json(response(400, 'User Error', null, resultBodySaranaPrasaran.error.details.map(error => error.message)))
    }

    //* Mengambil data dalam Database berdasarkan input user
    const existingSaranaPrasarana = await SaranaPrasarana.find({ titleImage: lowercaseData.titleImage })

    //* Jika data input user terdapat pada Database, maka memberikan response "data sudah ada"
    if (existingSaranaPrasarana.length > 0) {
      return res.status(400).json(response(400, 'User Error', { message: 'Sarana Prasarana sudah diupdate' }, null))
    }

    await SaranaPrasarana.findByIdAndUpdate(req.params.idSaranaPrasarana.toLowerCase(), resultBodySaranaPrasaran.value, { new: true })

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteSaranaPrasarana (req, res) {
  try {
    //* Inisialisasi Schema Validasi params route
    const schemaIdSaranaPrasarana = Joi.object({
      idSaranaPrasarana: Joi.string().pattern(/^[a-z0-9]+$/).min(3).max(200).required()
    })

    //* Validasi params route
    const resultIdSaranaPrasaran = schemaIdSaranaPrasarana.validate({ idSaranaPrasarana: req.params.idSaranaPrasarana })

    //* Jika tidak memenuhi standart validasi, maka memberikan "response error"
    if (resultIdSaranaPrasaran.error) {
      return res.status(400).json(response(400, 'User Error', null, resultIdSaranaPrasaran.error.details.map(error => error.message)))
    }

    const saranaPrasarana = await SaranaPrasarana.findById(resultIdSaranaPrasaran.value.idSaranaPrasarana)

    if (!saranaPrasarana) {
      return res.status(404).json(response(404, 'Data Not Found', null, { message: 'Data tidak ditemukan' }))
    }

    await saranaPrasarana.deleteOne()

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
