import { Router } from 'express'

import { UpdateOrderController } from '@modules/order/useCases/updateOrder/UpdateOrderController'
import { CreateOrderController } from '@modules/order/useCases/createOrder/CreateOrderController'
import { GetOrderController } from '@modules/order/useCases/getOrder/GetOrderController'
import { DeleteOrderController } from '@modules/order/useCases/deleteOrder/DeleteOrderController'
import { ListOrderController } from '@modules/order/useCases/listOrder/ListOrderController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { AddProductOrderController } from '@modules/order/useCases/addProductOrder/AddProductOrderController'
import { RemoveProductOrderController } from '@modules/order/useCases/removeProductOrder/RemoveProductOrderController'

const ordersRoutes = Router()

const createOrderController = new CreateOrderController()
const updateOrderController = new UpdateOrderController()
const getOrderController = new GetOrderController()
const deleteOrderController = new DeleteOrderController()
const listOrderController = new ListOrderController()
const addProductOrderController = new AddProductOrderController()
const removeProductOrderController = new RemoveProductOrderController()

ordersRoutes.post('/', ensureAuthenticated, createOrderController.handle)
ordersRoutes.post('/list', ensureAuthenticated, listOrderController.handle)
ordersRoutes.put('/:id', ensureAuthenticated, updateOrderController.handle)
ordersRoutes.get('/:id', ensureAuthenticated, getOrderController.handle)
ordersRoutes.delete('/:id', ensureAuthenticated, deleteOrderController.handle)

ordersRoutes.post('/add-product', ensureAuthenticated, addProductOrderController.handle)
ordersRoutes.delete('/remove-product/:id', ensureAuthenticated, removeProductOrderController.handle)

export { ordersRoutes }
