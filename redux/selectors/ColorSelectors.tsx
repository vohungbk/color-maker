import { createSelector } from 'reselect'
import { RootState } from '../store'

export const getColors = (state: RootState) => state.ColorSlice

export const colorsSelector = createSelector(getColors, (colors) => ({
  isCopied: colors.isCopied,
  color: colors.list[colors.currentIndex],
}))

export const getPrevColorIndex = createSelector(getColors, (colors) => {
  const currentIndex = colors.currentIndex
  return currentIndex <= 0 ? -1 : currentIndex - 1
})

export const getNextColorIndex = createSelector(getColors, (colors) => {
  const listLength = colors.list.length
  const currentIndex = colors.currentIndex
  return currentIndex === listLength - 1 ? -1 : currentIndex + 1
})
