// Propiedades del entorno
const dotenv = require('dotenv')

// si no existe .env
const envFound = dotenv.config()
if(!envFound) {
  throw new Error('No se encuentra archivo .env')
}

// entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  port: process.env.PORT,
  api: {
    prefix: '/api/v1'
  },
  log: {
    level: process.env.LOG_LEVEL
  },
  swagger: {
    path: '/api-docs'
  },
  databaseURL: process.env.DATABASE_URL,
  auth: {
    secret: process.env.AUTH_SECRET,
    ttl: process.env.AUTH_TTL
  }
}