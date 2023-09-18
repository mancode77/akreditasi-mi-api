import {
  getKontrakKuliah,
  postKontrakKuliah,
  putKontrakKuliah,
  deleteKontrakKuliah
} from '../../controllers/downloads/kontrak-kuliah.js'

import express from 'express'

const router = express.Router()

router.get('/kontrak-kuliah', getKontrakKuliah)
router.post('/kontrak-kuliah', postKontrakKuliah)
router.put('/kontrak-kuliah/:idKontrakKuliah', putKontrakKuliah)
router.delete('/kontrak-kuliah/:idKontrakKuliah', deleteKontrakKuliah)

export default router
