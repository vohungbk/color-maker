import React, { FC } from 'react'

interface IconProps {
  children: React.ReactNode
  className?: string
}

const Icon: FC<IconProps> = ({ children, className = '' }) => {
  return <i className={`${className} material-icons`}>{children}</i>
}

export default React.memo(Icon)
