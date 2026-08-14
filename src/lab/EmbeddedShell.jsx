import { useEffect, useRef, useState } from 'react'
import App from '../App.jsx'
import { OpenExternal } from './OpenExternal.jsx'

export function EmbeddedShell() {
  const [hint, setHint] = useState(false)
  const taps = useRef(0)
  const tapTimer = useRef(null)

  useEffect(() => {
    if (window.location.hash === '#gd') setHint(true)
  }, [])

  function onSecretTap() {
    taps.current += 1
    if (tapTimer.current) window.clearTimeout(tapTimer.current)
    tapTimer.current = window.setTimeout(() => {
      taps.current = 0
    }, 900)
    if (taps.current >= 7) {
      taps.current = 0
      setHint(true)
    }
  }

  return (
    <>
      <App onSecretTap={onSecretTap} />
      {hint ? <OpenExternal onClose={() => setHint(false)} /> : null}
    </>
  )
}
