import { buildSchema } from 'graphql'
// var PersonType = new GraphQLObjectType({
//   name: 'Person',
//   fields: () => ({
//     name: { type: GraphQLString },
//     bestFriend: { type: PersonType },
//   })
// });
export const UserGraphSchema = buildSchema(`
""" User Schema looks like this """
type GraphQLObjectType {
  name: 'User,
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  })
}
  """
  Basic query examples
  """
  type Query {
    getUserById(id: ID!): User
  }
`)

export const UserGraph = {
  getUserById: (args) => {
    return {
      name: 'Bob Ross',
      email: 'bobr@gmail.com'
    }
  }
}