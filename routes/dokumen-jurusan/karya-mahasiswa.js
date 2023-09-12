import express from 'express'
import {
  getKaryaMahasiswa,
  postKaryaMahasiswa,
  putKaryaMahasiswa,
  deleteKaryaMahasiswa
} from '../../controllers/dokumen-jurusan/karya-mahasiswa.js'

const router = express.Router()

router.get('/karya-mahasiswa', getKaryaMahasiswa)
router.post('/karya-mahasiswa', postKaryaMahasiswa)
router.put('/karya-mahasiswa/:idKaryaMahasiswa', putKaryaMahasiswa)
router.delete('/karya-mahasiswa/:idKaryaMahasiswa', deleteKaryaMahasiswa)

export default router
