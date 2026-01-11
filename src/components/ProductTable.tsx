import { useCallback, useMemo } from 'react'
import { List } from 'react-window'

import type { Product } from '@/types/product'

import ProductCard from './ProductCard'
import ProductRow from './ProductRow'

interface ProductTableProps {
  products: Product[]
  onDelete: (id: number) => void
}

const ROW_HEIGHT = 73
const CARD_HEIGHT = 120
const MAX_HEIGHT = 600

export default function ProductTable({
  products,
  onDelete,
}: ProductTableProps) {
  const formatPrice = useCallback((price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }, [])

  const handleDelete = useCallback(
    (id: number) => {
      onDelete(id)
    },
    [onDelete]
  )

  const listHeight = useMemo(() => {
    const calculatedHeight = products.length * ROW_HEIGHT
    return Math.min(calculatedHeight, MAX_HEIGHT)
  }, [products.length])

  const cardListHeight = useMemo(() => {
    const calculatedHeight = products.length * CARD_HEIGHT
    return Math.min(calculatedHeight, MAX_HEIGHT)
  }, [products.length])

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum produto cadastrado
      </div>
    )
  }

  const DesktopRow = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties
  }) => {
    const product = products[index]
    return (
      <div style={style}>
        <ProductRow
          product={product}
          onDelete={handleDelete}
          formatPrice={formatPrice}
        />
      </div>
    )
  }

  const MobileRow = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties
  }) => {
    const product = products[index]
    return (
      <div style={{ ...style, paddingBottom: '1rem' }}>
        <ProductCard
          product={product}
          onDelete={handleDelete}
          formatPrice={formatPrice}
        />
      </div>
    )
  }

  if (products.length < 50) {
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
                <ProductRow
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                  formatPrice={formatPrice}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-3 px-4 md:px-6 py-3">
              <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </div>
            </div>
          </div>
          <List<Record<string, never>>
            rowComponent={DesktopRow}
            rowCount={products.length}
            rowHeight={ROW_HEIGHT}
            rowProps={{}}
            style={{ height: listHeight }}
          />
        </div>
      </div>

      <div className="md:hidden">
        <List<Record<string, never>>
          rowComponent={MobileRow}
          rowCount={products.length}
          rowHeight={CARD_HEIGHT}
          rowProps={{}}
          style={{ height: cardListHeight }}
        />
      </div>
    </>
  )
}
