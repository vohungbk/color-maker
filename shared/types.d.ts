export type ListColor = {
  color: string
  background?: string
  stop: number
}

export type Tab = 'gradients' | 'colors'

export type ListGradient = {
  colors: ListColor[]
  deg: number
  showHub: boolean
  showSlider: boolean
  colorIndexEditing: number
}
