import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization')
  console.log('Auth header received:', authHeader)

  if (!authHeader) {
    console.log('No authorization header')
    return res.status(401).json({ message: 'Access denied - no authorization header' })
  }

  const token = authHeader.replace('Bearer ', '')
  console.log('Token extracted:', token.substring(0, 20) + '...')

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Token verified for user:', verified)
    req.user = verified
    next()
  } catch (error) {
    console.log('Token verification error:', error.message)
    res.status(400).json({ message: 'Invalid token', error: error.message })
  }
}

export default auth