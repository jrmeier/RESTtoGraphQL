import mongoose from 'mongoose'
import { User } from './User'

export async function connectToDatabase () {
  const options = { useNewUrlParser: true, useFindAndModify:false }
  await mongoose.connect('mongodb://localhost/demo', options)
  return await mongoose.connection
}
