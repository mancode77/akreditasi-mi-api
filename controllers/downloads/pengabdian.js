import Pengabdian from '../../models/downloads/pengabdian.js'

export async function getPengabdian (req, res) {
  try {
    const pengabdian = await Pengabdian.find(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: pengabdian,
      dataLength: pengabdian.length,
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

export async function postPengabdian (req, res) {
  try {
    const pengabdian = await Pengabdian.create(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: pengabdian,
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

export async function putPengabdian (req, res) {
  try {
    const pengabdian = await Pengabdian.findByIdAndUpdate(req.params.idPengabdian, req.body, { new: true })

    return res.json({
      took: 200,
      status: 'OK',
      data: pengabdian,
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

export async function deletePengabdian (req, res) {
  try {
    const pengabdian = await Pengabdian.findByIdAndDelete(req.params.idPengabdian)

    return res.json({
      took: 200,
      status: 'OK',
      data: pengabdian,
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
