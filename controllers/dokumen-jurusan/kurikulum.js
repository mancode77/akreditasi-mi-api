import Kurikulum from '../../models/dokumen-jurusan/kurikulum.js'
import response from '../../utils/response.js'
import encrypt from '../../utils/encrypt.js'
import Joi from 'joi'

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
    const schema = Joi.object({
      idKurikulum: Joi.number().min(5).max(1_000_000_000_000).required(),
      matkul: Joi.string().min(5).max(200).required(),
      sks: Joi.number().min(1).max(10).required(),
      tp: Joi.string().min(5).max(8).required(),
      semester: Joi.number().min(1).max(8).required()
    })

    const result = schema.validate(req.body)

    if (result.error) {
      return res.status(400).json(response(400, 'User Error', null, result.error.details.map(error => error.message)))
    }

    await Kurikulum.create(result.value)

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function putKurikulum (req, res) {
  try {
    const kurikulum = await Kurikulum.findById(req.params.idKurikulum)

    await kurikulum.deleteOne()

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}

export async function deleteKurikulum (req, res) {
  try {
    const kurikulum = await Kurikulum.findById(req.params.idKurikulum)

    if (!kurikulum) {
      return res.status(404).json(response(404, 'Data Not Found', null, { message: 'Data tidak ditemukan' }))
    }

    await kurikulum.deleteOne()

    return res.status(200).json(response(200, 'OK', { message: 'Sukses' }, null))
  } catch (error) {
    return res.status(500).json(response(500, 'Server Error', null, error))
  }
}
