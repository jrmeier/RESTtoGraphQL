import mongoose, { Schema } from 'mongoose'

export const UserSchema = new mongoose.Schema(
  {
    email: Schema.Types.String,
    name: Schema.Types.String
  },
  {
    collection: 'users'
  }
)

export const User = mongoose.model('User', UserSchema)