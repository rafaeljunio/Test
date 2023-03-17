import { Router } from 'express'

import { usersRoutes } from './users.routes'
import { sessionsRoutes } from './sessions.routes'
import { clientsRoutes } from './clients.routes'
import { productsRoutes } from './products.routes'
import { ordersRoutes } from './orders.routes'

const router = Router()

router.use('/sessions', sessionsRoutes)
router.use('/users', usersRoutes)
router.use('/clients', clientsRoutes)
router.use('/products', productsRoutes)
router.use('/orders', ordersRoutes)

export { router }
