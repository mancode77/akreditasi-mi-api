import { storage } from '../../config.js'
import Hmj from '../../models/dokumen-mahasiswa/hmj.js'
import response from '../../utils/response.js'
import encrypt from '../../utils/encrypt.js'

export async function getHmj (req, res) {
  try {
    const hmj = await Hmj.find({ year: req.params.year })

    const dataHmj = response(200, 'OK', hmj, null)

    const encryptedResponse = encrypt(dataHmj, '123')

    return res.status(200).json(encryptedResponse)
  } catch (error) {
    return res.status(500).json(response(200, 'OK', null, error))
  }
}

export async function postHmj (req, res) {
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

    const dest = 'Hmj'

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

      const hmj = new Hmj({
        url,
        fileName,
        year: req.params.year

      })

      await hmj.save()

      return res.status(200).json(response(200, 'OK', hmj, null))
    })

    fileStream.end(image.buffer)
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteHmj (req, res) {
  try {
    const hmj = await Hmj.findById(req.params.idHmj)

    if (!hmj) {
      return res.json({
        took: 404,
        status: 'Not Found',
        data: hmj,
        dataLength: null,
        error: {
          message: 'Data tidak ada'
        }
      })
    }

    const bucket = storage.bucket()

    const dest = 'Hmj'

    const fileName = hmj.fileName
    const file = bucket.file(`${dest}/${fileName}`)

    await file.delete()

    await hmj.deleteOne()

    return res.status(200).json(response(200, 'OK', hmj, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
