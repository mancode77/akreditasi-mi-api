import express from 'express'
import {
  getBpk
} from './../../controllers/downloads/bpk.js'

const router = express.Router()

router.get('/bpk', getBpk)

export default router
