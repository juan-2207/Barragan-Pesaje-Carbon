const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  if (err.name === 'ZodError') {
    return res.status(400).json({ message: 'Validation error', errors: err.errors })
  }

  if (err.code && err.code.startsWith('P')) { // Prisma errors
    return res.status(400).json({ message: 'Database error', error: err.message })
  }

  res.status(500).json({ message: 'Internal server error' })
}

export default errorHandler