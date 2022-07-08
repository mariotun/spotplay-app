import ArtistController from './Controller.js'
import ArtistRouter from './Router.js'
// import { DataJson } from '../../store/DataJson.js'
import Artist from '../../entity/Artist.js'
import { HttpStatusCode } from '../../response/httpcode.js'
import { response } from '../../response/response.js'
import { validateCreateArtist } from './validate.js'

import { DBMongo } from '../../store/DBMongo.js'

export const artistModule = (expresRouter) => {
  const artistServices = new DBMongo()
  const artistController = new ArtistController(artistServices, Artist)
  const artistRouter = new ArtistRouter(expresRouter, artistController, response, HttpStatusCode, validateCreateArtist)
  return artistRouter._router
}
