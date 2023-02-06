import { Router } from 'express'

import auth from "../../middlewares/auth"

import createAdmin from './createAdmin'
import login from './login'
import getAdmin from './getAdmin'
import editAdmin from './editAdmin'
import changePassword from './changePassword'

export const adminRouter = Router()


adminRouter.post('/', createAdmin)


adminRouter.post('/login', login)


adminRouter.get('/', auth('admin'), getAdmin)


adminRouter.patch('/', auth('admin'),  editAdmin)


adminRouter.post('/change-password', auth('admin'), changePassword)