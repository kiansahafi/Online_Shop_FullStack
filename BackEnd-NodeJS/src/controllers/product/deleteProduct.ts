
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import productService from "../../db/models/product/product.service"

const deleteProduct = async (req: Request, res: Response) => {

  const paramsValidationSchema = yup.object().shape({
    productId: yup.string().length(24).required()
  })

	const handle = async () => {
    const { productId } = req.params

		return await productService.deleteProduct(productId)
	}

	return handleRequest({ req, res, paramsValidationSchema, handle })
}

export default deleteProduct
