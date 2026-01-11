import { memo } from 'react'

import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  onDelete: (id: number) => void
  formatPrice: (price: number) => string
}

const ProductCard = memo(function ProductCard({
  product,
  onDelete,
  formatPrice,
}: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-150">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-lg font-medium text-gray-700">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
      <button
        onClick={() => onDelete(product.id)}
        className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 active:bg-red-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm font-medium shadow-sm"
        aria-label={`Excluir ${product.name}`}
      >
        Excluir
      </button>
    </div>
  )
})

export default ProductCard
