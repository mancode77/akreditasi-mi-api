import upload from '../middleware/multer.js'
import {
  getSaranaPrasaranaPerpustakaan,
  postSaranaPrasaranaPerpustakaan,
  putSaranaPrasaranaPerpustakaan,
  deleteSaranaPrasaranaPerpustakaan
} from '../controllers/sarana-prasarana-perpustakaan.js'
import express from 'express'

const router = express.Router()

router.get('/sarana-prasarana/perpustakaan', getSaranaPrasaranaPerpustakaan)
router.post('/sarana-prasarana/perpustakaan', upload.single('image'), postSaranaPrasaranaPerpustakaan)
router.put('/sarana-prasarana/perpustakaan/:idSaranaPrasaranaPerpustakaan', putSaranaPrasaranaPerpustakaan)
router.delete('/sarana-prasarana/perpustakaan/:idSaranaPrasaranaPerpustakaan', deleteSaranaPrasaranaPerpustakaan)

export default router
