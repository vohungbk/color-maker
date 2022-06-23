import { MouseEvent } from 'react'
import { LOCALSTORAGE_KEY } from './constant'
import { ListGradient, ListColor } from './types'

export function getRandomColor() {
  return new Promise((resolve) => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    resolve(color)
  })
}

export async function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text)
  }
  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch(() => false)
}

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea')

  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  let successful = false
  try {
    successful = document.execCommand('copy')
  } catch (err) {
    console.log('Fallback: Oops, unable to copy', err)
  }

  document.body.removeChild(textArea)

  return successful
}

function setValues(colors: ListColor[]) {
  const copyArr = [...colors]

  return copyArr
    .sort((left, right) => left.stop - right.stop)
    .map((item) => `${item.color} ${item.stop}%`)
}

export function offset(e, direction = 'top') {
  let el = e
  let x = direction === 'left' ? e.offsetLeft : e.offsetTop

  if (el.offsetParent) {
    while (el.offsetParent) {
      x +=
        direction === 'left'
          ? el.offsetParent.offsetLeft
          : el.offsetParent.offsetTop
      el = el.offsetParent
    }
  }
  return x
}

export function preventClick(e: MouseEvent<HTMLButtonElement>) {
  e.preventDefault()
  e.stopPropagation()
}

function setAttributeName(colors: ListColor[], attrName: boolean) {
  if (!attrName) {
    return colors
  }
  return colors.map((color) => `background: ${color}`) as unknown as ListColor[]
}

function setSemicolon(colors: ListColor[], semicolon: boolean) {
  if (!semicolon) {
    return colors
  }
  return colors.map((color) => `${color};`)
}

function setIfFallback(color: string, fallback: boolean) {
  if (!fallback) {
    return [] as ListColor[]
  }
  return [color] as unknown as ListColor[]
}

function setIfPrefix(colors: string[], deg: number, prefix: boolean) {
  const result: string[] = []
  if (prefix) {
    const prefixes = ['-webkit-', '-o-']
    for (let i = 0; i < prefixes.length; i++) {
      result.push(`${prefixes[i]}linear-gradient(${deg}deg, ${colors})`)
    }
  }
  result.push(`linear-gradient(${deg}deg, ${colors})`)
  return result as unknown as ListColor[]
}

export function setGradient(
  gradient: ListGradient,
  prefix = false,
  fallback = false,
  attrName = false,
  semicolon = false
) {
  if (!gradient || (gradient && !gradient.colors)) {
    return ''
  }
  const { colors, deg } = gradient

  const newArray = [
    ...setIfFallback(colors.length ? colors[0]?.color : '', fallback),
    ...setIfPrefix(setValues(colors), deg, prefix),
  ]

  return (
    setSemicolon(setAttributeName(newArray, attrName), semicolon).join('\n') ||
    ''
  )
}

export function calculateStop(max: number, length: number, point: number) {
  return Math.ceil((point * max) / (length - 1))
}

export function setLocalStorage(data) {
  try {
    const serializedData = JSON.stringify({
      settings: {
        ...data,
      },
    })
    window.localStorage.setItem(LOCALSTORAGE_KEY, serializedData)
  } catch (e) {
    console.log('Set local storage failed')
  }
}
