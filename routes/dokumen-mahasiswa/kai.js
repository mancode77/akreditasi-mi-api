import upload from '../../middleware/multer.js'
import {
  getMakrab,
  postMakrab,
  deleteMakrab
} from '../../controllers/dokumen-mahasiswa/makrab.js'
import express from 'express'

const router = express.Router()

router.get('/makrab/:year', getMakrab)
router.post('/makrab/:year', upload.single('image'), postMakrab)
router.delete('/makrab/:year/:idMakrab', deleteMakrab)

export default router
