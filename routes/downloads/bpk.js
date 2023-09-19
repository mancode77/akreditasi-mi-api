import {
  getBpk,
  postBpk,
  putBpk,
  deleteBpk
} from './../../controllers/downloads/bpk.js'
import express from 'express'

const router = express.Router()

router.get('/bpk', getBpk)
router.post('/bpk', postBpk)
router.put('/bpk/:idBpk', putBpk)
router.delete('/bpk/:idBpk', deleteBpk)

export default router
