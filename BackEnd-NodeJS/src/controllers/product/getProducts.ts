
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import productService from "../../db/models/product/product.service"

const getProducts = async (req: Request, res: Response) => {

  const queryValidationSchema = yup.object().shape({
    limit: yup.string(),
    skip: yup.string(),
    sortBy: yup.string().oneOf(["title", "price", "createdAt", "updatedAt"]),
    sortOrder: yup.string().oneOf(['asc', 'desc']),
    search: yup.string(),
  })

	const handle = async () => {
    const { limit, skip, sortBy, sortOrder, search } = req.query

    const options = {
      limit: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined,
      sortBy: sortBy?.toString(),
      sortOrder: sortOrder?.toString(),
      search: search?.toString()
    }

		return await productService.getProducts(options)
	}

	return handleRequest({ req, res, queryValidationSchema, handle })
}

export default getProducts
