import { API_BASE_URL, API_ENDPOINTS } from '@/config/api'
import type { Product } from '@/types/product'

import { getToken, refreshToken } from './auth'

interface ProductsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Product[]
}

const makeRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
  requiresAuth = true
): Promise<T> => {
  const token = getToken()

  if (requiresAuth && !token) {
    throw new Error('Não autorizado')
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (requiresAuth && token) {
    headers.Authorization = `Bearer ${token}`
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: headers as HeadersInit,
  })

  // Se token expirou, tentar refresh
  if (response.status === 401 && requiresAuth) {
    const newToken = await refreshToken()
    if (newToken) {
      headers.Authorization = `Bearer ${newToken}`
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: headers as HeadersInit,
      })
    } else {
      throw new Error('Sessão expirada. Faça login novamente.')
    }
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Não autorizado')
    }

    if (response.status === 404) {
      throw new Error('Recurso não encontrado')
    }

    if (response.status === 400) {
      const errorData = await response.json().catch(() => ({}))
      const errorMessage =
        errorData.name?.[0] ||
        errorData.price?.[0] ||
        errorData.error ||
        'Erro na requisição'
      throw new Error(errorMessage)
    }

    throw new Error('Erro na API')
  }

  // DELETE retorna 204 sem conteúdo
  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const data: ProductsResponse = await makeRequest<ProductsResponse>(
      API_ENDPOINTS.PRODUCTS.LIST,
      { method: 'GET' }
    )
    // A API retorna paginação, mas precisamos apenas do array de produtos
    // Converter price de string para number
    return data.results.map(product => ({
      ...product,
      price:
        typeof product.price === 'string'
          ? parseFloat(product.price)
          : product.price,
    }))
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Erro ao carregar produtos. Tente novamente.')
  }
}

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await makeRequest<void>(API_ENDPOINTS.PRODUCTS.DETAIL(id), {
      method: 'DELETE',
    })
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Erro ao excluir produto. Tente novamente.')
  }
}

export const createProduct = async (
  name: string,
  price: number
): Promise<Product> => {
  try {
    const product: Product = await makeRequest<Product>(
      API_ENDPOINTS.PRODUCTS.LIST,
      {
        method: 'POST',
        body: JSON.stringify({ name, price }),
      }
    )
    // Converter price de string para number se necessário
    return {
      ...product,
      price:
        typeof product.price === 'string'
          ? parseFloat(product.price)
          : product.price,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Erro ao criar produto. Tente novamente.')
  }
}
