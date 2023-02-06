import mongoose, { Document, Schema, ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId
import { IComment } from "../comment/comment"

export interface IProduct extends Document {
  title: string
  description: string
  image: string
  price: number
  comments?: IComment[]
  createAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  }
}, { 
  timestamps: true
})

productSchema.methods.toJSON = function() {
  const product = this
  const productObject = product.toObject()

  return productObject
}

productSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'product'
})

const Product = mongoose.model<IProduct>('Product', productSchema)

export default Product