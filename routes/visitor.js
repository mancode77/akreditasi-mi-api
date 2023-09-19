import {
  getVisitorsLength,
  postVisitor
} from './../controllers/visitor.js'
import express from 'express'

const router = express.Router()

router.get('/visitor', getVisitorsLength)
router.post('/visitor', postVisitor)

export default router
