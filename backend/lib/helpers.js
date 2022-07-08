import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config/defaults.js'

export const helpers = {
  encryptPassword: (password) => {
    return bcrypt.hashSync(password, 10)
  },
  comparePassword: (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword)
  },
  generateToken: (idUser) => {
    return jwt.sign({
      id: idUser
    }, config.jwt.secret, {
      expiresIn: '5Minutes'
    })
  },
  verifyToken: (token) => {
    return jwt.verify(token, config.jwt.secret)
  }

}
