import { FC, useCallback } from 'react'

import Colors from '../components/Colors'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  copyColorToClipboard,
  generateColorIfNeeded,
  nextColor,
  onGenerateColor,
  prevColor,
} from '../redux/actions/ColorActions'
import { colorsSelector } from '../redux/selectors/ColorSelectors'

const ColorContainer: FC = () => {
  const dispatch = useAppDispatch()

  const colors = useAppSelector(colorsSelector)

  const OnGenerateColor = useCallback(
    () => dispatch(onGenerateColor()),
    [dispatch]
  )
  const PrevColor = useCallback(() => dispatch(prevColor), [dispatch])
  const NextColor = useCallback(() => dispatch(nextColor), [dispatch])
  const CopyColorToClipboard = useCallback(
    () => dispatch(copyColorToClipboard()),
    [dispatch]
  )
  const GenerateColorIfNeeded = useCallback(
    () => dispatch(generateColorIfNeeded()),
    [dispatch]
  )

  return (
    <Colors
      {...colors}
      onGenerateColor={OnGenerateColor}
      prevColor={PrevColor}
      nextColor={NextColor}
      copyColorToClipboard={CopyColorToClipboard}
      generateColorIfNeeded={GenerateColorIfNeeded}
    />
  )
}

export default ColorContainer
