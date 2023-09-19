import KontrakKuliah from '../../models/downloads/kontrak-kuliah.js'
import response from '../../utils/response.js'

export async function getKontrakKuliah (req, res) {
  try {
    const kontrakKuliah = await KontrakKuliah.find()

    return res.status(200).json(response(200, 'OK', kontrakKuliah, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function postKontrakKuliah (req, res) {
  try {
    await KontrakKuliah.create(req.body)

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function putKontrakKuliah (req, res) {
  try {
    await KontrakKuliah.findByIdAndUpdate(req.params.idKontrakKuliah, req.body, { new: true })

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteKontrakKuliah (req, res) {
  try {
    await KontrakKuliah.findByIdAndDelete(req.params.idKontrakKuliah)

    return res.status(200).json(response(200, 'OK', { messsage: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
