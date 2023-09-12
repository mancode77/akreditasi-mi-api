import Bpk from './../../models/downloads/bpk.js'

export async function getBpk (req, res) {
  try {
    const bpk = await Bpk.find(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: bpk,
      dataLength: null,
      error: null
    })
  } catch (error) {
    return res.json({
      took: 500,
      status: 'OK',
      data: null,
      dataLength: null,
      error: { error: error.errors.cookie.message }
    })
  }
}
