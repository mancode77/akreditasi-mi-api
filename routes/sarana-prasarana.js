import express from 'express'
import {
  getSaranaPrasarana,
  postSaranaPrasarana,
  putSaranaPrasarana,
  deleteSaranaPrasarana
} from '../controllers/sarana-prasarana.js'
import upload from '../middleware/multer.js'

const router = express.Router()

router.get('/sarana-prasarana/:namaSaranaPrasarana', getSaranaPrasarana)
router.post('/sarana-prasarana/:namaSaranaPrasarana', upload.single('image'), postSaranaPrasarana)
router.put('/sarana-prasarana/:namaSaranaPrasarana/:idSaranaPrasarana', putSaranaPrasarana)
router.delete('/sarana-prasarana/:namaSaranaPrasarana/:idSaranaPrasarana', deleteSaranaPrasarana)

export default router
