import express from 'express'
import SongRuter from './Router.js'
import SongController from './Controller.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpcode.js'
import { DataJson } from '../../store/DataJson.js'
import Song from '../../entity/Song.js'

export const songModule = () => {
  const servicesSong = new DataJson()
  const songControll = new SongController(servicesSong, Song)
  const songRuter = new SongRuter(express.Router, songControll, response, HttpStatusCode)
  return songRuter._router
}
