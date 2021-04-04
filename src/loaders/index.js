const ExpressServer = require('./server/expressServer')
const mongooseLoader = require('./mongoose')
const config = require('../config')
const logger = require('./logger')

const startServer = async () => {

  await mongooseLoader()
  logger.info('DB cargada y conectada')

  const server = new ExpressServer()
  logger.info('Express cargado.')

  server.start()
  logger.info(`** Servidor escuchando en el puerto: ${config.port} **`)

}

module.exports = startServer
