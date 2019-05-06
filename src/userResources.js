import request from 'request'
import { objectExpression, objectTypeAnnotation, conditionalExpression } from '@babel/types';

export const updateUserById = async (db, filter, updateObject) => {
  console.log(filter, updateObject)
  const res = await db.models.User.findOneAndUpdate(filter, updateObject)

  console.log("reS: ",res)
  return res
}

export const createNewUser = async (db, newUserObject) => 
  await new db.models.User(newUserObject).save()

export const deleteUser = async (db, filter) => {
  console.log(filter)
  return await db.models.User.findOneAndRemove(filter)
}
export const deleteUserMany = async (db, filter) => {
  return await db.models.User.deleteMany(filter)
}

export const getUser = async (db, param) => {
  console.log(param)
  return await db.models.User.find({...param})
}
export const getAllUsers = async db => await db.models.User.find()

export const getJoke = async ({id = null}) => {
  const headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Accept': 'application/json'
  }
  let url = 'https://icanhazdadjoke.com'
  if(id){
    url += '/j/'+id.toString()
  }
  const options = {
    url,
    method: 'GET',
    headers: headers,
  }

  const final = {}

  request(options, (error, response, body) => {
    if(!error) {
        final.id = body.id,
        final.joke = body.joke
    }

  })

  return final
} 

export const getJokeById = async (id) => {
  return getJoke(id)
}