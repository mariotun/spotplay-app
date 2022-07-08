import { response } from '../../response/response.js'
import expressValidation from 'express-validator'

const check = expressValidation.check
const validationResult = expressValidation.validationResult
export const validateCreteSong = [
  check('title')
    .exists()
    .isLength({ min: 3 })
    .withMessage('Title should be atleast 3 characters'),
  check('uri')
    .exists()
    .isURL()
    .withMessage('Please enter a valid uri'),
  check('duration')
    .exists()
    .isInt()
    .withMessage('Please enter a valid duration'),
  check('image')
    .exists()
    .isURL()
    .withMessage('Please enter a valid image'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      next()
    } catch (error) {
      response.error(req, res, error.array()[0].msg, 400)
    }
  }
]
