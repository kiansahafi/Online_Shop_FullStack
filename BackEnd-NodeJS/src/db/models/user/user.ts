import mongoose, { Schema, Document, ObjectId as objectId } from "mongoose"

const ObjectId = mongoose.Types.ObjectId

export interface IUser extends Document {
  name: string
  username: string
  phone: string
  password: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  name: { 
    type: String
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String
  },
  password: { 
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()

  // Deleting user password
  delete userObject.password

  return userObject
}

const User = mongoose.model<IUser>("User", userSchema)

export default User
