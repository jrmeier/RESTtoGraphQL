import express from 'express'
import { userGetHandler, userPostHandler, userPutHandler, userDeleteHandler } from './userHandler'
import { connectToDatabase } from './data/database'
import bodyParser from 'body-parser'

const app = express()
const db = connectToDatabase()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//user stuffs
app.get('/user', userGetHandler(db))
app.post('/user', userPostHandler(db))
app.put('/user', userPutHandler(db))
app.delete('/user', userDeleteHandler(db))

app.listen(4000, () => console.log("listening at port 4000"))