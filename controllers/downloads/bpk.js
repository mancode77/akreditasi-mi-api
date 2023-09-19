import Bpk from './../../models/downloads/bpk.js'
import response from '../../utils/response.js'

export async function getBpk (req, res) {
  try {
    const bpk = await Bpk.find()

    return res.status(200).json(response(200, 'OK', bpk, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function postBpk (req, res) {
  try {
    await Bpk.create(req.body)

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function putBpk (req, res) {
  try {
    await Bpk.findByIdAndUpdate(req.params.idBpk, req.body, { new: true })

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteBpk (req, res) {
  try {
    await Bpk.findByIdAndDelete(req.params.idBpk)

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
