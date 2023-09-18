import upload from '../../middleware/multer.js'
import {
  getSosialisasi,
  postSosialisasi,
  deleteSosialisasi
} from '../../controllers/dokumen-mahasiswa/sosialisasi.js'
import express from 'express'

const router = express.Router()

router.get('/sosialisasi/:year', getSosialisasi)
router.post('/sosialisasi/:year', upload.single('image'), postSosialisasi)
router.delete('/sosialisasi/:year/:idSosialisasi', deleteSosialisasi)

export default router
