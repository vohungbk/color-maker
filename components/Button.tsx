import { FC, memo, MouseEvent } from 'react'

type Style = {
  background?: string
  marginRight?: string
}
interface ButtonProps {
  className?: string
  style?: Style
  title?: string
  children?: React.ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onMouseDown?: (event: MouseEvent<HTMLButtonElement>) => void
}
const Button: FC<ButtonProps> = ({
  children,
  className = '',
  style,
  onClick,
  onMouseDown,
  ...props
}) => {
  return (
    <button
      {...props}
      style={style}
      className={`button ${className}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {children}
    </button>
  )
}

export default memo(Button)
