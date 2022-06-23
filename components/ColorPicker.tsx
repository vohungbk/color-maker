import React, { FC } from 'react'
import { ChromePicker } from 'react-color'

interface ColorPickerProps {
  color: string
  editColorOfGradient: (color: string) => void
  visible: boolean
}

const ColorPicker: FC<ColorPickerProps> = ({
  color = '#fff',
  editColorOfGradient,
  visible,
}) => {
  const handleChange = (colorSelected) => {
    const { hex } = colorSelected
    editColorOfGradient(hex)
  }

  if (!visible) {
    return null
  }

  return (
    <div className="color-picker">
      <ChromePicker disableAlpha color={color} onChange={handleChange} />
    </div>
  )
}

ColorPicker.defaultProps = {
  color: '#fff',
  visible: false,
}

export default React.memo(ColorPicker)
