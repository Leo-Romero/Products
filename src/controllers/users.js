//const express = require('express')
const User = require('../models/user')

/*
*
* @param {express.Request} req
* @param {express.Response} res
*/
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

/*
*
* @param {express.Request} req
* @param {express.Response} res
*/
const createUser = async (req, res, next) => {
  try {
    let user = req.body
    user = await User.create(user)
  
    const result = {
      message: 'Usuario creado',
      user
    }
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

/*
*
* @param {express.Request} req
* @param {express.Response} res
*/
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    let user = req.body
    user._id = id
  
    await User.updateOne(user)
  
    const result = {
      message: 'Usuario modificado',
      user
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
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
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    user.remove()
  
    const result = {
      message: 'Usuario eliminado'
    }
    res.json(result)  
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  updatePartialUser,
  deleteUser
}