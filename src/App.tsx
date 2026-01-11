import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ErrorBoundary from '@/components/ErrorBoundary'
import Home from '@/pages/Home'
import Products from '@/pages/Products'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
