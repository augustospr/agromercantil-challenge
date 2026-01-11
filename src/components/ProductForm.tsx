import { type FormEvent, useState } from 'react'

import type { ProductFormData } from '@/types/product'

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void
}

interface FormErrors {
  name?: string
  price?: string
}

export default function ProductForm({ onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }

    if (formData.price <= 0) {
      newErrors.price = 'Preço deve ser maior que zero'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validate()) {
      onSubmit(formData)
      setFormData({ name: '', price: 0 })
      setErrors({})
    }
  }

  const handleChange = (
    field: keyof ProductFormData,
    value: string | number
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpa erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Adicionar Novo Produto
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Digite o nome do produto"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preço
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price || ''}
            onChange={e =>
              handleChange('price', parseFloat(e.target.value) || 0)
            }
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
        >
          Adicionar Produto
        </button>
      </div>
    </form>
  )
}
