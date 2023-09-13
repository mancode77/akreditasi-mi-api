import express from 'express'
import {
  getKurikulum,
  postKurikulum,
  deleteKurikulum
} from '../../controllers/dokumen-jurusan/kurikulum.js'

const router = express.Router()

router.get('/kurikulum', getKurikulum)
router.post('/kurikulum', postKurikulum)
router.delete('/kurikulum/:year/:idKurikulum', deleteKurikulum)

export default router
