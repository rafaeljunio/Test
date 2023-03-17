import { Router } from 'express'

import { UpdateProductController } from '@modules/product/useCases/updateProduct/UpdateProductController'
import { CreateProductController } from '@modules/product/useCases/createProduct/CreateProductController'
import { GetProductController } from '@modules/product/useCases/getProduct/GetProductController'
import { DeleteProductController } from '@modules/product/useCases/deleteProduct/DeleteProductController'
import { ListProductController } from '@modules/product/useCases/listProduct/ListProductController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const productsRoutes = Router()

const createProductController = new CreateProductController()
const updateProductController = new UpdateProductController()
const getProductController = new GetProductController()
const deleteProductController = new DeleteProductController()
const listProductController = new ListProductController()

productsRoutes.post('/', ensureAuthenticated, createProductController.handle)
productsRoutes.post('/list', ensureAuthenticated, listProductController.handle)
productsRoutes.put('/:id', ensureAuthenticated, updateProductController.handle)
productsRoutes.get('/:id', ensureAuthenticated, getProductController.handle)
productsRoutes.delete('/:id', ensureAuthenticated, deleteProductController.handle)

export { productsRoutes }
