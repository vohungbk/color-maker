import React, { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks'
import {
  addNewColor,
  copyGradientToClipboard,
  generateGradientIfNeeded,
  nextGradient,
  onGenerateGradient,
  prevGradient,
  toggleFallback,
  togglePrefix,
} from '../redux/actions'
import { gradientsSelector, settingsSelector } from '../redux/selectors'
import {
  changeGradientDirection,
  deleteSelectedColor,
  editColorOfGradient,
  startUpdateColorStop,
  switchEditAngle,
  toggleEditColorOfGradient,
  toggleSlider,
  updateColorStop,
} from '../redux/slice/GradientSlice'

import Gradients from './Gradients'

const GradientsContainer = () => {
  const gradients = useAppSelector(gradientsSelector)
  const settings = useAppSelector(settingsSelector)
  const dispatch = useAppDispatch()

  const OnGenerateGradient = useCallback(
    () => dispatch(onGenerateGradient()),
    [dispatch]
  )
  const PrevGradient = useCallback(() => dispatch(prevGradient()), [dispatch])
  const NextGradient = useCallback(() => dispatch(nextGradient()), [dispatch])
  const GenerateGradientIfNeeded = useCallback(
    () => dispatch(generateGradientIfNeeded()),
    [dispatch]
  )
  const CopyGradientToClipboard = useCallback(
    () => dispatch(copyGradientToClipboard()),
    [dispatch]
  )
  const AddNewColor = useCallback(() => dispatch(addNewColor()), [dispatch])
  const SwitchEditAngle = useCallback(
    () => dispatch(switchEditAngle()),
    [dispatch]
  )
  const ChangeGradientDirection = useCallback(
    (deg: number) => dispatch(changeGradientDirection(deg)),
    [dispatch]
  )
  const TogglePrefix = useCallback(() => dispatch(togglePrefix()), [dispatch])
  const ToggleFallback = useCallback(
    () => dispatch(toggleFallback()),
    [dispatch]
  )
  const ToggleEditColorOfGradient = useCallback(
    (colorIndex: number) => dispatch(toggleEditColorOfGradient(colorIndex)),
    [dispatch]
  )
  const EditColorOfGradient = useCallback(
    (color: string) => dispatch(editColorOfGradient(color)),
    [dispatch]
  )
  const ToggleSlider = useCallback(() => dispatch(toggleSlider()), [dispatch])
  const StartUpdateColorStop = useCallback(
    (colorIndex: number) => dispatch(startUpdateColorStop(colorIndex)),
    [dispatch]
  )
  const UpdateColorStop = useCallback(
    (percent: number) => dispatch(updateColorStop(percent)),
    [dispatch]
  )
  const DeleteSelectedColor = useCallback(
    () => dispatch(deleteSelectedColor()),
    [dispatch]
  )

  return (
    <Gradients
      {...gradients}
      {...settings}
      onGenerateGradient={OnGenerateGradient}
      prevGradient={PrevGradient}
      nextGradient={NextGradient}
      generateGradientIfNeeded={GenerateGradientIfNeeded}
      copyGradientToClipboard={CopyGradientToClipboard}
      addNewColor={AddNewColor}
      switchEditAngle={SwitchEditAngle}
      changeGradientDirection={ChangeGradientDirection}
      togglePrefix={TogglePrefix}
      toggleFallback={ToggleFallback}
      toggleEditColorOfGradient={ToggleEditColorOfGradient}
      editColorOfGradient={EditColorOfGradient}
      toggleSlider={ToggleSlider}
      startUpdateColorStop={StartUpdateColorStop}
      updateColorStop={UpdateColorStop}
      deleteSelectedColor={DeleteSelectedColor}
    />
  )
}

export default GradientsContainer
