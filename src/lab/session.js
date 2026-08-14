import { exportKeyFromPin, importStoredKey } from './crypto.js'

const HASH_KEY = 'calc.mem.a'
const SALT_KEY = 'calc.mem.b'
const OPEN_KEY = 'calc.mem.s'
const PENDING_KEY = 'calc.mem.p'
const KEY_STORE = 'calc.mem.k'

function toHex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function readMem(key) {
  return sessionStorage.getItem(key) || localStorage.getItem(key)
}

function writeMem(key, value) {
  sessionStorage.setItem(key, value)
  localStorage.setItem(key, value)
}

function clearMem(key) {
  sessionStorage.removeItem(key)
  localStorage.removeItem(key)
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
  return readMem(OPEN_KEY) === '1'
}

export function unlockSession() {
  writeMem(OPEN_KEY, '1')
}

export function lockSession() {
  clearMem(OPEN_KEY)
  clearMem(KEY_STORE)
  clearMem(PENDING_KEY)
}

export async function storeKeyFromPin(pin) {
  const salt = localStorage.getItem(SALT_KEY)
  if (!salt) throw new Error('Código não definido')
  const { hex, key } = await exportKeyFromPin(pin, salt)
  writeMem(KEY_STORE, hex)
  return key
}

export async function loadKey() {
  const raw = readMem(KEY_STORE)
  if (!raw) return null
  return importStoredKey(raw)
}

export function markPendingAuth() {
  writeMem(PENDING_KEY, '1')
}

export function consumePendingAuth() {
  if (readMem(PENDING_KEY) !== '1') return false
  clearMem(PENDING_KEY)
  return true
}
