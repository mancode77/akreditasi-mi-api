import KaryaMahasiswa from '../../models/dokumen-jurusan/karya-mahasiswa.js'

export async function getKaryaMahasiswa (req, res) {
  try {
    const karyaMahasiswa = await KaryaMahasiswa.find(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: karyaMahasiswa,
      dataLength: karyaMahasiswa.length,
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

export async function postKaryaMahasiswa (req, res) {
  try {
    const karyaMahasiswa = await KaryaMahasiswa.create(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: karyaMahasiswa,
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

export async function putKaryaMahasiswa (req, res) {
  try {
    const karyaMahasiswa = await KaryaMahasiswa.findByIdAndUpdate(req.params.idKaryaMahasiswa, req.body, { new: true })

    return res.json({
      took: 200,
      status: 'OK',
      data: karyaMahasiswa,
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

export async function deleteKaryaMahasiswa (req, res) {
  try {
    const karyaMahasiswa = await KaryaMahasiswa.findByIdAndDelete(req.params.idKaryaMahasiswa)

    return res.json({
      took: 200,
      status: 'OK',
      data: karyaMahasiswa,
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
