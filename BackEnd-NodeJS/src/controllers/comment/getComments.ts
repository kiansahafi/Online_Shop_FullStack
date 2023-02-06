
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import commentService from "../../db/models/comment/comment.service"

const getComments = async (req: Request, res: Response) => {
  const queryValidationSchema = yup.object().shape({
    isVerified: yup.boolean(),
  })

	const handle = async () => {
    const isVerified = req.query.isVerified?.toString()
		return await commentService.getComments(isVerified)
	}

	return handleRequest({ req, res, handle, queryValidationSchema })
}

export default getComments
