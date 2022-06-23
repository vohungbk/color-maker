import React, { useMemo, useEffect, useRef, FC } from 'react'
import ColorPicker from './ColorPicker'
import { offset, preventClick } from '../shared/util'
import Button from './Button'
import { ListGradient } from '../shared/types'

interface ColorRenderedProps {
  gradient: ListGradient
  toggleEditColorOfGradient: (index: number) => void
  startUpdateColorStop: (index: number) => void
  updateColorStop: (percent: number) => void
  editColorOfGradient: (color: string) => void
}

const ColorRendered: FC<ColorRenderedProps> = ({
  gradient,
  toggleEditColorOfGradient,
  startUpdateColorStop,
  updateColorStop,
  editColorOfGradient,
}) => {
  const slider = useRef<HTMLDivElement>(null)
  const { colors, showSlider } = gradient
  const sliderWidth = showSlider ? 100 : colors.length * 25
  const unit = showSlider ? '%' : 'px'
  const opacity = showSlider ? 1 : 0

  useEffect(() => {
    if (!showSlider) {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [showSlider])

  const onMouseDown = (index: number) => () => {
    const { showSlider } = gradient

    if (showSlider) {
      startUpdateColorStop(index)
      window.addEventListener('mouseup', onMouseUp)
      window.addEventListener('mousemove', onMouseMove)
    }
  }

  const onMouseMove = (e) => {
    const { clientX } = e
    const { current } = slider

    if (current) {
      const diff = clientX - offset(current, 'left')
      const percent = Math.min(Math.max(diff / current.offsetWidth, 0), 1)
      updateColorStop(Math.floor(percent * 100))
    }
  }

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  const renderColor = useMemo(() => {
    const { colors, colorIndexEditing, showSlider, showHub } = gradient
    return colors.map(({ color, stop }, index, { length }) => {
      const active =
        colorIndexEditing === index && showHub ? 'button--active' : ''
      const leftStop = showSlider ? stop : Math.floor((index * 100) / length)

      return (
        <div
          className="color-rendered__color-wrapper"
          key={index}
          style={{
            top: 0,
            left: `${leftStop}%`,
            zIndex: colorIndexEditing === index ? 2 : 1,
          }}
        >
          <Button
            className={`color-rendered__color ${active}`}
            style={{ background: color }}
            title={color}
            onMouseDown={onMouseDown(index)}
            onClick={
              showSlider
                ? preventClick
                : toggleEditColorOfGradient.bind(this, index)
            }
          />
          <ColorPicker
            visible={!!active}
            color={color}
            editColorOfGradient={editColorOfGradient}
          />
        </div>
      )
    })
  }, [gradient])

  if (!gradient) {
    return null
  }

  return (
    <div className="color-rendered" ref={slider}>
      <div
        style={{ width: `${sliderWidth}${unit}` }}
        className="color-rendered__slider"
      >
        <div style={{ opacity }} className="color-rendered__fill"></div>
        {renderColor}
      </div>
    </div>
  )
}

export default React.memo(ColorRendered)
