import { storage } from '../../config.js'
import Makrab from '../../models/dokumen-mahasiswa/makrab.js'

export async function getMakrab (req, res) {
  try {
    const makrab = await Makrab.find({ year: req.params.year })

    return res.json({
      took: 200,
      status: 'OK',
      data: makrab,
      dataLength: makrab.length,
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

      const makrab = new Makrab({
        url,
        fileName,
        year: req.params.year

      })

      await makrab.save()

      return res.status(200).json({
        took: 200,
        status: 'OK',
        data: makrab,
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
