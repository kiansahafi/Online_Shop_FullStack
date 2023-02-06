import mongoose, { Document, Schema, ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

export interface IComment extends Document {
  product: objectId
  user: objectId
  message: string
  isVerified: boolean
  createAt: Date
  updatedAt: Date
}

const commentSchema = new Schema<IComment>({
  product: {
    type: ObjectId,
    required: true,
    ref: 'Product'
  },
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  message: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, { 
  timestamps: true
})

const Comment = mongoose.model<IComment>('Comment', commentSchema)

export default Comment