import User, { IUser } from "./user"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import { generateToken } from "../../../utils/helpers/token"
import mongoose, { ObjectId as objectId } from "mongoose"
import { decrypt, encrypt } from "../../../utils/helpers/encryption"
const ObjectId = mongoose.Types.ObjectId

const signup = async (username: string, password: string): Promise<IResponse> => {
  try {
    // Checking username availability
    const existingUserWithThisUsername = await User.findOne({ username }).exec()
    if(existingUserWithThisUsername) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.userService.usernameAlreadyTaken
        }
      }
    }
    // Creating new user
    const newUser = {
      username,
      password: encrypt(password)
    }
    const createdUser = await User.create(newUser)

    const token = generateToken(createdUser._id, "user")

    // TODO: send activation username
    return {
      success: true,
      outputs: {
        user: createdUser,
        token
      }
    }

  } catch(error) {
    console.log('Error while user sign up: ', error)

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

const login = async (username: string, password: string): Promise<IResponse> => {
  try {
    const user = await User.findOne({ username }).exec()

    if(!user || password !== decrypt(user.password) || !user.isVerified) {
      return {
        success: false,
        error: {
          message: errorMessages.userService.incorrectCredentials,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const token = generateToken(user._id, "user")

    return {
      success: true,
      outputs: {
        user,
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

//--------------------------------------------------

const getUser = async (userId: objectId): Promise<IResponse> => {
  try {
    const user = await User.findById(userId).exec()

    if(!user) {
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
        user
      }
    }

  } catch(error) {
    console.log('Error while getting user: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------

const getUsers = async (isVerified: string | undefined): Promise<IResponse> => {
  try {
    console.log(isVerified)
    let filter = {}
    if(isVerified == 'true') {
      filter = { isVerified: true }

    } else if(isVerified == 'false') {
      filter = { isVerified: false }
    }

    console.log(filter)
    const users = await User.find(filter).exec()

    return {
      success: true,
      outputs: {
        users
      }
    }

  } catch(error) {
    console.log('Error while getting unverified users: ', error)

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

const editUser = async (
  userId: string,
  updates: {
    name?: string
    username?: string
    phone?: string
  }
): Promise<IResponse> => {

  try {
    // checking updates object to not be empty
    if(Object.keys(updates).length == 0) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.noChanges,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking username availability
    if(updates.username) {
      const existingUserWithThisUsername = await User.findOne({ username: updates.username }).exec()

      if(existingUserWithThisUsername && existingUserWithThisUsername._id.toString() ==! userId) {
        return {
          success: false,
          error: {
            message: errorMessages.userService.usernameAlreadyTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }
    
    // Updating user
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).exec()

    if(!updatedUser) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.badRequest
        }
      }
    }

    return {
      success: true,
      outputs: {
        user: updatedUser
      }
    }
  } catch(error) {
    console.log('Error while updating an admin: ', error)

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

const changePassword = async (userId: string, oldPassword: string, newPassword: string): Promise<IResponse> => {
  try {
    // Checking old password to be correct
    const user = await User.findById(userId).exec()
    if(!user || oldPassword !== decrypt(user.password)) {
      return {
        success: false,
        error: {
          message: errorMessages.userService.incorrectPassword,
          statusCode: statusCodes.badRequest
        }
      }
    }
    // Updating user password
    await User.findByIdAndUpdate(userId, { $set: { password: encrypt(newPassword) }}).exec()

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while changing user password: ', error)

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

const deleteUser = async (userId: string): Promise<IResponse> => {
  try {
    await User.findByIdAndDelete(userId)

    return {
      success: true
    }
    
  } catch(error) {
    console.log('Error while deleting user: ', error)

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

const verifyUser = async (userId: string): Promise<IResponse> => {
  try {
    // Verifying user
    const user = await User.findByIdAndUpdate(userId, { isVerified: true }).exec()

    if(!user) {
      return {
        success: false,
        error: {
          message: errorMessages.userService.noSuchUser,
          statusCode: statusCodes.badRequest
        }
      }
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while verifying user: ', error)

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
  signup,
  login,
  getUser,
  getUsers,
  editUser,
  changePassword,
  deleteUser,
  verifyUser
}