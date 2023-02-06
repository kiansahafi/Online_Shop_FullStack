import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import productService from "../../db/models/product/product.service"

const editProduct = async (req: Request, res: Response) => {

  const paramsValidationSchema = yup.object().shape({
    productId: yup.string().length(24).required()
  })

  const validationSchema = yup.object().shape({
    title: yup.string(),
    description: yup.string(),
    price: yup.number().min(0)
  })

	const handle = async () => {
    const productId = req.params.productId

    if(req.file) {
      req.body.image = req.file
    }

    const allowedUpdates = ["title", "description", "image", "price"]

    const productUpdates: { [key: string]: any} = {}

    Object.keys(req.body || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        productUpdates[update] = req.body[update]
      }
    })

		return await productService.editProduct(productId, productUpdates)
	}

	return handleRequest({ req, res, validationSchema, paramsValidationSchema, handle })
}

export default editProduct
