import { createSlice } from '@reduxjs/toolkit'

import {
  getToken,
  isAuthenticated,
  removeToken,
  setToken,
} from '@/services/auth'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
}

const initialState: AuthState = {
  isAuthenticated: isAuthenticated(),
  token: getToken(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: { payload: string }) => {
      state.token = action.payload
      state.isAuthenticated = true
      setToken(action.payload)
    },
    clearAuth: state => {
      state.token = null
      state.isAuthenticated = false
      removeToken()
    },
  },
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer
