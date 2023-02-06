import { Router } from 'express'

import auth from '../../middlewares/auth'

import addComment from './addComment'
import getComment from './getComment'
import getCommentsByProductId from './getCommentsByProductId'
import verifyComment from './verifyComment'
import deleteComment from './deleteComment'
import getComments from './getComments'

export const adminCommentRouter = Router()
export const userCommentRouter = Router()


adminCommentRouter.post('/verify', auth('admin'), verifyComment)


adminCommentRouter.get('/:commentId', auth('admin'), getComment)


adminCommentRouter.get('/', auth('admin'), getComments)


adminCommentRouter.get('/productId/:productId', auth('admin'), getCommentsByProductId)


adminCommentRouter.delete('/:commentId', auth('admin'), deleteComment)



//--------------------------------------------------------------------------------------------------------



userCommentRouter.post('/productId/:productId', auth('user'), addComment)


userCommentRouter.get('/:commentId', auth('user'), getComment)


userCommentRouter.get('/productId/:productId', auth('user'), getCommentsByProductId)


userCommentRouter.delete('/:commentId', auth('user'), deleteComment)

