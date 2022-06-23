import { setLocalStorage } from '../../shared/util'
import { settingsSelector } from '../selectors'
import { onToggleFallback, onTogglePrefix } from '../slice/SettingSlice'

export const togglePrefix = () => (dispatch, getState) => {
  const state = getState()
  const settings = settingsSelector(state)
  const prefix = !settings.prefix

  dispatch(onTogglePrefix())

  setLocalStorage({ ...settings, prefix })
}

export const toggleFallback = () => (dispatch, getState) => {
  const state = getState()
  const settings = settingsSelector(state)
  const fallback = !settings.fallback

  dispatch(onToggleFallback())

  setLocalStorage({ ...settings, fallback })
}
