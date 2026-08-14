import { deriveAesKey, exportKey, importKey } from './crypto.js'

const HASH_KEY = 'calc.mem.a'
const SALT_KEY = 'calc.mem.b'
const OPEN_KEY = 'calc.mem.s'
const PENDING_KEY = 'calc.mem.p'
const KEY_STORE = 'calc.mem.k'

function toHex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function sha256(value) {
  const data = new TextEncoder().encode(value)
  return toHex(await crypto.subtle.digest('SHA-256', data))
}

export function hasPin() {
  return Boolean(localStorage.getItem(HASH_KEY) && localStorage.getItem(SALT_KEY))
}

export async function setPin(pin) {
  const salt = crypto.randomUUID()
  const hash = await sha256(`${salt}:${pin}`)
  localStorage.setItem(SALT_KEY, salt)
  localStorage.setItem(HASH_KEY, hash)
}

export async function checkPin(pin) {
  const salt = localStorage.getItem(SALT_KEY)
  const hash = localStorage.getItem(HASH_KEY)
  if (!salt || !hash) return false
  return (await sha256(`${salt}:${pin}`)) === hash
}

export function isUnlocked() {
  return sessionStorage.getItem(OPEN_KEY) === '1'
}

export function unlockSession() {
  sessionStorage.setItem(OPEN_KEY, '1')
}

export function lockSession() {
  sessionStorage.removeItem(OPEN_KEY)
  sessionStorage.removeItem(KEY_STORE)
}

export async function storeKeyFromPin(pin) {
  const salt = localStorage.getItem(SALT_KEY)
  if (!salt) throw new Error('Código não definido')
  const key = await deriveAesKey(pin, salt)
  sessionStorage.setItem(KEY_STORE, await exportKey(key))
  return key
}

export async function loadKey() {
  const raw = sessionStorage.getItem(KEY_STORE)
  if (!raw) return null
  return importKey(raw)
}

export function markPendingAuth() {
  sessionStorage.setItem(PENDING_KEY, '1')
}

export function consumePendingAuth() {
  if (sessionStorage.getItem(PENDING_KEY) !== '1') return false
  sessionStorage.removeItem(PENDING_KEY)
  return true
}
