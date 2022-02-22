import jwt from 'jsonwebtoken'

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userData = {
      email: tokenDecoded.email,
      type: tokenDecoded.type
    }
    next();
  } catch (err) {
    res.status(401).json({success: false, message: `Auth failed: ${err.message}`})
  }
}

export default checkAuth;