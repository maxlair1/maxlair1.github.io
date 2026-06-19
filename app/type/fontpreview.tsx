'use client'
import { useEffect, useState } from 'react'

interface FontPreviewProps {
  font: string;
  source: string;
  href: string;
}

export default function FontPreview({ font, source, href }: FontPreviewProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const id = `font-${font.replace(/\s+/g, '-').toLowerCase()}`
    if (document.getElementById(id)) {
      document.fonts.load(`16px '${font}'`).then(() => setLoaded(true)).catch(() => {})
      return
    }

    const isStylesheet = source.endsWith('.css') || source.includes('googleapis') || source.includes('fonts.adobe')

    if (isStylesheet) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = source
      link.onload = () => document.fonts.load(`16px '${font}'`).then(() => setLoaded(true)).catch(() => {})
      document.head.appendChild(link)
    } else {
      // local file or direct .woff2/.ttf URL — inject @font-face
      const style = document.createElement('style')
      style.id = id
      const format = source.endsWith('.ttf') ? 'truetype' : 'woff2'
      style.textContent = `@font-face { font-family: '${font}'; src: url('${source}') format('${format}'); font-display: swap; }`
      document.head.appendChild(style)
      document.fonts.load(`16px '${font}'`).then(() => setLoaded(true)).catch(() => {})
    }
  }, [source, font])

  return (
    <div className='truncate'>
      <h3 className="font-medium text-muted-foreground text-xs mb-1 font-mono uppercase mt-8">
          {font}
      </h3>
      <a className='text-accent-foreground/75 hover:text-accent-foreground underline underline-offset-2 dark:decoration-taupe-700 truncate' style={{ fontFamily: `'${font}', sans-serif`, opacity: loaded ? 1 : 0 }} href={href}>
        Grumpy wizards make toxic brew for the evil queen
      </a>
    </div>
  )
}
