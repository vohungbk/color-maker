import React, { FC } from 'react'
import Icon from './Icon'

interface CopyProps {
  copyToClipboard: () => void
  isCopied: boolean
}

const Copy: FC<CopyProps> = ({ copyToClipboard, isCopied }) => {
  return (
    <div onClick={copyToClipboard} className="copy">
      <span className="copy__text">
        <Icon className="icon">{isCopied ? 'done' : 'code'}</Icon>
        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
      </span>
    </div>
  )
}

export default React.memo(Copy)
