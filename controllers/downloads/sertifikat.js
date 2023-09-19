import Sertifikat from '../../models/downloads/sertifikat.js'
import response from '../../utils/response.js'

export async function getSertifikat (req, res) {
  try {
    const sertifikat = await Sertifikat.find()

    return res.status(200).json(response(200, 'OK', sertifikat, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function postSertifikat (req, res) {
  try {
    await Sertifikat.create(req.body)

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function putSertifikat (req, res) {
  try {
    await Sertifikat.findByIdAndUpdate(req.params.idSertifikat, req.body, { new: true })

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteSertifikat (req, res) {
  try {
    await Sertifikat.findByIdAndDelete(req.params.idSertifikat)

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
