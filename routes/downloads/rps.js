import express from 'express'
import {
  getRps,
  postRps,
  putRps,
  deleteRps
} from '../../controllers/downloads/rps.js'

const router = express.Router()

router.get('/rps', getRps)
router.post('/rps', postRps)
router.put('/rps/:idRps', putRps)
router.delete('/rps/:idRps', deleteRps)

export default router
