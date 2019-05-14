import express from 'express'
import { userGetHandler, userPostHandler, userPutHandler, userDeleteHandler } from './userHandler'
import { connectToDatabase } from './data/database'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'
import { graphqlSchemaBasic, graphqlRootBasic } from './graphQLHandler'

const app = express()
const db = connectToDatabase()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP({
  schema: graphqlSchemaBasic,
  rootValue: graphqlRootBasic,
  graphiql: true,
  context: db
}))
//REST stuffs
app.get('/user', userGetHandler(db))
app.post('/user', userPostHandler(db))
app.put('/user', userPutHandler(db))
app.delete('/user', userDeleteHandler(db))


// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// })


app.listen(6000, () => console.log("listening at port 6000"))