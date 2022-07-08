import GeneralController from './Controller.js'
import GeneralRouter from './Routes.js'
// import { DataJson } from '../../store/DataJson.js'
import { Role, AccountType } from '../../entity/User.js'
import gender from '../../entity/Gender.js'
import { HttpStatusCode } from '../../response/httpcode.js'
import { response } from '../../response/response.js'

// import { DataPostgresql } from '../../store/DbPostgresql.js'
import { DBMongo } from '../../store/DBMongo.js'

export const generalModule = (table, expresRouter) => {
  // const userErvices = new DataJson()
  // const userServices = new DataPostgresql()
  let generalController

  const generalServices = new DBMongo()

  if (table === 'role') {
    generalController = new GeneralController(table, generalServices, Role)
  } else if (table === 'account') {
    generalController = new GeneralController(table, generalServices, AccountType)
  } else {
    generalController = new GeneralController(table, generalServices, gender)
  }

  const generalRouter = new GeneralRouter(expresRouter, generalController, response, HttpStatusCode)
  return generalRouter._router
}
