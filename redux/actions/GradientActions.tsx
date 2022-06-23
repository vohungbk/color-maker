import { ListColor } from '../../shared/types'
import {
  copyTextToClipboard,
  getRandomColor,
  setGradient,
} from '../../shared/util'
import {
  getGradients,
  getNextGradientIndex,
  getPrevGradientIndex,
  getSettings,
} from '../selectors'
import {
  addNewColorGradient,
  changeGradientIndex,
  copyToClipboard,
  generateGradientRequest,
  generateGradientSuccess,
} from '../slice/GradientSlice'
import { AppDispatch, RootState } from '../store'

export const onGenerateGradient = () => async (dispatch: AppDispatch) => {
  dispatch(generateGradientRequest())
  Promise.all([getRandomColor(), getRandomColor()])
    .then((values) => {
      const deg = Math.floor(Math.random() * 360)

      dispatch(
        generateGradientSuccess({
          colors: values as unknown as ListColor[],
          deg,
          showHub: false,
          showSlider: false,
          colorIndexEditing: -1,
        })
      )
    })
    .catch((err) => console.log(err))
}

export const prevGradient = () => (dispatch, getState) => {
  const state = getState()
  const prevIndex = getPrevGradientIndex(state)
  if (prevIndex !== -1) {
    dispatch(changeGradientIndex(prevIndex))
  }
}

export const nextGradient = () => (dispatch, getState) => {
  const state = getState()
  const nextIndex = getNextGradientIndex(state)
  if (nextIndex !== -1) {
    dispatch(changeGradientIndex(nextIndex))
  }
}

export const generateGradientIfNeeded =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState()
    const gradients = getGradients(state)

    if (!gradients || gradients?.list?.length === 0) {
      dispatch(onGenerateGradient())
    }
  }

export const copyGradientToClipboard =
  () => async (dispatch, getState: () => RootState) => {
    const state = getState()
    const gradients = getGradients(state)
    const { prefix, fallback } = getSettings(state)

    const hasItems = gradients.list.length > 0
    const currentIndex = gradients.currentIndex
    const colorsFromGradient = gradients.list[currentIndex]

    if (colorsFromGradient) {
      if (hasItems && currentIndex >= 0 && !!colorsFromGradient) {
        const successful = await copyTextToClipboard(
          setGradient(colorsFromGradient, prefix, fallback, true, true)
        )
        dispatch(copyToClipboard(successful))
      }
    }
  }

export const addNewColor = () => async (dispatch, getState) => {
  try {
    const state = getState()
    const gradients = getGradients(state)
    const currentIndex = gradients.currentIndex
    const colorsFromGradient = gradients.list[currentIndex]

    if (colorsFromGradient && colorsFromGradient.colors.length < 5) {
      const color = await getRandomColor()
      dispatch(addNewColorGradient(color))
    }
  } catch (err) {
    console.log('add new color error:', err)
  }
}
