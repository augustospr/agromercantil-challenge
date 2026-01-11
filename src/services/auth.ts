const TOKEN_KEY = 'auth_token'

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  await delay(500)

  if (username === 'admin' && password === 'admin') {
    const mockToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    setToken(mockToken)
    return mockToken
  }

  throw new Error('Credenciais inválidas')
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

export const isAuthenticated = (): boolean => {
  return getToken() !== null
}

export const logout = (): void => {
  removeToken()
}
