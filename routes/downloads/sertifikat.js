import {
  getSertifikat,
  postSertifikat,
  putSertifikat,
  deleteSertifikat
} from '../../controllers/downloads/sertifikat.js'

import express from 'express'

const router = express.Router()

router.get('/sertifikat', getSertifikat)
router.post('/sertifikat', postSertifikat)
router.put('/sertifikat/:idSertifikat', putSertifikat)
router.delete('/sertifikat/:idSertifikat', deleteSertifikat)

export default router
