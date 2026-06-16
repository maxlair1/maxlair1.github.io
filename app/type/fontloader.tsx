'use client'
import { useEffect } from 'react'
import Fonts from './fonts.json'

export default function FontLoader() {
  useEffect(() => {
    Fonts.forEach(({ font, source }) => {
      const id = `font-${font.replace(/\s+/g, '-').toLowerCase()}`
      if (document.getElementById(id)) return

      const isStylesheet = source.endsWith('.css') || source.includes('googleapis')

      if (isStylesheet) {
        const link = document.createElement('link')
        link.id = id
        link.rel = 'stylesheet'
        link.href = source
        document.head.appendChild(link)
      } else {
        const style = document.createElement('style')
        style.id = id
        const format = source.endsWith('.ttf') ? 'truetype' : 'woff2'
        style.textContent = `@font-face { font-family: '${font}'; src: url('${source}') format('${format}'); font-display: swap; }`
        document.head.appendChild(style)
      }
    })
  }, [])

  return null
}
