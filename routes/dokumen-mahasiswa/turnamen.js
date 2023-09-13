import express from 'express'
import upload from '../../middleware/multer.js'
import {
  getTurnamen,
  postTurnamen,
  deleteTurnamen
} from '../../controllers/dokumen-mahasiswa/turnamen.js'

const router = express.Router()

router.get('/turnamen/:year', getTurnamen)
router.post('/turnamen/:year', upload.single('image'), postTurnamen)
router.delete('/turnamen/:year/:idKompetisi', deleteTurnamen)

export default router
