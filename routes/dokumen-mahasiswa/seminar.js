import upload from '../../middleware/multer.js'
import {
  getSeminar,
  postSeminar,
  deleteSeminar
} from '../../controllers/dokumen-mahasiswa/seminar.js'

import express from 'express'

const router = express.Router()

router.get('/seminar/:year', getSeminar)
router.post('/seminar/:year', upload.single('image'), postSeminar)
router.delete('/seminar/:year/:idSeminar', deleteSeminar)

export default router
