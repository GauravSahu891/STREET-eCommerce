/**
 * Sends a standardised success response.
 */
const sendSuccess = (res, statusCode = 200, message = 'Success', data = {}) => {
  res.status(statusCode).json({ success: true, message, data })
}

/**
 * Sends a standardised error response.
 */
const sendError = (res, statusCode = 500, message = 'Something went wrong') => {
  res.status(statusCode).json({ success: false, message })
}

/**
 * Builds a pagination meta object.
 */
const paginationMeta = (total, page, limit) => ({
  total,
  page:       Number(page),
  limit:      Number(limit),
  totalPages: Math.ceil(total / limit),
  hasNext:    page * limit < total,
  hasPrev:    page > 1,
})

module.exports = { sendSuccess, sendError, paginationMeta }
