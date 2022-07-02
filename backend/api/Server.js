import express from 'express'
import { songModule } from './song/index.js'
import cors from 'cors'
import morgan from 'morgan'

import { userModule } from './user/index.js'

class Server {
  constructor (config) {
    this._app = express()
    this._port = config.port
    this._hostname = config.hostname
    this._name = config.name
    this.setMiddlewares()
    this.setRoutes()
  }

  setMiddlewares () { // verifica que se cumplan esta conficuraciones
    this._app.use(express.json())// verifica que los datos esten en formato json
    this._app.use(express.urlencoded({ extended: true }))// para decodificar los datos que entrar y salen del servidor
    this._app.use(cors())
    this._app.use(morgan('dev'))
  }

  setRoutes () {
    this._app.use('/api/v1/song', songModule())
    this._app.use('/api/v1/user', userModule())
  }

  start () {
    this._app.set(this._hostname)
    this._app.listen(this._port, () => {
      console.log(`${this._name} is running on http://${this._hostname}:${this._port}`)
    })
  }
}

export default Server
