import mongoose, { Schema } from 'mongoose'
import { getJokeUsers } from '../userResources'
export const UserSchema = new mongoose.Schema(
  {
    email: Schema.Types.String,
    name: Schema.Types.String,
    favorite_joke_id: Schema.Types.String,
    birthdate: Schema.Types.Date,
    created: {
      type: Schema.Types.Date,
      default: new Date()
    }
  },
  {
    vituals:{
      toObject:true,
      toJSON: true,
    },
    collection: 'users'
  }
)

UserSchema.virtual('favorite_joke').get( async function(){
  let url = `https://icanhazdadjoke.com/j/${this.favorite_joke_id}`

  // const joke = await request.get(url).set('Accept', 'application/json')
  // if(joke.body.status=== 200 ){
  //   return joke.body
  // } 
  const joke = new mongoose.models.Joke({
    line: "A horse walks into a bar. The bar tender says \"Hey.\" The horse says \"Sure.\"",
    id: '123',
    users: await getJokeUsers('123')
  })
  return joke
})

UserSchema.virtual('age').get( async function () {
  return (new Date().getFullYear() - new Date(this.birthdate).getFullYear())
})

export const User = mongoose.model('User', UserSchema)

export const JokeSchema = new mongoose.Schema(
  {
    id: Schema.Types.String,
    line: Schema.Types.String,
    users: [UserSchema]
  }
)


export const Joke = mongoose.model('Joke', JokeSchema)
