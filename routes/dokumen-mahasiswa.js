import express from 'express'
import {
  getDokumenMahasiswa,
  postDokumenMahasiswa,
  putDokumenMahasiswa,
  deleteDokumenMahasiswa
} from '../../controllers/dokumen-mahasiswa.js'

const router = express.Router()

router.get('/dokumen-mahasiswa/:namaDokumenMahasiswa/:tahun', getDokumenMahasiswa)
router.post('/dokumen-mahasiswa', postDokumenMahasiswa)
router.put('/dokumen-mahasiswa/:idDokumenMahasiswa', putDokumenMahasiswa)
router.delete('/dokumen-mahasiswa/:idDokumenMahasiswa', deleteDokumenMahasiswa)

export default router
