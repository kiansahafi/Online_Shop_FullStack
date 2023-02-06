import { Router } from 'express'

import { adminRouter } from '../controllers/admin'
import { adminUserRouter, userRouter } from '../controllers/user'
import { adminProductRouter, userProductRouter } from '../controllers/product'

const mainRouter = Router()

mainRouter.use('/admin/product', adminProductRouter)
mainRouter.use('/user/product', userProductRouter)
mainRouter.use('/admin', adminRouter)
mainRouter.use('/admin/user', adminUserRouter)
mainRouter.use('/user', userRouter)

export default mainRouter