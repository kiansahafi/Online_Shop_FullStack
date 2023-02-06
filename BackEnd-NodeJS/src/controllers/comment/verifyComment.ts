
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import commentService from "../../db/models/comment/comment.service"

const verifyComment = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    commentId: yup.string().length(24).required()
  })

	const handle = async () => {
    const { commentId } = req.body

		return await commentService.verifyComment(commentId)
	}

	return handleRequest({ req, res, handle, validationSchema })
}

export default verifyComment
