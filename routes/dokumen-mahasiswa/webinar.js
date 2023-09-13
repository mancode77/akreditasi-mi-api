import express from 'express'
import upload from '../../middleware/multer.js'
import {
  getWebinar,
  postWebinar,
  deleteWebinar
} from '../../controllers/dokumen-mahasiswa/webinar.js'

const router = express.Router()

router.get('/webinar/:year', getWebinar)
router.post('/webinar/:year', upload.single('image'), postWebinar)
router.delete('/webinar/:year/:idWebinar', deleteWebinar)

export default router
