import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ColorSlice from './slice/ColorSlice'
import GradientSlice from './slice/GradientSlice'
import SettingSlice from './slice/SettingSlice'

const reducer = combineReducers({
  ColorSlice,
  GradientSlice,
  SettingSlice,
})

const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
