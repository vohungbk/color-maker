import React, { FC } from 'react'
import Icon from './Icon'

interface SettingsProps {
  prefix: boolean
  fallback: boolean
  togglePrefix: () => void
  toggleFallback: () => void
}

const Settings: FC<SettingsProps> = ({
  prefix,
  fallback,
  togglePrefix,
  toggleFallback,
}) => {
  return (
    <div className="settings">
      <div onClick={togglePrefix} className="settings__section">
        <span>Prefixes</span>
        <Icon className="icon">
          {prefix ? 'check_box' : 'check_box_outline_blank'}
        </Icon>
      </div>
      <div onClick={toggleFallback} className="settings__section">
        <span>Fallback</span>
        <Icon className="icon">
          {fallback ? 'check_box' : 'check_box_outline_blank'}
        </Icon>
      </div>
    </div>
  )
}

export default React.memo(Settings)
