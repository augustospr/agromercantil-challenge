export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login/',
    REFRESH: '/auth/refresh/',
  },
  PRODUCTS: {
    LIST: '/products/',
    DETAIL: (id: number) => `/products/${id}/`,
  },
} as const
