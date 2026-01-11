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
      className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-150"
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Adicionar Novo Produto
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Nome
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            className={`w-full px-3 sm:px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 ${
              errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="Digite o nome do produto"
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-600 animate-in fade-in duration-200">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1.5"
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
            className={`w-full px-3 sm:px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 ${
              errors.price
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1.5 text-sm text-red-600 animate-in fade-in duration-200">
              {errors.price}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Adicionar Produto
        </button>
      </div>
    </form>
  )
}
