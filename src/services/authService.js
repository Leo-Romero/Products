const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('./userService')
const AppError = require('../errors/appError')
const logger = require('../loaders/logger')
const config = require('../config')

const login = async(email, password) => {
  try {
    // validacion de email
    const user = await userService.findByEmail(email)

    if(!user) {
      throw new AppError('Authentication failed! Email / password does not correct.', 401)
    }

    // validacion de usuario habilitado
    if(!user.enable) {
      throw new AppError('Authentication failed! User disabled.', 401)
    }

    // validacion de password
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) {
      throw new AppError('Authentication failed! Email / password does not correct.', 401)
    }

    // generar el JWT
    const token = _encrypt(user._id)

    return {
      token,
      user: user.name,
      role: user.role
    }

  } catch (error) {
    throw error
  }
}

const validToken = async (token) => {
  try {
    // validar que el token venga como parametro
    if(!token) {
      throw new AppError('Authentication failed! Token required', 401)
    }
    logger.info(`Token received. ${token}`)

    // validar que el token sea integro
    let id
    try {
      const obj = jwt.verify(token, config.auth.secret)  // directamente si hay un error larga una excepcion
      id = obj.id
    } catch (verifyError) {
      throw new AppError('Authentication failed! Invalid token', 401)
    }
    logger.info(`User id in the token: ${id}`)

    // validar si hay usuario en la bd
    const user = await userService.findById(id)
    if(!user) {
      throw new AppError('Authentication failed! Invalid token', 401)
    }

    // validar si usuario esta habilitado
    if(!user.enable) {
      throw new AppError('Authentication failed! User disabled', 401)
    }

    // retorna el usuario
    return user

  } catch (error) {
    throw error
  }
}

const validRole = (user, ...roles) => {
  if(!roles.includes(user.role)) {
    throw new AppError('Authentication failed! User without the privileges.', 403)
  }
  return true
}

_encrypt = (id) => {
  return jwt.sign({ id }, config.auth.secret, {expiresIn: config.auth.ttl})
}

module.exports = {
  login,
  validToken,
  validRole
}