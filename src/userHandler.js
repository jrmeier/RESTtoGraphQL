import {
  getAllUsers,
  getUser,
  updateUser,
  createNewUser,
  deleteUserById,
  helloWorld
} from './userResources'

import mongoose from 'mongoose'

export const helloHandler = context => async (req, res) => {
  const { query } = req
  const result = helloWorld(query.name)
  return res.send(result)
}

export const userGetHandler = context => async (req, res) => {
  const { query } = req
  const result = await getUser(query)
  return res.send(result)
}

export const userPostHandler = context => async (req, res) => {
  const { body } = req
  const { _id } = body
  const bodyKeys = Object.keys(body)
  if(!bodyKeys.includes('_id')){
    return res.send({error:'_id required to update'})
  }

  delete body[_id]

  const updateObject = {
    $set: {
      ...body
    }
  }
  const result = await updateUser({_id}, updateObject)
  return res.send(result)
}

export const userPutHandler = context => async (req, res) => {
  const { body } = req
  const result = await createNewUser(body)
  return res.send(result)
}

export const userDeleteHandler = context => async (req, res) => {
  const { body } = req
  if(!Object.keys(body).includes('_id')){
    return res.send({error: '_id required to delete'})
  }
  const result = await deleteUserById(body._id)
  return res.send(result)
}
