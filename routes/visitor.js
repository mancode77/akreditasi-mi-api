import express from 'express'
import {
  getVisitorsLength,
  postVisitor
} from './../controllers/visitor.js'

const router = express.Router()

router.get('/api/visitor', getVisitorsLength)
router.post('/api/visitor', postVisitor)

export default router
