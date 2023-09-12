import express from 'express'
import {
  getKurikulum,
  postKurikulum,
  putKurikulum,
  deleteKurikulum
} from '../../controllers/dokumen-jurusan/kurikulum.js'

const router = express.Router()

router.get('/kurikulum', getKurikulum)
router.post('/kurikulum', postKurikulum)
router.put('/kurikulum/:idKurikulum', putKurikulum)
router.delete('/kurikulum/:year/:idKurikulum', deleteKurikulum)

export default router
