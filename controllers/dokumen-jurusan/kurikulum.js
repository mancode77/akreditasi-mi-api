import { storage } from '../../config.js'
import Kurikulum from '../../models/dokumen-mahasiswa/kurikulum.js'
import response from '../../utils/response.js'
import encrypt from '../../utils/encrypt.js'

export async function getKurikulum (req, res) {
  try {
    const kurikulum = await Kurikulum.find({ year: req.params.year })

    const dataKurikulum = response(200, 'OK', kurikulum, null)

    const encryptedResponse = encrypt(dataKurikulum, '123')

    return res.status(200).json(encryptedResponse)
  } catch (error) {
    return res.status(500).json(response(200, 'OK', null, error))
  }
}

export async function postKurikulum (req, res) {
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

    const dest = 'Kurikulum'

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

      const kurikulum = new Kurikulum({
        url,
        fileName,
        year: req.params.year

      })

      await kurikulum.save()

      return res.status(200).json(response(200, 'OK', kurikulum, null))
    })

    fileStream.end(image.buffer)
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteKurikulum (req, res) {
  try {
    const kurikulum = await Kurikulum.findById(req.params.idKurikulum)

    if (!kurikulum) {
      return res.json({
        took: 404,
        status: 'Not Found',
        data: kurikulum,
        dataLength: null,
        error: {
          message: 'Data tidak ada'
        }
      })
    }

    const bucket = storage.bucket()

    const dest = 'Kurikulum'

    const fileName = kurikulum.fileName
    const file = bucket.file(`${dest}/${fileName}`)

    await file.delete()

    await kurikulum.deleteOne()

    return res.status(200).json(response(200, 'OK', kurikulum, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
