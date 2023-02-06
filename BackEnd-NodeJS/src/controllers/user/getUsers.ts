
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const getUsers = async (req: Request, res: Response) => {
  const queryValidationSchema = yup.object().shape({
    isVerified: yup.boolean(),
  })

	const handle = async () => {
    const isVerified = req.query.isVerified?.toString()
		return await userService.getUsers(isVerified)
	}

	return handleRequest({ req, res, handle, queryValidationSchema })
}

export default getUsers
