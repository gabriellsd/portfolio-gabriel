const MAGIC = new Uint8Array([0x47, 0x44, 0x30, 0x31])

export async function deriveAesKey(pin, salt) {
  const material = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(pin),
    'PBKDF2',
    false,
    ['deriveKey'],
  )
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new TextEncoder().encode(salt),
      iterations: 120000,
      hash: 'SHA-256',
    },
    material,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  )
}

export async function exportKey(key) {
  return JSON.stringify(await crypto.subtle.exportKey('jwk', key))
}

export async function importKey(jwkJson) {
  return crypto.subtle.importKey(
    'jwk',
    JSON.parse(jwkJson),
    { name: 'AES-GCM' },
    true,
    ['encrypt', 'decrypt'],
  )
}

export async function encryptBytes(key, plain) {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const ct = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plain),
  )
  const out = new Uint8Array(4 + 12 + ct.length)
  out.set(MAGIC, 0)
  out.set(iv, 4)
  out.set(ct, 16)
  return out
}

export async function decryptBytes(key, packed) {
  if (packed.length < 17 || packed[0] !== 0x47 || packed[1] !== 0x44) {
    throw new Error('Arquivo inválido')
  }
  const iv = packed.slice(4, 16)
  const ct = packed.slice(16)
  return new Uint8Array(
    await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct),
  )
}

export async function packMedia(key, file) {
  const raw = new Uint8Array(await file.arrayBuffer())
  const meta = new TextEncoder().encode(
    JSON.stringify({ n: file.name, t: file.type || 'application/octet-stream' }),
  )
  const payload = new Uint8Array(4 + meta.length + raw.length)
  new DataView(payload.buffer).setUint32(0, meta.length)
  payload.set(meta, 4)
  payload.set(raw, 4 + meta.length)
  return encryptBytes(key, payload)
}

export async function unpackMedia(key, packed) {
  const payload = await decryptBytes(key, packed)
  const len = new DataView(payload.buffer, payload.byteOffset, payload.byteLength).getUint32(0)
  const meta = JSON.parse(new TextDecoder().decode(payload.slice(4, 4 + len)))
  const data = payload.slice(4 + len)
  const blob = new Blob([data], { type: meta.t })
  return { name: meta.n, mime: meta.t, blob }
}

export function imageThumb(file) {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve(null)
      return
    }
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const scale = Math.min(1, 320 / Math.max(img.width, img.height))
      const c = document.createElement('canvas')
      c.width = Math.max(1, Math.round(img.width * scale))
      c.height = Math.max(1, Math.round(img.height * scale))
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
      c.toBlob(
        (blob) => {
          URL.revokeObjectURL(url)
          resolve(blob)
        },
        'image/jpeg',
        0.7,
      )
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(null)
    }
    img.src = url
  })
}
