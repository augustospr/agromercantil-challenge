import type { Product } from '@/types/product'

import { getToken } from './auth'

let mockProducts: Product[] = [
  { id: 1, name: 'Produto 1', price: 100.0 },
  { id: 2, name: 'Produto 2', price: 200.0 },
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const makeRequest = async <T>(
  fn: () => Promise<T>,
  requiresAuth = true
): Promise<T> => {
  if (requiresAuth) {
    const token = getToken()
    if (!token) {
      throw new Error('Não autorizado')
    }
  }

  await delay(500)

  if (Math.random() < 0.1) {
    throw new Error('Erro na API')
  }

  return fn()
}

export const fetchProducts = async (): Promise<Product[]> => {
  return makeRequest(() => Promise.resolve([...mockProducts]))
}

export const deleteProduct = async (id: number): Promise<void> => {
  return makeRequest(() => {
    mockProducts = mockProducts.filter(p => p.id !== id)
    return Promise.resolve()
  })
}
