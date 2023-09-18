import Turnamen from '../../models/dokumen-mahasiswa/turnamen.js'
import response from '../../utils/response.js'
import encrypt from '../../utils/encrypt.js'
import { storage } from '../../config.js'

export async function getTurnamen (req, res) {
  try {
    const turnamen = await Turnamen.find({ year: req.params.year })

    const dataTurnamen = response(200, 'OK', turnamen, null)

    const encryptedResponse = encrypt(dataTurnamen, '123')

    return res.status(200).json(encryptedResponse)
  } catch (error) {
    return res.status(500).json(response(200, 'OK', null, error))
  }
}

export async function postTurnamen (req, res) {
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

    const dest = 'Turnamen'

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

      const turnamen = new Turnamen({
        url,
        fileName,
        year: req.params.year

      })

      await turnamen.save()

      return res.status(200).json(response(200, 'OK', turnamen, null))
    })

    fileStream.end(image.buffer)
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteTurnamen (req, res) {
  try {
    const turnamen = await Turnamen.findById(req.params.idTurnamen)

    if (!turnamen) {
      return res.json({
        took: 404,
        status: 'Not Found',
        data: turnamen,
        dataLength: null,
        error: {
          message: 'Data tidak ada'
        }
      })
    }

    const bucket = storage.bucket()

    const dest = 'Turnamen'

    const fileName = turnamen.fileName
    const file = bucket.file(`${dest}/${fileName}`)

    await file.delete()

    await turnamen.deleteOne()

    return res.status(200).json(response(200, 'OK', turnamen, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
