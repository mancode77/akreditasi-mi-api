import Pengabdian from '../../models/downloads/pengabdian.js'
import response from '../../utils/response.js'

export async function getPengabdian (req, res) {
  try {
    const pengabdian = await Pengabdian.find()

    return res.status(200).json(response(200, 'OK', pengabdian, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function postPengabdian (req, res) {
  try {
    await Pengabdian.create(req.body)

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function putPengabdian (req, res) {
  try {
    await Pengabdian.findByIdAndUpdate(req.params.idPengabdian, req.body, { new: true })

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deletePengabdian (req, res) {
  try {
    await Pengabdian.findByIdAndDelete(req.params.idPengabdian)

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
