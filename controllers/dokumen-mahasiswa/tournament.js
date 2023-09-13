import { storage } from '../../config.js'
import Hmj from '../../models/dokumen-mahasiswa/Hmj.js'

export async function getHmj (req, res) {
  try {
    const hmj = await Hmj.find({ year: req.params.year })

    return res.json({
      took: 200,
      status: 'OK',
      data: hmj,
      dataLength: hmj.length,
      error: null
    })
  } catch (error) {
    return res.json({
      took: 500,
      status: 'OK',
      data: null,
      dataLength: null,
      error
    })
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
      return res.status(400).json({
        took: 400,
        status: 'User Error',
        data: null,
        dataLength: null,
        error: {
          message: 'Error ketika menupload gambar'
        }
      })
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

      return res.status(200).json({
        took: 200,
        status: 'OK',
        data: hmj,
        dataLength: null,
        error: null
      })
    })

    fileStream.end(image.buffer)
  } catch (error) {
    return res.status(500).json({
      took: 500,
      status: 'Server Error',
      data: null,
      dataLength: null,
      error
    })
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

    return res.json({
      took: 200,
      status: 'OK',
      data: {
        message: 'success'
      },
      dataLength: null,
      error: null
    })
  } catch (error) {
    return res.json({
      took: 500,
      status: 'OK',
      data: null,
      dataLength: null,
      error
    })
  }
}
