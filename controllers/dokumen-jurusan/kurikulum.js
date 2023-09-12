import Kurikulum from '../../models/dokumen-jurusan/kurikulum.js'

export async function getKurikulum (req, res) {
  try {
    const kurikulum = await Kurikulum.find(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: kurikulum,
      dataLength: kurikulum.length,
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

export async function postKurikulum (req, res) {
  try {
    const kurikulum = await Kurikulum.create(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: kurikulum,
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

export async function putKurikulum (req, res) {
  try {
    const kurikulum = await Kurikulum.findByIdAndUpdate(req.params.idKurikulum, req.body, { new: true })

    return res.json({
      took: 200,
      status: 'OK',
      data: kurikulum,
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

export async function deleteKurikulum (req, res) {
  try {
    const kurikulum = await Kurikulum.findByIdAndDelete(req.params.idKurikulum)

    return res.json({
      took: 200,
      status: 'OK',
      data: kurikulum,
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
