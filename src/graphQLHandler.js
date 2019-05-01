import { buildSchema } from 'graphql'
export const graphqlSchemaBasic = buildSchema(`
"""
Only Oneliners and Dad jokes are avaliable
"""
  enum JokeTypeInput {
     OneLiner
     DadJoke
  }

  """
  Basic query examples
  """
  type Query {
    getJoke(JokeType: JokeTypeInput!): String
  }
`)

export const graphqlRootBasic = {
  getJoke: (args) => {
    const { JokeType } = args
    return "going to get the joke now"
  },
  hello: (args) => {
    console.log(args)
    return "nice"
  }
}

// const async 


// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// })
