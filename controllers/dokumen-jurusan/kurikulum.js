import Kurikulum from '../../models/dokumen-jurusan/kurikulum.js'
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
    const kurikulum = await Kurikulum.create(req.body)

    return res.status(200).json(response(200, 'OK', kurikulum, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function putKurikulum (req, res) {
  try {
    const kurikulum = await Kurikulum.findByIdAndUpdate(req.params.idKurikulum, req.body, { new: true })

    return res.status(200).json(response(200, 'OK', kurikulum, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteKurikulum (req, res) {
  try {
    const kurikulum = await Kurikulum.findByIdAndDelete(req.params.idKurikulum)

    return res.status(200).json(response(200, 'OK', kurikulum, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
