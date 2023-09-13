import express from 'express'
import upload from '../../middleware/multer.js'
import {
  getTournament,
  postTournament,
  deleteTournament
} from '../../controllers/dokumen-mahasiswa/tournament.js'

const router = express.Router()

router.get('/kompetisi/:year', getTournament)
router.post('/kompetisi/:year', upload.single('image'), postTournament)
router.delete('/kompetisi/:year/:idKompetisi', deleteTournament)

export default router
