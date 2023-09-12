import Visitor from './../models/visitor.js'

export async function postVisitor (req, res) {
  try {
    const visitor = await Visitor.create(req.body)

    return res.json({
      took: 200,
      status: 'OK',
      data: visitor,
      dataLength: null,
      error: null
    })
  } catch (error) {
    return res.json({
      took: 500,
      status: 'OK',
      data: null,
      dataLength: null,
      error: { error: error.errors.cookie.message }
    })
  }
}

export async function getVisitorsLength (req, res) {
  try {
    const visitorLength = await Visitor.count()

    return res.json({
      took: 200,
      status: 'OK',
      data: visitorLength,
      dataLength: null,
      error: null
    })
  } catch (error) {
    return res.json({
      took: 200,
      status: 'OK',
      data: null,
      dataLength: null,
      error: { error: error.errors.cookie.message }
    })
  }
}
