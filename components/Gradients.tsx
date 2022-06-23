import React, { FC, useEffect } from 'react'

import Icon from './Icon'
import Background from './Background'
import Button from './Button'
import Circle from './Circle'
import Copy from './Copy'
import ColorRendered from './ColorRendered'
import { setGradient } from '../shared/util'
import Settings from './Settings'
import { ListGradient } from '../shared/types'

interface GradientsProps {
  gradient: ListGradient
  isCopied: boolean
  onGenerateGradient: () => void
  prevGradient: () => void
  nextGradient: () => void
  generateGradientIfNeeded: () => void
  copyGradientToClipboard: () => void
  addNewColor: () => void
  editAngle: boolean
  switchEditAngle: () => void
  changeGradientDirection: (deg: number) => void
  prefix: boolean
  fallback: boolean
  togglePrefix: () => void
  toggleFallback: () => void
  toggleEditColorOfGradient: (index: number) => void
  editColorOfGradient: (color: string) => void
  toggleSlider: () => void
  startUpdateColorStop: (index: number) => void
  updateColorStop: (percent: number) => void
  deleteSelectedColor: () => void
}

const Gradients: FC<GradientsProps> = ({
  gradient,
  isCopied,
  onGenerateGradient,
  prevGradient,
  nextGradient,
  generateGradientIfNeeded,
  copyGradientToClipboard,
  addNewColor,
  editAngle,
  switchEditAngle,
  changeGradientDirection,
  prefix,
  fallback,
  togglePrefix,
  toggleFallback,
  toggleEditColorOfGradient,
  editColorOfGradient,
  toggleSlider,
  startUpdateColorStop,
  updateColorStop,
  deleteSelectedColor,
}) => {
  useEffect(() => {
    generateGradientIfNeeded()
  }, [])

  if (!gradient) {
    return null
  }

  const { deg, showSlider, colors } = gradient
  const isDeleteColor = gradient.showHub && colors.length > 2

  return (
    <div className="colors">
      <div className="inner">
        <Settings
          togglePrefix={togglePrefix}
          toggleFallback={toggleFallback}
          prefix={prefix}
          fallback={fallback}
        />
        <Background color={setGradient(gradient)}>
          {!editAngle ? (
            <Copy
              copyToClipboard={copyGradientToClipboard}
              isCopied={isCopied}
            />
          ) : (
            <Circle
              changeGradientDirection={changeGradientDirection}
              switchEditAngle={switchEditAngle}
              deg={deg}
            />
          )}
        </Background>
        <div className="colors__handle">
          <Button
            onClick={switchEditAngle}
            className={`colors__deg ${editAngle ? 'colors__deg--active' : ''}`}
          >
            <Icon>rotate_right</Icon>
            {`${deg}°`}
          </Button>
          <ColorRendered
            gradient={gradient}
            toggleEditColorOfGradient={toggleEditColorOfGradient}
            editColorOfGradient={editColorOfGradient}
            startUpdateColorStop={startUpdateColorStop}
            updateColorStop={updateColorStop}
          />
          <Button
            onClick={!isDeleteColor ? addNewColor : deleteSelectedColor}
            style={{ background: 'transparent', marginRight: '6px' }}
            title={!isDeleteColor ? 'Add' : 'Delete'}
          >
            <Icon>
              {!isDeleteColor ? 'add_circle_outline' : 'delete_outline'}
            </Icon>
          </Button>
          <Button
            onClick={toggleSlider}
            style={{ background: 'transparent' }}
            title={!showSlider ? 'Edit' : 'Exit'}
          >
            <Icon>{!showSlider ? 'wrap_text' : 'clear'}</Icon>
          </Button>
        </div>
        <div className="colors__actions">
          <Button
            onClick={onGenerateGradient}
            className="colors__action colors__action--generate awesome-hover"
          >
            <Icon className="icon">refresh</Icon> Generate
          </Button>
          <Button
            onClick={prevGradient}
            className="colors__action awesome-hover"
          >
            <Icon className="icon">arrow_left</Icon> Back
          </Button>
          <Button
            onClick={nextGradient}
            className="colors__action awesome-hover"
          >
            Next <Icon className="icon">arrow_right</Icon>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Gradients
