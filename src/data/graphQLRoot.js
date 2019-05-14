import mongoose from 'mongoose'
import {
  updateUserById,
  createNewUser,
  getUser,
  deleteUser,
  deleteUserMany,
  getJoke,
  getJokeById,
  getJokeUsers,
  getUsers,
  updateUser,
  helloWorld,
} from '../userResources'
import Promise from 'bluebird'
import request  from 'superagent-bluebird-promise'

export const graphqlRoot = {
    Hello: (args, context) => {
      return helloWorld(args.name)
    },
    Joke: async (args, context) => {
      return getJoke(args.id)
    },
    UserMany: async (args, context) => {
      return await getUsers(args.filter)
    },
    UserOne: async (args, context) => {

      return await getUser(args.filter)
    },
    UserUpdateOne: async (args, context) => {

      return await updateUser(args.filter, args.record)
    },
    UserCreateOne: async (args, context) => {
      return await createNewUser(args.record)
    },
    UserRemoveOne: async (args, context) => {
      return await deleteUser(args.filter)
    }
}
