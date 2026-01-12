import { API_BASE_URL, API_ENDPOINTS } from '@/config/api'

const TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

interface LoginResponse {
  token: string
  refresh: string
}

interface RefreshResponse {
  access: string
}

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.error || 'Erro ao fazer login. Tente novamente.'
      )
    }

    const data: LoginResponse = await response.json()
    setToken(data.token)
    setRefreshToken(data.refresh)
    return data.token
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Erro ao fazer login. Tente novamente.')
  }
}

export const refreshToken = async (): Promise<string | null> => {
  const refresh = getRefreshToken()
  if (!refresh) {
    return null
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
      }
    )

    if (!response.ok) {
      removeToken()
      removeRefreshToken()
      return null
    }

    const data: RefreshResponse = await response.json()
    setToken(data.access)
    return data.access
  } catch {
    removeToken()
    removeRefreshToken()
    return null
  }
}

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const setRefreshToken = (refresh: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
}

export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const isAuthenticated = (): boolean => {
  return getToken() !== null
}

export const logout = (): void => {
  removeToken()
  removeRefreshToken()
}
