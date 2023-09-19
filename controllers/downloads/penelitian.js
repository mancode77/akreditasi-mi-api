import Penelitian from '../../models/downloads/penelitian.js'
import response from '../../utils/response.js'

export async function getPenelitian (req, res) {
  try {
    const penelitian = await Penelitian.find(req.body)

    return res.status(200).json(response(200, 'OK', penelitian, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function postPenelitian (req, res) {
  try {
    await Penelitian.create(req.body)

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function putPenelitian (req, res) {
  try {
    await Penelitian.findByIdAndUpdate(req.params.idPenelitian, req.body, { new: true })

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deletePenelitian (req, res) {
  try {
    await Penelitian.findByIdAndDelete(req.params.idPenelitian)

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
