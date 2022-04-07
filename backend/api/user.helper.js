import jwt from 'jsonwebtoken';

export const getUser = async (req) => {
  let decoded
  if (req.cookies.token) {
    const token = req.cookies.token
    decoded = await jwt.verify(token, process.env.JWT_SECRET)
  }
  return decoded.id
}