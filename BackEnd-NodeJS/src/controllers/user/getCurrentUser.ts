
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const getCurrentUser = async (req: Request, res: Response) => {

	const handle = async () => {
    const userId = res.locals.user?._id

		return await userService.getUser(userId)
	}

	return handleRequest({ req, res, handle })
}

export default getCurrentUser
