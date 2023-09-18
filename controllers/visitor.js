import Visitor from './../models/visitor.js'
import response from './../utils/response.js'

export async function getVisitorsLength (req, res) {
  try {
    const visitorLength = await Visitor.count()

    return res.status(200).json(response(200, 'OK', visitorLength, null))
  } catch (error) {
    return res.status(500).json(response(500, 'OK', null, error))
  }
}

export async function postVisitor (req, res) {
  try {
    const visitor = await Visitor.create(req.body)

    return res.status(200).json(response(200, 'OK', visitor, null))
  } catch (error) {
    return res.status(500).json(response(500, 'OK', null, error))
  }
}
