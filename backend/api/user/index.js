import express from 'express'
import UserController from './Controller.js'
import UserRouter from './Routes.js'
import { DataJson } from '../../store/DataJson.js'
import User from '../../entity/User.js'
import { helpers } from '../../lib/helpers.js'
import { HttpStatusCode } from '../../response/httpcode.js'
import { response } from '../../response/response.js'

export const userModule = (expresRouter) => {
  const userErvices = new DataJson()
  const userController = new UserController(userErvices, User, helpers.encryptPassword)
  const userRouter = new UserRouter(express.Router, userController, response, HttpStatusCode)
  return userRouter._router
}
