import upload from '../../middleware/multer.js'
import {
  getHmj,
  postHmj,
  deleteHmj
} from '../../controllers/dokumen-mahasiswa/hmj.js'
import express from 'express'

const router = express.Router()

router.get('/hmj/:year', getHmj)
router.post('/hmj/:year', upload.single('image'), postHmj)
router.delete('/hmj/:year/:idHmj', deleteHmj)

export default router
