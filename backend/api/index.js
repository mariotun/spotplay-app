import MiServidor from './Server.js'
import { config } from '../config/defaults.js'

function main (api) {
  const server = new MiServidor(api)
  server.start()
}

main(config.api)
