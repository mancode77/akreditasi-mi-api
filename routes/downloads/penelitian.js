import {
  getPenelitian,
  postPenelitian,
  putPenelitian,
  deletePenelitian
} from '../../controllers/downloads/penelitian.js'
import express from 'express'

const router = express.Router()

router.get('/penelitian', getPenelitian)
router.post('/penelitian', postPenelitian)
router.put('/penelitian/:idPenelitian', putPenelitian)
router.delete('/penelitian/:idPenelitian', deletePenelitian)

export default router
