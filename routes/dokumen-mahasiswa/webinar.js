import upload from '../../middleware/multer.js'
import {
  getWebinar,
  postWebinar,
  deleteWebinar
} from '../../controllers/dokumen-mahasiswa/webinar.js'

import express from 'express'

const router = express.Router()

router.get('/webinar/:year', getWebinar)
router.post('/webinar/:year', upload.single('image'), postWebinar)
router.delete('/webinar/:year/:idWebinar', deleteWebinar)

export default router
