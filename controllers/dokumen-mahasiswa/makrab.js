import { storage } from './../../config.js'
import Makrab from './../../models/dokumen-mahasiswa/makrab.js'
import response from '../../utils/response.js'
import encrypt from './../../utils/encrypt.js'

export async function getMakrab (req, res) {
  try {
    const makrab = await Makrab.find({ year: req.params.year })

    const dataMakrab = response(200, 'OK', makrab, null)

    const encryptedResponse = encrypt(dataMakrab, '123')

    return res.status(200).json(encryptedResponse)
  } catch (error) {
    return res.status(500).json(response(200, 'OK', null, error))
  }
}

export async function postMakrab (req, res) {
  try {
    const image = req.file

    if (!image) {
      return res.status(400).json({
        took: 400,
        status: 'User Error',
        data: null,
        dataLength: null,
        error: {
          message: 'Tidak ada gambar'
        }
      })
    }

    const bucket = storage.bucket()

    const dest = 'makrab'

    const fileName = `${Date.now()}_${image.originalname}`
    const file = bucket.file(`${dest}/${fileName}`)

    const fileStream = file.createWriteStream({
      metadata: {
        contentType: image.mimetype
      }
    })

    fileStream.on('error', (error) => {
      console.error('Error uploading image:', error)
      return res.status(400).json(response(400, 'User Error', null, 'Error ketika menupload gambar'))
    })

    fileStream.on('finish', async () => {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500'
      })

      const makrab = new Makrab({
        url,
        fileName,
        year: req.params.year

      })

      await makrab.save()

      return res.status(200).json(response(200, 'OK', makrab, null))
    })

    fileStream.end(image.buffer)
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteMakrab (req, res) {
  try {
    const makrab = await Makrab.findById(req.params.idMakrab)

    if (!makrab) {
      return res.json({
        took: 404,
        status: 'Not Found',
        data: makrab,
        dataLength: null,
        error: {
          message: 'Data tidak ada'
        }
      })
    }

    const bucket = storage.bucket()

    const dest = 'makrab'

    const fileName = makrab.fileName
    const file = bucket.file(`${dest}/${fileName}`)

    await file.delete()

    await makrab.deleteOne()

    return res.status(200).json(response(200, 'OK', makrab, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
