import express from 'express'
import upload from '../../middleware/multer.js'
import {
  getHmj,
  postHmj,
  deleteHmj
} from '../../controllers/dokumen-mahasiswa/tournament.js'

const router = express.Router()

router.get('/kompetisi/:year', getHmj)
router.post('/kompetisi/:year', upload.single('image'), postHmj)
router.delete('/kompetisi/:year/:idKompetisi', deleteHmj)

export default router
