import Sertifikat from '../../models/downloads/sertifikat.js'

export async function getSertifikat (req, res) {
  try {
    const sertifikat = await Sertifikat.find(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: sertifikat,
      dataLength: sertifikat.length,
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

export async function postSertifikat (req, res) {
  try {
    const sertifikat = await Sertifikat.create(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: sertifikat,
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

export async function putSertifikat (req, res) {
  try {
    const sertifikat = await Sertifikat.findByIdAndUpdate(req.params.idSertifikat, req.body, { new: true })

    return res.json({
      took: 200,
      status: 'OK',
      data: sertifikat,
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

export async function deleteSertifikat (req, res) {
  try {
    const sertifikat = await Sertifikat.findByIdAndDelete(req.params.idSertifikat)

    return res.json({
      took: 200,
      status: 'OK',
      data: sertifikat,
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
