import Sosialisasi from '../../models/dokumen-mahasiswa/sosialisasi.js'
import response from '../../utils/response.js'
import encrypt from '../../utils/encrypt.js'
import { storage } from '../../config.js'

export async function getSosialisasi (req, res) {
  try {
    const sosialisasi = await Sosialisasi.find({ year: req.params.year })

    const dataSosialisasi = response(200, 'OK', sosialisasi, null)

    const encryptedResponse = encrypt(dataSosialisasi, '123')

    return res.status(200).json(encryptedResponse)
  } catch (error) {
    return res.status(500).json(response(200, 'OK', null, error))
  }
}

export async function postSosialisasi (req, res) {
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

    const dest = 'Sosialisasi'

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

      const sosialisasi = new Sosialisasi({
        url,
        fileName,
        year: req.params.year

      })

      await sosialisasi.save()

      return res.status(200).json(response(200, 'OK', sosialisasi, null))
    })

    fileStream.end(image.buffer)
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteSosialisasi (req, res) {
  try {
    const sosialisasi = await Sosialisasi.findById(req.params.idSosialisasi)

    if (!sosialisasi) {
      return res.json({
        took: 404,
        status: 'Not Found',
        data: sosialisasi,
        dataLength: null,
        error: {
          message: 'Data tidak ada'
        }
      })
    }

    const bucket = storage.bucket()

    const dest = 'Sosialisasi'

    const fileName = sosialisasi.fileName
    const file = bucket.file(`${dest}/${fileName}`)

    await file.delete()

    await sosialisasi.deleteOne()

    return res.status(200).json(response(200, 'OK', sosialisasi, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
