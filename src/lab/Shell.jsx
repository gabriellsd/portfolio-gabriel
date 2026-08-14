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
  const loginStarted = useRef(false)

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
    if (authenticated) loginStarted.current = false
    if (!open || authenticated) return
    if (inProgress !== InteractionStatus.None) return
    if (loginStarted.current) return
    loginStarted.current = true
    markPendingAuth()
    void instance.loginRedirect(loginRequest).catch(() => {
      loginStarted.current = false
    })
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

  async function signOut() {
    lockSession()
    setOpen(false)
    if (window.location.hash === '#gd') history.replaceState(null, '', window.location.pathname)
    try {
      await instance.logoutRedirect({
        extraQueryParameters: { ui_locales: 'pt-BR' },
      })
    } catch {
      await instance.logoutRedirect({
        onRedirectNavigate: () => false,
      })
    }
  }

  return (
    <>
      <App onSecretTap={onSecretTap} />
      {gate ? <Gate onUnlock={unlock} onCancel={() => setGate(false)} /> : null}
      {open && authenticated ? <Studio onClose={closeStudio} onSignOut={signOut} /> : null}
    </>
  )
}
