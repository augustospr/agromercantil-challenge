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
    expect(screen.getAllByText('Produto 1').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Produto 2').length).toBeGreaterThan(0)
  })

  it('exibe nome e preço corretamente', () => {
    const mockOnDelete = vi.fn()
    render(<ProductTable products={mockProducts} onDelete={mockOnDelete} />)

    const table = screen.getByRole('table')
    const rows = table.querySelectorAll('tbody tr')

    expect(rows.length).toBeGreaterThan(0)

    expect(screen.getAllByText('R$ 100,00').length).toBeGreaterThan(0)
    expect(screen.getAllByText('R$ 200,50').length).toBeGreaterThan(0)
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
    expect(deleteButtons.length).toBeGreaterThanOrEqual(2)
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
