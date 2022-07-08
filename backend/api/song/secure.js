import { helpers } from '../../lib/helpers.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpcode.js'

export const chekToken = async (req, res, next) => {
  const token = req.headers['x-acces-token'] || req.headers['authorization'] || ''
  if (token) {
    try {
      const verify = await helpers.verifyToken(token)
      if (verify) {
        console.log('token valido')
        next()
      } else {
        console.log('token invalido')
        return response.error(req, res, 'token invalid', HttpStatusCode.UNAUTHORIZED)
      }
    } catch (error) {
      console.log('token invalid')
      return response.error(req, res, 'token invalid', HttpStatusCode.UNAUTHORIZED)
    }
  } else {
    return response.error(req, res, 'token not found', HttpStatusCode.UNAUTHORIZED)
  }
}
