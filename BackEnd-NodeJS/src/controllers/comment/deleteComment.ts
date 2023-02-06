
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import commentService from "../../db/models/comment/comment.service"

const deleteComment = async (req: Request, res: Response) => {
  const paramsValidationSchema = yup.object().shape({
    commentId: yup.string().length(24).required()
  })

	const handle = async () => {
    const { commentId } = req.params

    if(res.locals.user) { // This is for user
      const userId = res.locals.user?._id
      return await commentService.deleteComment(commentId, userId)
    } else { // This is for admin
      return await commentService.deleteComment(commentId)
    }
	}

	return handleRequest({ req, res, paramsValidationSchema, handle })
}

export default deleteComment
