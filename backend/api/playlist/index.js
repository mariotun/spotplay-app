import PlaylistController from './Controller.js'
import PlaylistRouter from './Router.js'
import { DataJson } from '../../store/DataJson.js'
import { Playlist } from '../../entity/Playlist.js'
import { HttpStatusCode } from '../../response/httpcode.js'
import { response } from '../../response/response.js'
import { validateCreatePlaylist } from './validate.js'

export const playlistModule = (expresRouter) => {
  const playlistErvices = new DataJson()
  const playlistController = new PlaylistController(playlistErvices, Playlist)
  const playlistRouter = new PlaylistRouter(expresRouter, playlistController, response, HttpStatusCode, validateCreatePlaylist)
  return playlistRouter._router
}
