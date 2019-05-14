import mongoose from 'mongoose'
import request from 'superagent-bluebird-promise'
import Promise from 'bluebird'


export const helloWorld = (name = 'World') =>
  `Hello, ${name}`
  

export const updateUser = async (filter, updateObject) => {
  return await mongoose.models.User.findOneAndUpdate(filter, updateObject)
}

export const createNewUser = async (newUserObject) => {
  return await new mongoose.models.User(newUserObject).save()
}

export const deleteUser = async ( filter) => {
  return await mongoose.models.User.findOneAndRemove(filter)
}
export const deleteUserMany = async (db, filter) => {
  return await mongoose.models.User.deleteMany(filter)
}

export const getUsers = async( param) => {
  const users = await mongoose.models.User.find({...param})
  return users

}

export const getUser = async (param) => {
  const user = await mongoose.models.User.findOne({...param})
  user.age = getAge(user.birthdate)
  return user.toJSON({virtuals: true})
}

const getAge = birthdate =>
  (new Date().getFullYear() - new Date(birthdate).getFullYear())

  export const getAllUsers = async db => await mongoose.models.User.find()

export async function getJoke (id = null)  {
  let url = 'https://icanhazdadjoke.com'
  if( id ){
    url += url+`/j/${id}`
  }
  // const joke = await request.get(url).set('Accept', 'application/json').then(x=>console.log(x)).catch(e=>console.log("Wtf: ",e))
  // if(joke.body.status=== 200 ){
  //   return joke.body
  // } 
  const joke = new mongoose.models.Joke({
    line: "",
    id: '123',
  })

  return joke
} 


export const getJokeUsers = async ( id) => {
  const users = await mongoose.models.User.find({favorite_joke_id: id})
  return users
}