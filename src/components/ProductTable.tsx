import type { Product } from '@/types/product'

interface ProductTableProps {
  products: Product[]
  onDelete: (id: number) => void
}

export default function ProductTable({
  products,
  onDelete,
}: ProductTableProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum produto cadastrado
      </div>
    )
  }

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Nome
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Preço
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
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
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-150"
          >
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
        ))}
      </div>
    </>
  )
}
