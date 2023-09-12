import KontrakKuliah from '../../models/downloads/kontrak-kuliah.js'

export async function getKontrakKuliah (req, res) {
  try {
    const kontrakKuliah = await KontrakKuliah.find(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: kontrakKuliah,
      dataLength: kontrakKuliah.length,
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

export async function postKontrakKuliah (req, res) {
  try {
    const kontrakKuliah = await KontrakKuliah.create(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: kontrakKuliah,
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

export async function putKontrakKuliah (req, res) {
  try {
    const kontrakKuliah = await KontrakKuliah.findByIdAndUpdate(req.params.idKontrakKuliah, req.body, { new: true })

    return res.json({
      took: 200,
      status: 'OK',
      data: kontrakKuliah,
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

export async function deleteKontrakKuliah (req, res) {
  try {
    const kontrakKuliah = await KontrakKuliah.findByIdAndDelete(req.params.idKontrakKuliah)

    return res.json({
      took: 200,
      status: 'OK',
      data: kontrakKuliah,
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
