import { Router } from 'express'

import auth from "../../middlewares/auth"
import login from './login'
import signup from './signup'
import getCurrentUser from './getCurrentUser'
import getUsers from './getUsers'
import editUser from './editUser'
import changePassword from './changePassword'
import deleteUser from './deleteUser'
import verifyUser from './verifyUser'

export const userRouter = Router()
export const adminUserRouter = Router()



userRouter.post('/signup', signup)


userRouter.post('/login', login)


userRouter.get('/', auth('user'), getCurrentUser)


userRouter.patch('/', auth('user'), editUser)


userRouter.post('/change_password', auth('user'), changePassword)


userRouter.delete('/', auth('user'), deleteUser)


//----------------------------------------------


adminUserRouter.get('/', auth('admin'), getUsers)


adminUserRouter.post('/verify', auth('admin'), verifyUser)

