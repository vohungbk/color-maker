import { FC, useEffect } from 'react'
import Background from './Background'
import Button from './Button'
import Copy from './Copy'
import Icon from './Icon'

interface ColorsProps {
  color: string
  isCopied: boolean
  onGenerateColor: () => void
  prevColor: () => void
  nextColor: () => void
  copyColorToClipboard: () => void
  generateColorIfNeeded: () => void
}
const Colors: FC<ColorsProps> = ({
  color,
  isCopied,
  onGenerateColor,
  prevColor,
  nextColor,
  copyColorToClipboard,
  generateColorIfNeeded,
}) => {
  useEffect(() => {
    generateColorIfNeeded()
    document.title = 'Color Maker - Colors'
  }, [])

  return (
    <div className="colors">
      <div className="inner">
        <Background color={color}>
          {color && (
            <Copy copyToClipboard={copyColorToClipboard} isCopied={isCopied} />
          )}
        </Background>
        <div className="colors__value">{color}</div>
        <div className="colors__actions">
          <Button
            onClick={onGenerateColor}
            className="colors__action colors__action--generate awesome-hover"
          >
            <Icon className="icon">refresh</Icon> Generate
          </Button>
          <Button onClick={prevColor} className="colors__action awesome-hover">
            <Icon className="icon">arrow_left</Icon> Back
          </Button>
          <Button onClick={nextColor} className="colors__action awesome-hover">
            Next <Icon className="icon">arrow_right</Icon>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Colors
