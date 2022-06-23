import { createSelector } from 'reselect'
import { RootState } from '../store'

export const getGradients = (state: RootState) => state.GradientSlice

export const gradientsSelector = createSelector(getGradients, (gradients) => ({
  isCopied: gradients.isCopied,
  editAngle: gradients.editAngle,
  gradient: gradients.list[gradients.currentIndex],
}))

export const getPrevGradientIndex = createSelector(
  getGradients,
  (gradients) => {
    const currentIndex = gradients.currentIndex
    return currentIndex <= 0 ? -1 : currentIndex - 1
  }
)

export const getNextGradientIndex = createSelector(
  getGradients,
  (gradients) => {
    const listLength = gradients.list.length
    const currentIndex = gradients.currentIndex
    return currentIndex === listLength - 1 ? -1 : currentIndex + 1
  }
)
