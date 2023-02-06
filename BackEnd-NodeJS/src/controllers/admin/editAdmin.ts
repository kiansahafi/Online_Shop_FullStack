import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"

const editAdmin = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    username: yup.string().min(3).required(),
  })

	const handle = async () => {

    const adminId = res.locals.admin._id

    const allowedUpdates = ["username"]

    const adminUpdates: { [key: string]: any} = {}

    Object.keys(req.body || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        adminUpdates[update] = req.body[update]
      }
    })

		return await adminService.editAdmin(adminId, adminUpdates)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default editAdmin
