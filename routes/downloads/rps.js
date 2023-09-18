import {
  getRps,
  postRps,
  putRps,
  deleteRps
} from '../../controllers/downloads/rps.js'

import express from 'express'

const router = express.Router()

router.get('/rps', getRps)
router.post('/rps', postRps)
router.put('/rps/:idRps', putRps)
router.delete('/rps/:idRps', deleteRps)

export default router
