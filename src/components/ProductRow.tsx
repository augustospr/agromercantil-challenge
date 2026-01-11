import { memo } from 'react'

import type { Product } from '@/types/product'

interface ProductRowProps {
  product: Product
  onDelete: (id: number) => void
  formatPrice: (price: number) => string
}

const ProductRow = memo(function ProductRow({
  product,
  onDelete,
  formatPrice,
}: ProductRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">
        {product.name}
      </td>
      <td className="px-4 md:px-6 py-4 text-sm text-gray-700">
        {formatPrice(product.price)}
      </td>
      <td className="px-4 md:px-6 py-4 text-sm">
        <button
          onClick={() => onDelete(product.id)}
          className="px-3 md:px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 active:bg-red-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm font-medium shadow-sm hover:shadow-md"
          aria-label={`Excluir ${product.name}`}
        >
          Excluir
        </button>
      </td>
    </tr>
  )
})

export default ProductRow
