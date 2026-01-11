import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { Product } from '@/types/product'

import ProductTable from '../ProductTable'

describe('ProductTable', () => {
  const mockProducts: Product[] = [
    { id: 1, name: 'Produto 1', price: 100.0 },
    { id: 2, name: 'Produto 2', price: 200.5 },
  ]

  it('renderiza tabela com produtos', () => {
    const mockOnDelete = vi.fn()
    render(<ProductTable products={mockProducts} onDelete={mockOnDelete} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Produto 1')).toBeInTheDocument()
    expect(screen.getByText('Produto 2')).toBeInTheDocument()
  })

  it('exibe nome e preço corretamente', () => {
    const mockOnDelete = vi.fn()
    render(<ProductTable products={mockProducts} onDelete={mockOnDelete} />)

    const row1 = screen.getByText('Produto 1').closest('tr')
    const row2 = screen.getByText('Produto 2').closest('tr')

    expect(row1).toBeInTheDocument()
    expect(row2).toBeInTheDocument()

    expect(screen.getByText('R$ 100,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 200,50')).toBeInTheDocument()
  })

  it('exibe mensagem quando não há produtos', () => {
    const mockOnDelete = vi.fn()
    render(<ProductTable products={[]} onDelete={mockOnDelete} />)

    expect(screen.getByText('Nenhum produto cadastrado')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('botão de excluir está presente em cada linha', () => {
    const mockOnDelete = vi.fn()
    render(<ProductTable products={mockProducts} onDelete={mockOnDelete} />)

    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i })
    expect(deleteButtons).toHaveLength(2)
  })

  it('chama função de exclusão ao clicar no botão', async () => {
    const user = userEvent.setup()
    const mockOnDelete = vi.fn()
    render(<ProductTable products={mockProducts} onDelete={mockOnDelete} />)

    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i })
    await user.click(deleteButtons[0])

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockOnDelete).toHaveBeenCalledWith(1)
  })

  it('chama função de exclusão com o ID correto', async () => {
    const user = userEvent.setup()
    const mockOnDelete = vi.fn()
    render(<ProductTable products={mockProducts} onDelete={mockOnDelete} />)

    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i })
    await user.click(deleteButtons[1])

    expect(mockOnDelete).toHaveBeenCalledWith(2)
  })
})
