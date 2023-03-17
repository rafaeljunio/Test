
interface ICreateOrderDTO {
  id?: number
  client_id: number
  order_products: Array<{
    product_id: number
    quantity: number
    unit_value: number
  }>
  created_at: string
  updated_at: string
  user_created_at: number
  user_updated_at: number
  status: 'active' | 'inactive' | 'in construction'
}

export { ICreateOrderDTO }
