import mongoose from 'mongoose'
import { buildSchema } from 'graphql'
import {
  updateUserById,
  createNewUser,
  getUser,
  deleteUser,
  deleteUserMany,
  getJoke,
} from './userResources'
export const graphqlSchemaBasic = buildSchema(`
scalar Date
"""
Only Oneliners and Dad jokes are avaliable
"""
  type HelloType {
    message: String
  }

  type JokeType {
    line: String!
    id: String
  }
  enum GroanTypeEnum {
    LOL
    SIGH
    JUST_SAD
  }
  """
  Monitors the delivery of the joke
  """
  type GroanType {
    joke_id: String
    user_id: String
    rating: GroanTypeEnum
  }

  type UserType {
    name: String
    age: Int
    email: String
    created: Date
    favorite_joke: JokeType
    _id: String

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

  type Query {
    """
    HelloWorld
    """
    Hello(name: String): HelloType

    """
    Returns a single user matching the filter criteria
    """
    UserOne(filter: UserInputType): UserType
    
    """
    Returns many users matching the filter criteria
    """
    UserMany(filter: UserInputType, Limit: Int): [UserType]

    """
    There's always a groan, this is how we track it
    """
    Groan: GroanType

    """
    This is actually coming from a third party REST API
    """
    Joke: JokeType
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
  Hello: (args, context) => {
    const { name = "World" } = args
      return {
        message: `Hello, ${name}`
      }
  },
  Joke: async (args, context) => {
    const { id } = args
    const returnObj = {
      line: "",
      id: ""
    }
    
    const joke = await getJoke(id)

    return {
      line: joke.joke,
      id: joke.id
    }
    return returnObj
  },
  UserMany: async (args, context) => {
    const db = await context
    return await getUser(db, args.filter)
  },
  UserOne: async (args, context) => {
    const db = await context
    const user = (await getUser(db, args.filter)).shift().toObject()
    // const { favorite_joke_id } = user
    // console.log(favorite_joke_id)
    // const joke = await getJoke({id: favorite_joke_id})
    // console.log(joke)
    // console.log(user)
    // return {
    //   ...user,
    //   favorite_joke: {
    //     id: '23s',
    //     joke: 'lol'
    //   }
    console.log(Object.keys(user))
    console.log(user)
    return {
      ...user
    }
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
    console.log("asdfasdf")
    const db = await context
    const { filter } = args
    console.log("filter: ", filter, args)
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
