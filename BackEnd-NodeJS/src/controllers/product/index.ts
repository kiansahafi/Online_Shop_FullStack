import { Router } from 'express'

import auth from '../../middlewares/auth'
import upload from '../../middlewares/multer'

import addProduct from './addProduct'
import getProduct from './getProduct'
import getProducts from './getProducts'
import editProduct from './editProduct'
import deleteProduct from './deleteProduct'
import { adminCommentRouter, userCommentRouter } from '../comment'

export const adminProductRouter = Router()
export const userProductRouter = Router()

adminProductRouter.use('/comment', adminCommentRouter)

adminProductRouter.post('/', auth('admin'), upload, addProduct)
adminProductRouter.get('/', auth('admin'), getProducts)
adminProductRouter.get('/:productId', auth('admin'), getProduct)
adminProductRouter.patch('/:productId', auth('admin'), upload, editProduct)
adminProductRouter.delete('/:productId', auth('admin'), deleteProduct)

//--------------------------------------------------------------------------------

userProductRouter.use('/comment', userCommentRouter)

userProductRouter.get('/', auth('user'), getProducts)
userProductRouter.get('/:productId', auth('user'), getProduct)