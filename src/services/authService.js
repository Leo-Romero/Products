const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('./userService')
const AppError = require('../errors/appError')
//const logger = require('../loaders/logger')
const config = require('../config')

const login = async(email, password) => {
  try {
    // validacion de email
    const user = await userService.findByEmail(email)

    if(!user) {
      throw new AppError('Authentication failed! Email / password does not correct.', 400)
    }

    // validacion de usuario habilitado
    if(!user.enable) {
      throw new AppError('Authentication failed! User disabled.', 400)
    }

    // validacion de password
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) {
      throw new AppError('Authentication failed! Email / password does not correct.', 400)
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

_encrypt = (id) => {
  return jwt.sign({ id }, config.auth.secret, {expiresIn: config.auth.ttl})
}

module.exports = {
  login
}