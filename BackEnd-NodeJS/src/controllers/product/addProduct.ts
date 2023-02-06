
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import productService from "../../db/models/product/product.service"

const addProduct = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().min(0).required()
  })

	const handle = async () => {
    const { title, description, price } = req.body

    const newProduct = {
      title: title.trim(),
      description: description,
      image: req.file,
      price
    }

		return await productService.addProduct(newProduct)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default addProduct
