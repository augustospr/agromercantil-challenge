import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { createProduct, deleteProduct, fetchProducts } from '@/services/api'
import type { Product } from '@/types/product'

interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts()
    return response
  }
)

export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (id: number) => {
    await deleteProduct(id)
    return id
  }
)

export const createProductAsync = createAsyncThunk(
  'products/createProduct',
  async (data: { name: string; price: number }) => {
    const product = await createProduct(data.name, data.price)
    return product
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: { payload: Product }) => {
      state.items.push(action.payload)
    },
    clearError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductsAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProductsAsync.rejected, state => {
        state.loading = false
        state.error = 'Erro ao carregar produtos. Tente novamente.'
      })
      .addCase(deleteProductAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter(item => item.id !== action.payload)
      })
      .addCase(deleteProductAsync.rejected, state => {
        state.loading = false
        state.error = 'Erro ao excluir produto. Tente novamente.'
      })
      .addCase(createProductAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(createProductAsync.rejected, state => {
        state.loading = false
        state.error = 'Erro ao criar produto. Tente novamente.'
      })
  },
})

export const { addProduct, clearError } = productsSlice.actions
export default productsSlice.reducer
