import { FC, memo } from 'react'

type Style = {
  background?: string
  marginRight?: string
}
interface ButtonProps {
  className: string
  style?: Style
  children: React.ReactNode
  onClick: () => void
}
const Button: FC<ButtonProps> = ({
  children,
  className = '',
  style,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      style={style}
      className={`button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default memo(Button)
