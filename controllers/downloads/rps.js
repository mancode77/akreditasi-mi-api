import Rps from '../../models/downloads/rps.js'
import response from '../../utils/response.js'

export async function getRps (req, res) {
  try {
    const rps = await Rps.find()

    return res.status(200).json(response(200, 'OK', rps, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function postRps (req, res) {
  try {
    await Rps.create(req.body)

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function putRps (req, res) {
  try {
    await Rps.findByIdAndUpdate(req.params.idRps, req.body, { new: true })

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteRps (req, res) {
  try {
    await Rps.findByIdAndDelete(req.params.idRps)

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
