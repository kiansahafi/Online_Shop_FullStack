
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"

const createAdmin = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    username: yup.string().min(3).required(),
    password: yup.string().required()
  })

	const handle = async () => {
    const { username, password } = req.body

    const admin = {
      username,
      password
    }

		return await adminService.createAdmin(admin)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default createAdmin
