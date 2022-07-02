import { response } from '../../response/response.js'
import expressValidation from 'express-validator'

const check = expressValidation.check
const validationResult = expressValidation.validationResult
export const validateCreateArtist = [
  check('firstname')
    .exists()
    .isLength({ min: 3 })
    .withMessage('Firstname should be at least 3 characters'),
  check('lastname')
    .exists()
    .isLength({ min: 3 })
    .withMessage('Lastname should be at least 3 characters'),
  check('avatar')
    .exists()
    .isURL()// { protocols: ['https'] }
    .withMessage('Avatar should be at least 3 characters'),
  check('country')
    .exists()
    .isLength({ min: 3 })
    .withMessage('Country should be at least 3 characters'),
  check('birthday')
    .exists()
    .isDate()
    .withMessage('Please enter a valid birthday '),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      next()
    } catch (error) {
      response.error(req, res, error.array()[0].msg, 400)
    }
  }
]
