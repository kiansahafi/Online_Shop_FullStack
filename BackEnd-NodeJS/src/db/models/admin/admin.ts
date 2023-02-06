import mongoose, { Schema, Document, ObjectId as objectId } from "mongoose"

export interface IAdmin extends Document {
  username: string
  password: string
}

const adminSchema = new Schema<IAdmin>({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})


adminSchema.methods.toJSON = function() {
  const admin = this
  const adminObject = admin.toObject()
  
  // Deleting user password
  delete adminObject.password

  return adminObject
}


const Admin = mongoose.model<IAdmin>("Admin", adminSchema)

export default Admin
