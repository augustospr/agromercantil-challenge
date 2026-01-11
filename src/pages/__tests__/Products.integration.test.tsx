import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as api from '@/services/api'
import type { Product } from '@/types/product'

import Products from '../Products'

vi.mock('@/services/api', () => ({
  fetchProducts: vi.fn(),
  deleteProduct: vi.fn(),
}))

const mockFetchProducts = vi.mocked(api.fetchProducts)
const mockDeleteProduct = vi.mocked(api.deleteProduct)

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('Products - Testes de Integração', () => {
  const mockProducts: Product[] = [
    { id: 1, name: 'Produto 1', price: 100.0 },
    { id: 2, name: 'Produto 2', price: 200.0 },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchProducts.mockResolvedValue(mockProducts)
    mockDeleteProduct.mockResolvedValue()
  })

  it('fluxo completo de adicionar produto', async () => {
    render(
      <Wrapper>
        <Products />
      </Wrapper>
    )

    await waitFor(() => {
      expect(screen.getAllByText('Produto 1').length).toBeGreaterThan(0)
    })

    const user = userEvent.setup()

    const nameInput = screen.getByLabelText(/nome/i)
    const priceInput = screen.getByLabelText(/preço/i)
    const submitButton = screen.getByRole('button', {
      name: /adicionar produto/i,
    })

    await user.type(nameInput, 'Produto Novo')
    await user.clear(priceInput)
    await user.type(priceInput, '350.75')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getAllByText('Produto Novo').length).toBeGreaterThan(0)
      expect(screen.getAllByText('R$ 350,75').length).toBeGreaterThan(0)
    })

    expect(nameInput).toHaveValue('')
    expect(priceInput).toHaveValue(null)
  })

  it('fluxo completo de excluir produto', async () => {
    render(
      <Wrapper>
        <Products />
      </Wrapper>
    )

    await waitFor(() => {
      expect(screen.getAllByText('Produto 1').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Produto 2').length).toBeGreaterThan(0)
    })

    const user = userEvent.setup()
    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i })

    await user.click(deleteButtons[0])

    await waitFor(() => {
      expect(screen.queryByText('Produto 1')).not.toBeInTheDocument()
    })

    expect(screen.getAllByText('Produto 2').length).toBeGreaterThan(0)

    expect(mockDeleteProduct).toHaveBeenCalledWith(1)
  })

  it('fluxo completo: adicionar e depois excluir produto', async () => {
    render(
      <Wrapper>
        <Products />
      </Wrapper>
    )

    await waitFor(() => {
      expect(screen.getAllByText('Produto 1').length).toBeGreaterThan(0)
    })

    const user = userEvent.setup()

    const nameInput = screen.getByLabelText(/nome/i)
    const priceInput = screen.getByLabelText(/preço/i)
    const submitButton = screen.getByRole('button', {
      name: /adicionar produto/i,
    })

    await user.type(nameInput, 'Produto Temporário')
    await user.clear(priceInput)
    await user.type(priceInput, '500')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getAllByText('Produto Temporário').length).toBeGreaterThan(
        0
      )
    })

    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i })
    const lastDeleteButton = deleteButtons[deleteButtons.length - 1]
    await user.click(lastDeleteButton)

    await waitFor(() => {
      expect(screen.queryByText('Produto Temporário')).not.toBeInTheDocument()
    })

    expect(screen.getAllByText('Produto 1').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Produto 2').length).toBeGreaterThan(0)
  })
})
