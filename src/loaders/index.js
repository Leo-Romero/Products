const ExpressServer = require('./server/expressServer')
const config = require('../config')
const logger = require('./logger')

const startServer = async () => {

  const server = new ExpressServer()
  logger.info('Express cargado.')

  server.start()
  logger.info(`** Servidor escuchando en el puerto: ${config.port} **`)

}

module.exports = startServer
