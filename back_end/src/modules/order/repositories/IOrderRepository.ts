import { ICreateOrderDTO } from '../dtos/ICreateOrderDTO'
import { Order } from '../infra/typeorm/entities/Order'

interface IOrderRepository {
  create: (order: ICreateOrderDTO) => Promise<Order>
  addProduct: (orderProduct: any) => Promise<any>
  update: (order: ICreateOrderDTO) => Promise<Order>
  get: (id: number) => Promise<Order>
  list: () => Promise<Order[]>
  delete: (id: number) => Promise<boolean>
  removeOrderProduct: (id: number) => Promise<any>
}

export { IOrderRepository }
