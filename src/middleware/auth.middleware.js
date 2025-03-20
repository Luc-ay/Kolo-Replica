import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(403).json({ message: 'No token provided' })
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    req.user = decoded // Attach user info to request
    next()
  })
}

export default verifyToken
