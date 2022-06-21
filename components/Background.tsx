import { FC } from 'react'

interface BackgroundProps {
  color?: string
  children?: React.ReactNode
}

const Background: FC<BackgroundProps> = ({ color, children }) => {
  return (
    <div style={{ background: color }} className="background">
      {children}
    </div>
  )
}

export default Background
