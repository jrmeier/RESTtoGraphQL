import mongoose from 'mongoose'
import { buildSchema } from 'graphql'
import {
  updateUserById,
  createNewUser,
  getUser,
  deleteUser,
  deleteUserMany,
  getJokeById
} from './userResources'
export const graphqlSchemaBasic = buildSchema(`
scalar Date
"""
Only Oneliners and Dad jokes are avaliable
"""
  enum JokeTypeEnum {
     OneLiner
     DadJoke
  }

  type JokeType {
    type: JokeTypeEnum
    joke: String
    id: String
  }

  type UserType {
    email: String
    name: String
    phone_number: String
    zip_code: String
    created: Date
    _id: String
    favorite_joke: JokeType

  }

  input UserInputType {
    email: String,
    name: String
    phone_number: String,
    zip_code: String
    _id: String
    favorite_joke_id: String
  }

  type RemoveManyType {
    numRemoved: Int
  }

  """
  Basic usage
  """
  type Query {
    UserOne(filter: UserInputType): UserType
    UserMany(filter: UserInputType): [UserType]
  }

  type Mutation {
    UserCreateOne(record: UserInputType!): UserType
    UserUpdateOne(filter: UserInputType, record: UserInputType): UserType
    UserUpdateMany(filter: UserInputType, record: [UserInputType]): [UserType]
    UserRemoveOne(filter: UserInputType!): UserType
    UserRemoveMany(filter: UserInputType!): RemoveManyType
  }
`)

  // type Mutatation {
  //   UserUpdateOne({filter: UserTypeInput, record: UserTypeInput}): UserType
  // }

export const graphqlRootBasic = {
  UserMany: async (args, context) => {
    const db = await context
    return await getUser(db, args.filter)
  },
  UserOne: async (args, context) => {
    const db = await context
    const user = (await getUser(db, args.filter)).shift()
    const { favorite_joke_id } = user
    const joke = await getJokeById({id: favorite_joke_id})
    console.log(joke)
    return {
      ...user,
      favorite_joke: {
        id: "12",
        joke: "So a blind guy walks into a bar. He never saw it coming."
      }
    }
  },
  joke: (args) => {
    const { JokeType } = args
    return "going to get the joke now"
  },
  UserUpdateOne: async (args, context) => {
    const db = await context
    const {
      filter,
      record
    } = args
    const res = await updateUserById(db, filter, {$set: record})
    console.log(res)
    return res
  },
  UserUpdateMany: async (args, context) => {
    const db = await context
    const {
      filter, 
      record
    } = args
    const res = await update
  },

  UserRemoveOne: async (args, context) => {
    const db = await context
    const {
      filter
    } = args
    return await deleteUser(db, filter)
  },

  UserRemoveMany: async (args, context) => {
    const db = await context
    const { filter } = args
    const { deletedCount }= await deleteUserMany(db, filter)
    return {
      numRemoved: deletedCount
    }
  },

  UserCreateOne: async (args, context) => {
    const db = await context
    const { record } = args
    return await createNewUser(db, record)
  }

}

// const async 


// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// })
