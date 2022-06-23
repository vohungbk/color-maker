import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListColor, ListGradient } from '../../shared/types'
import { calculateStop } from '../../shared/util'

interface GradientState {
  loading: boolean
  currentIndex: number
  list: ListGradient[]
  isCopied: boolean
  editAngle: boolean
}

const initialState: GradientState = {
  loading: false,
  currentIndex: -1,
  list: [],
  isCopied: false,
  editAngle: false,
}

const initialGradient: ListGradient = {
  colors: [],
  deg: 0,
  colorIndexEditing: -1,
  showSlider: false,
  showHub: false,
}

function gradient(state = initialGradient, payload: ListGradient) {
  return {
    ...state,
    colors: state.colors.concat(payload.colors).map((color, index, colors) => ({
      color,
      stop: calculateStop(100, colors.length, index),
    })) as unknown as ListColor[],
    deg: payload.deg,
    showHub: false,
    showSlider: false,
    colorIndexEditing: -1,
  }
}

export const gradientSlice = createSlice({
  name: 'gradient',
  initialState,
  reducers: {
    generateGradientRequest: (state) => {
      state.loading = true
    },
    generateGradientSuccess: (state, action: PayloadAction<ListGradient>) => {
      const { payload } = action

      state.loading = false
      state.isCopied = false
      state.editAngle = false
      state.currentIndex = state.list.length
      state.list = [...state.list, gradient(undefined, payload)]
    },
    changeGradientIndex: (state, action) => {
      state.currentIndex = action.payload
      state.isCopied = false
      state.editAngle = false
    },
    copyToClipboard: (state, action) => {
      state.isCopied = action.payload
      state.editAngle = false
    },
    toggleEditColorOfGradient: (state, action) => {
      const { payload } = action
      state.isCopied = false
      state.list = state.list.map((item, index) => {
        return index === state.currentIndex
          ? {
              ...item,
              colorIndexEditing: payload,
              showHub:
                item.colorIndexEditing !== payload ? true : !item.showHub,
            }
          : item
      })
    },
    editColorOfGradient: (state, action) => {
      const { payload } = action
      state.isCopied = false
      state.list = state.list.map((item, index) => {
        return index === state.currentIndex
          ? {
              ...item,
              colors: item.colors.map((color, index) => {
                return index === item.colorIndexEditing
                  ? { ...color, color: payload }
                  : color
              }),
            }
          : item
      })
    },
    addNewColorGradient: (state, action) => {
      const { payload } = action
      state.isCopied = false
      state.list = state.list.map((item, index) => {
        return index === state.currentIndex
          ? {
              ...item,
              colors: [...item.colors, { color: payload }].map(
                (color, index, colors) => ({
                  ...color,
                  stop: calculateStop(100, colors.length, index),
                })
              ),
              showHub: false,
            }
          : item
      })
    },
    toggleSlider: (state) => {
      state.isCopied = false
      state.list = state.list.map((item, index) => {
        return index === state.currentIndex
          ? {
              ...item,
              showSlider: !item.showSlider,
              showHub: false,
              colors: [...item.colors].sort(
                (left, right) => left.stop - right.stop
              ),
            }
          : item
      })
    },
    startUpdateColorStop: (state, action) => {
      const { payload } = action
      state.isCopied = false
      state.list = state.list.map((item, index) => {
        return index === state.currentIndex
          ? {
              ...item,
              colorIndexEditing: payload,
            }
          : item
      })
    },
    updateColorStop: (state, action) => {
      const { payload } = action
      state.isCopied = false
      state.list = state.list.map((item, index) => {
        return index === state.currentIndex
          ? {
              ...item,
              colors: item.colors.map((color, index) => {
                return index === item.colorIndexEditing
                  ? { ...color, stop: payload }
                  : color
              }),
            }
          : item
      })
    },
    deleteSelectedColor: (state) => {
      state.isCopied = false
      state.list = state.list.map((item, index) => {
        return index === state.currentIndex
          ? {
              ...item,
              colors: [
                ...item.colors.filter(
                  (_, index) => index !== item.colorIndexEditing
                ),
              ],
              colorIndexEditing: -1,
              showHub: false,
            }
          : item
      })
    },
    switchEditAngle: (state) => {
      state.editAngle = !state.editAngle
      state.isCopied = false
    },
    changeGradientDirection: (state, action) => {
      state.isCopied = false
      state.list = state.list.map((item, index) => {
        return index === state.currentIndex
          ? {
              ...item,
              deg: action.payload,
            }
          : item
      })
    },
  },
})

export const {
  generateGradientRequest,
  generateGradientSuccess,
  changeGradientIndex,
  copyToClipboard,
  addNewColorGradient,
  switchEditAngle,
  toggleEditColorOfGradient,
  editColorOfGradient,
  toggleSlider,
  startUpdateColorStop,
  updateColorStop,
  deleteSelectedColor,
  changeGradientDirection,
} = gradientSlice.actions

export default gradientSlice.reducer
