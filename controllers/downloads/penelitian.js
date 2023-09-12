import Penelitian from '../../models/downloads/penelitian.js'

export async function getPenelitian (req, res) {
  try {
    const penelitian = await Penelitian.find(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: penelitian,
      dataLength: penelitian.length,
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

export async function postPenelitian (req, res) {
  try {
    const penelitian = await Penelitian.create(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: penelitian,
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

export async function putPenelitian (req, res) {
  try {
    const penelitian = await Penelitian.findByIdAndUpdate(req.params.idPenelitian, req.body, { new: true })

    return res.json({
      took: 200,
      status: 'OK',
      data: penelitian,
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

export async function deletePenelitian (req, res) {
  try {
    const penelitian = await Penelitian.findByIdAndDelete(req.params.idPenelitian)

    return res.json({
      took: 200,
      status: 'OK',
      data: penelitian,
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
