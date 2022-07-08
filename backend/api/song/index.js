import SongController from './Controller.js'
import SongRouter from './Router.js'
import { Song } from '../../entity/Song.js'
import { HttpStatusCode } from '../../response/httpcode.js'
import { response } from '../../response/response.js'
import { validateCreteSong } from './validate.js'
import { chekToken } from './secure.js'
// import { DataPostgresql } from '../../store/DbPostgresql.js'
import { DBMongo } from '../../store/DBMongo.js'

export const songModule = (expresRouter) => {
  const songServices = new DBMongo()
  const songController = new SongController(songServices, Song)
  const songRouter = new SongRouter(expresRouter, songController, response, HttpStatusCode, validateCreteSong, chekToken)
  return songRouter._router
}
