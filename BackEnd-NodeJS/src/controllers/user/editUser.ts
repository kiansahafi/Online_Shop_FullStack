import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const editUser = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    name: yup.string(),
    username: yup.string().min(3),
    phone: yup.string(),
  })

	const handle = async () => {
    const userId = res.locals.user._id

    const allowedUpdates = ["name", "username", "phone"]
    const updates: { [key: string]: any} = {}

    Object.keys(req.body || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        if(['name', 'username'].includes(update)) {
          updates[update] = req.body[update].trim()
        } else {
          updates[update] = req.body[update]
        }
      }
    })

		return await userService.editUser(userId, updates)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default editUser
