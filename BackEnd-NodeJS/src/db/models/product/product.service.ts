import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import Comment from '../comment/comment'
import Product from './product'
import filesHelper from '../../../utils/helpers/files'

const addProduct = async (
  newProduct: {
    title: string
    description: string
    image: Express.Multer.File | undefined
    price: number
  }
): Promise<IResponse> => {
  try {
    const { title, description, image, price } = newProduct

    // Checking for availability
    const existingProduct = await Product.findOne({ title }).exec()
    if(existingProduct) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.shared.nameMustBeUnique
        }
      }
    }

    // Saving the image
    let fileName: string = ''
    if(image) {
      fileName = filesHelper.saveFile(image)
    }

    // Creating the new product
    const addedProduct = await Product.create({
      title,
      description,
      image: fileName,
      price
    })

    return {
      success: true,
      outputs: {
        product: addedProduct
      }
    }

  } catch(error) {
    console.log('Error while creating the new product: ', error)
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

const getProduct = async (productId: string): Promise<IResponse> => {
  try {
    // Find and return the product
    const product = await Product.findById(productId).exec()
    if(!product) {
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
      outputs: { product }
    }

  } catch(error) {
    console.log('Error while getting the product: ', error)
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

const getProducts = async (
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

    const filter: { [key: string]: any } = {}
    if(search) {
      filter.title = { $regex: search }
    }

    // Fetch the products
    const count = await Product.countDocuments(filter)
    let products = await Product.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: { 
        count,
        products
      }
    }

  } catch(error) {
    console.log('Error while getting the products: ', error)
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

const editProduct = async ( 
  productId: string, 
  updates: { 
    title?: string
    description?: string 
    image?: Express.Multer.File | undefined | string
    price?: number 
  }
): Promise<IResponse> => {
  try { 
    // Make sure the record exists
    const product = await Product.findOne({ _id: productId }).exec()
    if(!product) {
      return {
        success:false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    // Make sure there are changes in updates
    if((Object.keys(updates)).length === 0) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.shared.noChanges
        }
      }
    }

    // Checking for availability
    if(updates.title) {
      const { title } = updates
      const existingProduct = await Product.findOne({ title }).exec()
      if(existingProduct && existingProduct._id.toString() ==! productId) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.shared.nameMustBeUnique
          }
        }
      }
    }

    // Saving the image in the database
    if(updates.image) {
      filesHelper.deleteFile(product.image)
      const fileName = filesHelper.saveFile(updates.image as Express.Multer.File)
      updates.image = fileName
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true }).exec()
    return {
      success: true,
      outputs: {
        product: updatedProduct
      }
    }

  } catch(error) {
    console.log('Error while updating the product: ', error)
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

const deleteProduct = async (productId: string): Promise<IResponse> => {
  try {
    // Find and delete the product
    const deletedProduct = await Product.findByIdAndDelete(productId)
      .populate('comments', '_id').exec()
    if(deletedProduct) {
      // Delete comments of the deleted product
      if(deletedProduct.comments) {
        for(const comment of deletedProduct.comments) {
          await Comment.findByIdAndDelete(comment._id).exec()
        }
      }
    }

    return {
      success: true
    }
    
  } catch(error) {
    console.log('Error while deleting the product: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}


export default {
  addProduct,
  getProduct,
  getProducts,
  editProduct,
  deleteProduct
}