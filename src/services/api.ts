import type { Product } from '@/types/product'

let mockProducts: Product[] = [
  { id: 1, name: 'Produto 1', price: 100.0 },
  { id: 2, name: 'Produto 2', price: 200.0 },
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchProducts = async (): Promise<Product[]> => {
  await delay(500)
  return [...mockProducts]
}

export const deleteProduct = async (id: number): Promise<void> => {
  await delay(300)
  mockProducts = mockProducts.filter(p => p.id !== id)
}
