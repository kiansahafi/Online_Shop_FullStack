import Admin, { IAdmin } from "./admin"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import { encrypt, decrypt } from "../../../utils/helpers/encryption"
import { generateToken } from "../../../utils/helpers/token"
import mongoose, { ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId



const createAdmin = async (
  admin: {
    username: string,
    password: string
  }
  ): Promise<IResponse> => {

  try {
    const { username, password } = admin
    // checking admin existence
    const existingAdmin = await Admin.findOne({ isAdmin: true }).exec()
    if(existingAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.adminAlreadyExists,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const createdAdmin = await Admin.create({
      username,
      password: encrypt(password),
    })
    
    return {
      success: true,
      outputs: {
        admin: createdAdmin
      }
    }
  } catch(error) {
    console.log('Error while creating new admin: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//------------------------------------------------

const login = async (
  username: string, 
  password: string
): Promise<IResponse> => {
  try {
    const admin = await Admin.findOne({ username }).exec()
    
    if(!admin || password !== decrypt(admin.password)) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.incorrectCredentials,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const token = generateToken(admin._id, "admin")

    return {
      success: true,
      outputs: {
        admin,
        token
      }
    }

  } catch(error) {
    console.log('Error while logging in: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//---------------------------------------------

const changePassword = async (adminId: string, oldPassword: string, newPassword: string): Promise<IResponse> => {
  try {
    // Checking old password to be correct
    const admin = await Admin.findById(adminId).exec()
    if(!admin || oldPassword !== decrypt(admin.password)) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.incorrectPassword,
          statusCode: statusCodes.badRequest
        }
      }
    }

    await Admin.findByIdAndUpdate(adminId, { $set: { password: encrypt(newPassword) }}).exec()

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while changing password: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//---------------------------------------------

const getAdmin = async (adminId: string): Promise<IResponse> => {
  try {
    const admin = await Admin.findById(adminId).exec()
    if(!admin) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    return {
      success: true,
      outputs: {
        admin
      }
    }

  } catch(error) {
    console.log('Error while getting admin: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//----------------------------------------

const editAdmin = async (
  adminId: string,
  adminUpdates: {
    username?: string
  }
): Promise<IResponse> => {

  try {
    // checking adminUpdates object to not be empty
    if(Object.keys(adminUpdates).length == 0) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.noChanges,
          statusCode: statusCodes.badRequest
        }
      }
    }
    
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, adminUpdates, { new: true }).exec()

    if(!updatedAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    return {
      success: true,
      outputs: {
        admin: updatedAdmin
      }
    }
  } catch(error) {
    console.log('Error while updating current admin: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//----------------------------------------------------------

export default {
  createAdmin,
  login,
  getAdmin,
  editAdmin,
  changePassword
}