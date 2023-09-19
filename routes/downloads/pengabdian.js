import {
  getPengabdian,
  postPengabdian,
  putPengabdian,
  deletePengabdian
} from '../../controllers/downloads/pengabdian.js'
import express from 'express'

const router = express.Router()

router.get('/pengabdian', getPengabdian)
router.post('/pengabdian', postPengabdian)
router.put('/pengabdian/:idPengabdian', putPengabdian)
router.delete('/pengabdian/:idPengabdian', deletePengabdian)

export default router
