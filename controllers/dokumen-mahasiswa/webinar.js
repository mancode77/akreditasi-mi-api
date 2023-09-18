import Webinar from '../../models/dokumen-mahasiswa/webinar.js'
import response from '../../utils/response.js'
import encrypt from '../../utils/encrypt.js'
import { storage } from '../../config.js'

export async function getWebinar (req, res) {
  try {
    const webinar = await Webinar.find({ year: req.params.year })

    const dataWebinar = response(200, 'OK', webinar, null)

    const encryptedResponse = encrypt(dataWebinar, '123')

    return res.status(200).json(encryptedResponse)
  } catch (error) {
    return res.status(500).json(response(200, 'OK', null, error))
  }
}

export async function postWebinar (req, res) {
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

    const dest = 'Webinar'

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

      const webinar = new Webinar({
        url,
        fileName,
        year: req.params.year

      })

      await webinar.save()

      return res.status(200).json(response(200, 'OK', webinar, null))
    })

    fileStream.end(image.buffer)
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteWebinar (req, res) {
  try {
    const webinar = await Webinar.findById(req.params.idWebinar)

    if (!webinar) {
      return res.json({
        took: 404,
        status: 'Not Found',
        data: webinar,
        dataLength: null,
        error: {
          message: 'Data tidak ada'
        }
      })
    }

    const bucket = storage.bucket()

    const dest = 'Webinar'

    const fileName = webinar.fileName
    const file = bucket.file(`${dest}/${fileName}`)

    await file.delete()

    await webinar.deleteOne()

    return res.status(200).json(response(200, 'OK', webinar, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
