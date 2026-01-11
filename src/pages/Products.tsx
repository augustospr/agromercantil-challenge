import { useEffect, useState } from 'react'

import ProductForm from '@/components/ProductForm'
import ProductTable from '@/components/ProductTable'
import { deleteProduct, fetchProducts } from '@/services/api'
import type { Product, ProductFormData } from '@/types/product'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      setError('Erro ao carregar produtos. Tente novamente.')
      console.error('Error loading products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError('Erro ao excluir produto. Tente novamente.')
      console.error('Error deleting product:', err)
    }
  }

  const handleAdd = (formData: ProductFormData) => {
    const newProduct: Product = {
      id: Date.now(), // Gera ID temporário baseado em timestamp
      name: formData.name,
      price: formData.price,
    }
    setProducts(prev => [...prev, newProduct])
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-lg text-gray-600">Carregando produtos...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Gerenciamento de Produtos
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Gerencie seus produtos de forma simples e eficiente
          </p>
        </div>

        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 shadow-sm animate-in slide-in-from-top duration-300">
            <div className="flex items-start justify-between">
              <span className="flex-1">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-4 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded transition-colors duration-150"
                aria-label="Fechar mensagem de erro"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <ProductForm onSubmit={handleAdd} />
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                Lista de Produtos
              </h2>
              <ProductTable products={products} onDelete={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
