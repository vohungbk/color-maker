import { createSelector } from 'reselect'
import { RootState } from '../store'

export const getSettings = (state: RootState) => state.SettingSlice

export const settingsSelector = createSelector(getSettings, (settings) => ({
  prefix: settings.prefix,
  fallback: settings.fallback,
}))
