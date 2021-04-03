//const express = require('express')

/*
*
* @param {express.Request} req
* @param {express.Response} res
*/
const getAllUsers = (req, res) => {

  /* throw new Error('Error de testeo') */
  const users = [
    {
      id: 1,
      name: 'Juan'
    },
    {
      id: 2,
      name: 'Pedro'
    },
    {
      id: 3,
      name: 'Jose'
    }
  ]
    
  // Ejemplo de error sencillo lo ideal seria instanciar una nueva clase de error
  /* let error = new Error('Ha ocurrido un error inesperado...')
    error.code = 504
    throw error */

  res.json(users)
}

/*
*
* @param {express.Request} req
* @param {express.Response} res
*/
const createUser = (req, res) => {
  const user = req.body
  user.id = 123

  const result = {
    message: 'Usuario creado',
    user
  }
  res.status(201).json(result)
}

/*
*
* @param {express.Request} req
* @param {express.Response} res
*/
const updateUser = (req, res) => {
  const {id} = req.params
  const user = req.body
    
  user.id = id

  const result = {
    message: 'Usuario modificado',
    user
  }
  res.json(result)
}

/*
*
* @param {express.Request} req
* @param {express.Response} res
*/
const updatePartialUser = (req, res) => {
  const result = {
    message: 'Usuario modificado con patch'
  }
  res.json(result)
}

/*
*
* @param {express.Request} req
* @param {express.Response} res
*/
const deleteUser = (req, res) => {
  const result = {
    message: 'Usuario eliminado'
  }
  res.json(result)
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  updatePartialUser,
  deleteUser
}