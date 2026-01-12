import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as api from '@/services/api'
import { store } from '@/store/store'
import type { Product } from '@/types/product'

import Products from '../Products'

vi.mock('@/services/api', () => ({
  fetchProducts: vi.fn(),
  deleteProduct: vi.fn(),
  createProduct: vi.fn(),
}))

const mockFetchProducts = vi.mocked(api.fetchProducts)
const mockDeleteProduct = vi.mocked(api.deleteProduct)
const mockCreateProduct = vi.mocked(api.createProduct)

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
)

describe('Products', () => {
  const mockProducts: Product[] = [
    { id: 1, name: 'Produto 1', price: 100.0 },
    { id: 2, name: 'Produto 2', price: 200.0 },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchProducts.mockResolvedValue(mockProducts)
    mockDeleteProduct.mockResolvedValue(undefined)
  })

  it('carrega produtos ao montar', async () => {
    mockFetchProducts.mockResolvedValue(mockProducts)

    render(
      <Wrapper>
        <Products />
      </Wrapper>
    )

    expect(screen.getByText('Carregando produtos...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getAllByText('Produto 1').length).toBeGreaterThan(0)
    })

    expect(mockFetchProducts).toHaveBeenCalledTimes(1)
  })

  it('exibe loading durante requisição', async () => {
    mockFetchProducts.mockImplementation(
      () =>
        new Promise(resolve => {
          setTimeout(() => resolve(mockProducts), 100)
        })
    )

    render(
      <Wrapper>
        <Products />
      </Wrapper>
    )

    expect(screen.getByText('Carregando produtos...')).toBeInTheDocument()

    await waitFor(() => {
      expect(
        screen.queryByText('Carregando produtos...')
      ).not.toBeInTheDocument()
    })
  })

  it('exibe erro se requisição falhar', async () => {
    mockFetchProducts.mockRejectedValue(new Error('Erro na API'))

    render(
      <Wrapper>
        <Products />
      </Wrapper>
    )

    await waitFor(() => {
      expect(
        screen.getByText('Erro ao carregar produtos. Tente novamente.')
      ).toBeInTheDocument()
    })
  })

  it('adiciona novo produto à lista', async () => {
    const newProduct: Product = { id: 3, name: 'Produto Novo', price: 300.0 }
    mockCreateProduct.mockResolvedValue(newProduct)

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
    await user.type(priceInput, '300')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getAllByText('Produto Novo').length).toBeGreaterThan(0)
    })

    expect(mockCreateProduct).toHaveBeenCalledWith('Produto Novo', 300)
    expect(screen.getAllByText('Produto 1').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Produto 2').length).toBeGreaterThan(0)
  })

  it('remove produto da lista', async () => {
    mockFetchProducts.mockResolvedValue(mockProducts)
    mockDeleteProduct.mockResolvedValue()

    render(
      <Wrapper>
        <Products />
      </Wrapper>
    )

    await waitFor(() => {
      expect(screen.getAllByText('Produto 1').length).toBeGreaterThan(0)
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

  it('exibe erro ao falhar exclusão', async () => {
    mockFetchProducts.mockResolvedValue(mockProducts)
    mockDeleteProduct.mockRejectedValue(new Error('Erro ao excluir'))

    render(
      <Wrapper>
        <Products />
      </Wrapper>
    )

    await waitFor(() => {
      expect(screen.getAllByText('Produto 1').length).toBeGreaterThan(0)
    })

    const user = userEvent.setup()
    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i })
    await user.click(deleteButtons[0])

    await waitFor(() => {
      expect(
        screen.getByText('Erro ao excluir produto. Tente novamente.')
      ).toBeInTheDocument()
    })
  })
})
