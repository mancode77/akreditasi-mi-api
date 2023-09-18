import Seminar from './../../models/dokumen-mahasiswa/semniar.js'
import response from '../../utils/response.js'
import encrypt from '../../utils/encrypt.js'
import { storage } from '../../config.js'

export async function getSeminar (req, res) {
  try {
    const seminar = await Seminar.find({ year: req.params.year })

    const dataSeminar = response(200, 'OK', seminar, null)

    const encryptedResponse = encrypt(dataSeminar, '123')

    return res.status(200).json(encryptedResponse)
  } catch (error) {
    return res.status(500).json(response(200, 'OK', null, error))
  }
}

export async function postSeminar (req, res) {
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

    const dest = 'Seminar'

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

      const seminar = new Seminar({
        url,
        fileName,
        year: req.params.year

      })

      await seminar.save()

      return res.status(200).json(response(200, 'OK', seminar, null))
    })

    fileStream.end(image.buffer)
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteSeminar (req, res) {
  try {
    const seminar = await Seminar.findById(req.params.idSeminar)

    if (!seminar) {
      return res.json({
        took: 404,
        status: 'Not Found',
        data: seminar,
        dataLength: null,
        error: {
          message: 'Data tidak ada'
        }
      })
    }

    const bucket = storage.bucket()

    const dest = 'Seminar'

    const fileName = seminar.fileName
    const file = bucket.file(`${dest}/${fileName}`)

    await file.delete()

    await seminar.deleteOne()

    return res.status(200).json(response(200, 'OK', seminar, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
