import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  prefix: false,
  fallback: false,
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    onTogglePrefix: (state) => {
      state.prefix = !state.prefix
    },
    onToggleFallback: (state) => {
      state.fallback = !state.fallback
    },
  },
})

export const { onTogglePrefix, onToggleFallback } = settingSlice.actions

export default settingSlice.reducer
