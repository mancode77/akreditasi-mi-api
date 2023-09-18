import upload from '../middleware/multer.js'
import {
  getSaranaPrasarana,
  postSaranaPrasarana,
  deleteSaranaPrasarana
} from '../controllers/sarana-prasarana.js'
import express from 'express'

const router = express.Router()

router.get('/sarana-prasarana/:namaSaranaPrasarana', getSaranaPrasarana)
router.post('/sarana-prasarana/:namaSaranaPrasarana', upload.single('image'), postSaranaPrasarana)
router.delete('/sarana-prasarana/:namaSaranaPrasarana/:idSaranaPrasarana', deleteSaranaPrasarana)

export default router
