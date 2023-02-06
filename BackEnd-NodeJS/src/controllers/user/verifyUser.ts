
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const verifyUser = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    userId: yup.string().length(24).required()
  })

	const handle = async () => {
    const { userId } = req.body

		return await userService.verifyUser(userId)
	}

	return handleRequest({ req, res, handle, validationSchema })
}

export default verifyUser
