import { storage } from '../../config.js'
import Magang from '../../models/dokumen-mahasiswa/magang.js'
import response from '../../utils/response.js'
import encrypt from '../../utils/encrypt.js'

export async function getMagang (req, res) {
  try {
    const magang = await Magang.find({ year: req.params.year })

    const dataMagang = response(200, 'OK', magang, null)

    const encryptedResponse = encrypt(dataMagang, '123')

    return res.status(200).json(encryptedResponse)
  } catch (error) {
    return res.status(500).json(response(200, 'OK', null, error))
  }
}

export async function postMagang (req, res) {
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

    const dest = 'Magang'

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

      const magang = new Magang({
        url,
        fileName,
        year: req.params.year

      })

      await magang.save()

      return res.status(200).json(response(200, 'OK', magang, null))
    })

    fileStream.end(image.buffer)
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteMagang (req, res) {
  try {
    const magang = await Magang.findById(req.params.idMagang)

    if (!magang) {
      return res.json({
        took: 404,
        status: 'Not Found',
        data: magang,
        dataLength: null,
        error: {
          message: 'Data tidak ada'
        }
      })
    }

    const bucket = storage.bucket()

    const dest = 'Magang'

    const fileName = magang.fileName
    const file = bucket.file(`${dest}/${fileName}`)

    await file.delete()

    await magang.deleteOne()

    return res.status(200).json(response(200, 'OK', magang, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
