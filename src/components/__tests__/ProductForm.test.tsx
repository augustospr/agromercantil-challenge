import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import ProductForm from '../ProductForm'

describe('ProductForm', () => {
  it('renderiza campos de formulário', () => {
    const mockOnSubmit = vi.fn()
    render(<ProductForm onSubmit={mockOnSubmit} />)

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/preço/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /adicionar produto/i })
    ).toBeInTheDocument()
  })

  it('permite inserir nome e preço', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<ProductForm onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByLabelText(/nome/i)
    const priceInput = screen.getByLabelText(/preço/i)

    await user.type(nameInput, 'Produto Teste')
    await user.clear(priceInput)
    await user.type(priceInput, '150.99')

    expect(nameInput).toHaveValue('Produto Teste')
    expect(priceInput).toHaveValue(150.99)
  })

  it('valida campos obrigatórios - nome vazio', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<ProductForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole('button', {
      name: /adicionar produto/i,
    })
    await user.click(submitButton)

    expect(await screen.findByText('Nome é obrigatório')).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('valida campos obrigatórios - preço inválido', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<ProductForm onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByLabelText(/nome/i)
    const priceInput = screen.getByLabelText(/preço/i)
    const submitButton = screen.getByRole('button', {
      name: /adicionar produto/i,
    })

    await user.type(nameInput, 'Produto Teste')
    await user.clear(priceInput)
    await user.type(priceInput, '0')
    await user.click(submitButton)

    expect(
      await screen.findByText('Preço deve ser maior que zero')
    ).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('chama função de submit com dados corretos', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<ProductForm onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByLabelText(/nome/i)
    const priceInput = screen.getByLabelText(/preço/i)
    const submitButton = screen.getByRole('button', {
      name: /adicionar produto/i,
    })

    await user.type(nameInput, 'Produto Teste')
    await user.clear(priceInput)
    await user.type(priceInput, '150.99')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'Produto Teste',
        price: 150.99,
      })
    })
  })

  it('limpa formulário após submit bem-sucedido', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<ProductForm onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByLabelText(/nome/i)
    const priceInput = screen.getByLabelText(/preço/i)
    const submitButton = screen.getByRole('button', {
      name: /adicionar produto/i,
    })

    await user.type(nameInput, 'Produto Teste')
    await user.clear(priceInput)
    await user.type(priceInput, '150.99')
    await user.click(submitButton)

    await waitFor(() => {
      expect(nameInput).toHaveValue('')
      expect(priceInput).toHaveValue(null)
    })
  })

  it('limpa erro do campo quando usuário começa a digitar', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<ProductForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole('button', {
      name: /adicionar produto/i,
    })
    await user.click(submitButton)

    const nameInput = screen.getByLabelText(/nome/i)
    expect(await screen.findByText('Nome é obrigatório')).toBeInTheDocument()

    await user.type(nameInput, 'P')

    await waitFor(() => {
      expect(screen.queryByText('Nome é obrigatório')).not.toBeInTheDocument()
    })
  })
})
