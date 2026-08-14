import { useEffect, useRef, useState } from 'react'
import { InteractionStatus } from '@azure/msal-browser'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import App from '../App.jsx'
import { loginRequest } from './auth'
import { Gate } from './Gate.jsx'
import { Studio } from './Studio.jsx'
import {
  consumePendingAuth,
  isUnlocked,
  lockSession,
  markPendingAuth,
  unlockSession,
} from './session'

export function Shell() {
  const { instance, inProgress } = useMsal()
  const authenticated = useIsAuthenticated()
  const [open, setOpen] = useState(() => isUnlocked())
  const [gate, setGate] = useState(false)
  const taps = useRef(0)
  const tapTimer = useRef(null)

  useEffect(() => {
    const pending = consumePendingAuth()
    if (pending || isUnlocked()) {
      unlockSession()
      setOpen(true)
      return
    }
    if (window.location.hash === '#gd') setGate(true)
  }, [])

  useEffect(() => {
    if (open && authenticated) unlockSession()
  }, [open, authenticated])

  useEffect(() => {
    if (!open || authenticated) return
    if (
      inProgress === InteractionStatus.Startup ||
      inProgress === InteractionStatus.HandleRedirect
    ) {
      return
    }
    markPendingAuth()
    void instance.loginRedirect(loginRequest)
  }, [open, authenticated, inProgress, instance])

  function onSecretTap() {
    taps.current += 1
    if (tapTimer.current) window.clearTimeout(tapTimer.current)
    tapTimer.current = window.setTimeout(() => {
      taps.current = 0
    }, 900)
    if (taps.current >= 7) {
      taps.current = 0
      setGate(true)
    }
  }

  function unlock() {
    unlockSession()
    setGate(false)
    setOpen(true)
  }

  function closeStudio() {
    lockSession()
    setOpen(false)
    if (window.location.hash === '#gd') history.replaceState(null, '', window.location.pathname)
  }

  return (
    <>
      <App onSecretTap={onSecretTap} />
      {gate ? <Gate onUnlock={unlock} onCancel={() => setGate(false)} /> : null}
      {open && authenticated ? <Studio onClose={closeStudio} /> : null}
    </>
  )
}
