import KaryaMahasiswa from '../../models/dokumen-jurusan/karya-mahasiswa.js'
import response from '../../utils/response.js'
import encrypt from '../../utils/encrypt.js'

export async function getKaryaMahasiswa (req, res) {
  try {
    const karyaMahasiswa = await KaryaMahasiswa.find({ year: req.params.year })

    const dataKaryaMahasiswa = response(200, 'OK', KaryaMahasiswa, null)

    const encryptedResponse = encrypt(dataKaryaMahasiswa, '123')

    return res.status(200).json(encryptedResponse)
  } catch (error) {
    return res.status(500).json(response(200, 'OK', null, error))
  }
}

export async function postKaryaMahasiswa (req, res) {
  try {
    const karyaMahasiswa = await KaryaMahasiswa.create(req.body)

    return res.status(200).json(response(200, 'OK', karyaMahasiswa, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function putKaryaMahasiswa (req, res) {
  try {
    const karyaMahasiswa = await KaryaMahasiswa.findByIdAndUpdate(req.params.idKaryaMahasiswa, req.body, { new: true })

    return res.status(200).json(response(200, 'OK', karyaMahasiswa, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteKaryaMahasiswa (req, res) {
  try {
    const karyaMahasiswa = await KaryaMahasiswa.findByIdAndDelete(req.params.idKaryaMahasiswa)

    return res.status(200).json(response(200, 'OK', karyaMahasiswa, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
