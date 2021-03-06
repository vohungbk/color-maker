import { copyTextToClipboard, getRandomColor } from '../../shared/util'
import {
  changeColorIndex,
  copyToClipboard,
  generateColor,
  generateColorSuccess,
} from '../slice/ColorSlice'
import { Dispatch } from 'redux'
import { AppDispatch, RootState } from '../store'
import {
  getColors,
  getNextColorIndex,
  getPrevColorIndex,
} from '../selectors/ColorSelectors'

export const onGenerateColor = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(generateColor())
    const color = await getRandomColor()
    dispatch(generateColorSuccess(color))
  } catch (err) {
    console.log('generate color error:', err)
  }
}

export const prevColor = () => (dispatch: Dispatch, getState: RootState) => {
  const state = getState
  const prevIndex = getPrevColorIndex(state)
  if (prevIndex !== -1) {
    dispatch(changeColorIndex(prevIndex))
  }
}

export const nextColor = () => (dispatch: Dispatch, getState: RootState) => {
  const nextIndex = getNextColorIndex(getState)
  if (nextIndex !== -1) {
    dispatch(changeColorIndex(nextIndex))
  }
}

export const copyColorToClipboard =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const colors = getColors(getState())

    const hasItems = colors.list.length > 0
    const currentIndex = colors.currentIndex

    if (hasItems && currentIndex >= 0) {
      const successful = await copyTextToClipboard(colors.list[currentIndex])
      dispatch(copyToClipboard(successful))
    }
  }

export const generateColorIfNeeded =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState()
    const colors = getColors(state)
    if (colors.list.length === 0) {
      dispatch(onGenerateColor())
    }
  }
