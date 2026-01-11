import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ErrorBoundary from '@/components/ErrorBoundary'
import ProtectedRoute from '@/components/ProtectedRoute'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Products from '@/pages/Products'
import { store } from '@/store/store'

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
