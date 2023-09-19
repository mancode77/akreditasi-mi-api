export const successResponse = (res, data, status = 200) => {
  res.status(status).json({
    took: status,
    status: 'success',
    success: true,
    data
  })
}

export const errorResponse = (res, message, status = 500) => {
  res.status(status).json({
    took: status,
    status: 'error',
    success: false,
    message
  })
}

export const notFoundResponse = (res, message = 'Data not found', status = 404) => {
  res.status(status).json({
    took: status,
    status: 'error',
    success: false,
    message
  })
}

export const validationErrorResponse = (
  res,
  errors,
  message = 'Validation failed',
  status = 400
) => {
  res.status(status).json({
    took: status,
    status: 'error',
    success: false,
    message,
    errors
  })
}

export const rateLimitResponse = (
  res,
  message = 'Rate limit exceeded',
  status = 429
) => {
  res.status(status).json({
    took: status,
    status: 'error',
    success: false,
    message
  })
}

export const unauthorizedResponse = (res, message = 'Unauthorized', status = 401) => {
  res.status(status).json({
    took: status,
    status: 'error',
    success: false,
    message
  })
}

export const conflictResponse = (res, message = 'Conflict', status = 409) => {
  res.status(status).json({
    took: status,
    status: 'error',
    success: false,
    message
  })
}

export const serverErrorResponse = (
  res,
  message = 'Internal Server Error',
  status = 500
) => {
  res.status(status).json({
    took: status,
    status: 'error',
    success: false,
    message
  })
}
