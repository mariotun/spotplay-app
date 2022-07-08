import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

// configuracion de paths
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import { songModule } from './song/index.js'
import { userModule } from './user/index.js'
import { artistModule } from './artist/index.js'
import { playlistModule } from './playlist/index.js'
import { authModule } from './auth/index.js'
import { generalModule } from './general/index.js'

class Server {
  constructor (config) {
    this._app = express()
    this._port = config.port
    this._hostname = config.hostname
    this._name = config.name
    this._dirname = dirname(fileURLToPath(import.meta.url))
    this._swaggerFile = YAML.load(join(dirname(fileURLToPath(import.meta.url)), '../docs/swagger.yaml'))
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
    this._app.use('/api/v1/song', songModule(express.Router))
    this._app.use('/api/v1/user', userModule(express.Router))
    this._app.use('/api/v1/artist', artistModule(express.Router))
    this._app.use('/api/v1/playlist', playlistModule(express.Router))
    this._app.use('/api/v1/auth', authModule(express.Router))
    this._app.use('/api/v1/role', generalModule('role', express.Router))
    this._app.use('/api/v1/account', generalModule('account', express.Router))
    this._app.use('/api/v1/gender', generalModule('gender', express.Router))
    this._app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(this._swaggerFile))
  }

  start () {
    this._app.set(this._hostname)
    this._app.listen(this._port, () => {
      console.log(`${this._name} is running on http://${this._hostname}:${this._port}`)
    })
  }
}

export default Server
