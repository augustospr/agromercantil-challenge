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
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-600">Carregando produtos...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gerenciamento de Produtos
          </h1>
          <p className="text-gray-600">
            Gerencie seus produtos de forma simples e eficiente
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 text-red-600 hover:text-red-800 underline"
            >
              Fechar
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <ProductForm onSubmit={handleAdd} />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
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
