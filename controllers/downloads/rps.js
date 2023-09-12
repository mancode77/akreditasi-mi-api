import Rps from '../../models/downloads/rps.js'

export async function getRps (req, res) {
  try {
    const rps = await Rps.find(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: rps,
      dataLength: rps.length,
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

export async function postRps (req, res) {
  try {
    const rps = await Rps.create(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: rps,
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

export async function putRps (req, res) {
  try {
    const rps = await Rps.findByIdAndUpdate(req.params.idRps, req.body, { new: true })

    return res.json({
      took: 200,
      status: 'OK',
      data: rps,
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

export async function deleteRps (req, res) {
  try {
    const rps = await Rps.findByIdAndDelete(req.params.idRps)

    return res.json({
      took: 200,
      status: 'OK',
      data: rps,
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
