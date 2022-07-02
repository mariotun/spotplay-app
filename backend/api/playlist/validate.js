import { response } from '../../response/response.js'
import expressValidation from 'express-validator'

const check = expressValidation.check
const validationResult = expressValidation.validationResult
export const validateCreatePlaylist = [
  check('name')
    .exists()
    .isLength({ min: 3 })
    .withMessage('Name should be at least 3 characters'),
  check('avatar')
    .exists()
    .isURL()
    .withMessage('Please enter a valid avatar'),
  check('duration')
    .exists()
    .isInt()
    .withMessage('Please enter a valid duration'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      next()
    } catch (error) {
      response.error(req, res, error.array()[0].msg, 400)
    }
  }
]
