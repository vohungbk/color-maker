import { createSlice } from '@reduxjs/toolkit'
import { ListColor } from '../../shared/types'

const initialState = {
  loading: false,
  currentIndex: -1,
  list: [] as ListColor[],
  isCopied: false,
}

export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    generateColor: (state) => {
      state.loading = true
    },
    generateColorSuccess: (state, action) => {
      state.loading = false
      state.isCopied = false
      state.currentIndex = state.list.length
      state.list = [...state.list, action.payload]
    },
    changeColorIndex: (state, action) => {
      state.currentIndex = action.payload
      state.isCopied = false
    },
    copyToClipboard: (state, action) => {
      state.isCopied = action.payload
    },
  },
})

export const {
  generateColor,
  generateColorSuccess,
  changeColorIndex,
  copyToClipboard,
} = colorSlice.actions

export default colorSlice.reducer
