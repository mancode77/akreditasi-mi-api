import express from 'express'
import {
  getVisitorsLength,
  postVisitor
} from './../controllers/visitor.js'

const router = express.Router()

router.get('/visitor', getVisitorsLength)
router.post('/visitor', postVisitor)

export default router
