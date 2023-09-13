import { storage } from '../../config.js'
import Tournament from '../../models/dokumen-mahasiswa/tournament.js'

export async function getTournament (req, res) {
  try {
    const tournament = await Tournament.find({ year: req.params.year })

    return res.json({
      took: 200,
      status: 'OK',
      data: tournament,
      dataLength: tournament.length,
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

export async function postTournament (req, res) {
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

    const dest = 'Tournament'

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

      const tournament = new Tournament({
        url,
        fileName,
        year: req.params.year

      })

      await tournament.save()

      return res.status(200).json({
        took: 200,
        status: 'OK',
        data: tournament,
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

export async function deleteTournament (req, res) {
  try {
    const tournament = await Tournament.findById(req.params.idTournament)

    if (!tournament) {
      return res.json({
        took: 404,
        status: 'Not Found',
        data: tournament,
        dataLength: null,
        error: {
          message: 'Data tidak ada'
        }
      })
    }

    const bucket = storage.bucket()

    const dest = 'Tournament'

    const fileName = tournament.fileName
    const file = bucket.file(`${dest}/${fileName}`)

    await file.delete()

    await tournament.deleteOne()

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
