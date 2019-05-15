import { buildSchema } from 'graphql'

export const graphqlSchema = buildSchema(`
  scalar Date
  
  type JokeType {
    line: String
    id: String
    users: [UserType]
  }

  type UserType {
    name: String
    age: Int
    email: String
    created: Date
    favorite_joke: JokeType
    favorite_joke_id: String
    birthdate: Date
    _id: String

  }

  input UserInputType {
    email: String
    name: String
    birthdate: Date
    favorite_joke_id: String
    _id: String
  }

  type Query {
    """
    HelloWorld
    """
    Hello(name: String): String

    """
    Returns a single user matching the filter criteria
    """
    UserOne(filter: UserInputType): UserType
    
    """
    This is actually coming from a third party REST API
    """
    Joke(id: String): JokeType

    UserMany(filter: UserInputType): [UserType]
  }

  type Mutation {
    UserCreateOne(record: UserInputType!): UserType
    UserUpdateOne(filter: UserInputType, record: UserInputType): UserType
    UserRemoveOne(filter: UserInputType!): UserType
  }
`)