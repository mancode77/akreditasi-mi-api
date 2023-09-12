import DokumenMahasiswa from './../../models/downloads/dokumen-mahasiswa.js'

export async function getDokumenMahasiswa (req, res) {
  try {
    const dokumenMahasiswa = await DokumenMahasiswa.find(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: dokumenMahasiswa,
      dataLength: dokumenMahasiswa.length,
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

export async function postDokumenMahasiswa (req, res) {
  try {
    const dokumenMahasiswa = await DokumenMahasiswa.create(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: dokumenMahasiswa,
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

export async function deleteDokumenMahasiswa (req, res) {
  try {
    const dokumenMahasiswa = await DokumenMahasiswa.findByIdAndDelete(req.params.idDokumenMahasiswa)

    return res.json({
      took: 200,
      status: 'OK',
      data: dokumenMahasiswa,
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
