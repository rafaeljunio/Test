import { container } from 'tsyringe'

import '@shared/container/providers'

import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository'
import { UserTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokenRepository'
import { IClientRepository } from '@modules/client/repositories/IClientRepository'
import { ClientRepository } from '@modules/client/infra/typeorm/repositories/ClientRepository'
import { IProductRepository } from '@modules/product/repositories/IProductRepository'
import { ProductRepository } from '@modules/product/infra/typeorm/repositories/ProductRepository'
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository'
import { OrderRepository } from '@modules/order/infra/typeorm/repositories/OrderRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokenRepository)
container.registerSingleton<IClientRepository>('ClientRepository', ClientRepository)
container.registerSingleton<IProductRepository>('ProductRepository', ProductRepository)
container.registerSingleton<IOrderRepository>('OrderRepository', OrderRepository)
