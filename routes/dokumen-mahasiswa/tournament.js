import express from 'express'
import upload from '../../middleware/multer.js'
import {
  getTournament,
  postTournament,
  deleteTournament
} from '../../controllers/dokumen-mahasiswa/tournament.js'

const router = express.Router()

router.get('/tournament/:year', getTournament)
router.post('/tournament/:year', upload.single('image'), postTournament)
router.delete('/tournament/:year/:idTournament', deleteTournament)

export default router
