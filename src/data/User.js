import mongoose, { Schema } from 'mongoose'

export const UserSchema = new mongoose.Schema(
  {
    email: Schema.Types.String,
    name: Schema.Types.String,
    phone_number: Schema.Types.String,
    zipcode: Schema.Types.String,
    created: {
      type: Schema.Types.Date,
      default: new Date()
    }
  },
  {
    collection: 'users'
  }
)

export const User = mongoose.model('User', UserSchema)