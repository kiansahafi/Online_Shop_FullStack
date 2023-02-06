import { ObjectId as objectId } from 'mongoose'

import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import Comment from './comment'
import filesHelper from '../../../utils/helpers/files'
import Product from '../product/product'

const addComment = async (
  newComment: { 
    productId: string
    userId: string
    message: string
  }
): Promise<IResponse> => {
  try {
    const { productId, userId, message } = newComment

    // Finding product
    const product = await Product.findById(productId).exec()
    if(!product) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.commentService.productNotFound
        }
      }
    }

    // Creating the new comment
    let addedComment = await Comment.create({
      product: productId,
      user: userId,
      message
    })
    addedComment = await addedComment.populate('product', '_id title')
    addedComment = await addedComment.populate('user', 'name username')

    return {
      success: true,
      outputs: {
        comment: addedComment
      }
    }

  } catch(error) {
    console.log('Error while creating the new comment: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const getComment = async (commentId: string): Promise<IResponse> => {
  try {
    // Find and return the comment
    const comment = await Comment.findById(commentId)
      .populate('user', 'name username')
      .populate('product', '_id title').exec()

    if(!comment) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    return {
      success: true,
      outputs: { comment }
    }

  } catch(error) {
    console.log('Error while getting the comment: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

//--------------------------------------------------

const getComments = async (isVerified: string | undefined): Promise<IResponse> => {
  try {
    let filter = {}
    if(isVerified == 'true') {
      filter = { isVerified: true }

    } else if(isVerified == 'false') {
      filter = { isVerified: false }
    }

    const comments = await Comment.find(filter)
      .populate('user', 'name username')
      .populate('product', '_id title').exec()

    return {
      success: true,
      outputs: {
        comments
      }
    }

  } catch(error) {
    console.log('Error while getting users: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const getCommentsByProductId = async (
  productId: string,
  options: {
    limit?: number
    skip?: number
    sortBy?: string
    sortOrder?: string
    search?: string
  }
): Promise<IResponse> => {
  try {
    const { limit, skip, sortBy, sortOrder, search } = options

    // Create and fill the query options object
    const queryOptions: { [key: string]: any } = {}
    
    if(limit) {
      queryOptions['limit'] = limit
    }
    if(skip) {
      queryOptions['skip'] = skip
    }
    if(sortBy) {
      queryOptions['sort'] = {}
      queryOptions['sort'][`${sortBy}`] = sortOrder || 'asc'
    }

    const filter: { [key: string]: any } = { product: productId, isVerified: true }
    if(search) {
      filter.message = { $regex: search }
    }

    // Fetch the comments
    const count = await Comment.countDocuments(filter)
    let comments = await Comment.find(filter, {}, queryOptions)
      .populate('user', 'name username')
      .populate('product', '_id title').exec()

    return {
      success: true,
      outputs: { 
        count,
        comments
      }
    }

  } catch(error) {
    console.log('Error while getting the comments by product id: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const deleteComment = async (commentId: string, userId?: string): Promise<IResponse> => {
  try {
    if(userId){    
      // Find and delete the comment (by user)
      await Comment.findOneAndDelete({ _id: commentId, user: userId }).exec()
    } else {
      // Find and delete the comment (by admin)
      await Comment.findByIdAndDelete(commentId).exec()
    }

    return {
      success: true
    }
    
  } catch(error) {
    console.log('Error while deleting the comments: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

//---------------------------------------------

const verifyComment = async (commentId: string): Promise<IResponse> => {
  try {
    // Verifying user
    const comment = await Comment.findByIdAndUpdate(commentId, { isVerified: true }).exec()

    if(!comment) {
      return {
        success: false,
        error: {
          message: errorMessages.commentService.noSuchComment,
          statusCode: statusCodes.badRequest
        }
      }
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while verifying comment: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

export default {
  addComment,
  getComment,
  getComments,
  getCommentsByProductId,
  deleteComment,
  verifyComment
}