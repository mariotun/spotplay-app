import ArtistController from './Controller.js'
import ArtistRouter from './Router.js'
import { DataJson } from '../../store/DataJson.js'
import Artist from '../../entity/Artist.js'
import { HttpStatusCode } from '../../response/httpcode.js'
import { response } from '../../response/response.js'
import { validateCreateArtist } from './validate.js'

export const artistModule = (expresRouter) => {
  const artistErvices = new DataJson()
  const artistController = new ArtistController(artistErvices, Artist)
  const artistRouter = new ArtistRouter(expresRouter, artistController, response, HttpStatusCode, validateCreateArtist)
  return artistRouter._router
}
