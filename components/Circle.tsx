import React, { useRef, useEffect, useState, FC } from 'react'
import { offset } from '../shared/util'

interface CircleProps {
  deg: number
  changeGradientDirection: (angle: number) => void
  switchEditAngle: () => void
}

const Circle: FC<CircleProps> = ({
  deg,
  changeGradientDirection,
  switchEditAngle,
}) => {
  const [centerCircleX, setCenterCircleX] = useState(0)
  const [centerCircleY, setCenterCircleY] = useState(0)
  const handleRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (evt) => {
    const { clientX, clientY } = evt
    const diffX = clientX - centerCircleX
    const diffY = clientY - centerCircleY
    let angle = Math.floor((Math.atan2(diffY, diffX) * 180) / Math.PI)
    angle = angle < 0 ? 360 + angle : angle
    changeGradientDirection(angle)
  }

  useEffect(() => {
    const { current } = handleRef
    if (current) {
      setCenterCircleX(offset(current, 'left'))
      setCenterCircleY(offset(current, 'top'))
    }

    return () => {
      handleRef?.current?.offsetParent?.removeEventListener(
        'mousemove',
        onMouseMove,
        false
      )
    }
  }, [handleRef, onMouseMove])

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={switchEditAngle}
      className="circle"
    >
      <div className="circle__cover"></div>
      <div
        ref={handleRef}
        style={{ transform: `rotate(${deg}deg)` }}
        className="circle__handle"
      ></div>
    </div>
  )
}

export default React.memo(Circle)
