const GRAPH = 'https://graph.microsoft.com/v1.0'
const CHUNK_SIZE = 327680 * 10
export const LAB_FOLDER = 'OfficeSyncCache'

async function graph(token, path, init = {}) {
  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${token}`)
  if (init.body && !(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const res = await fetch(`${GRAPH}${path}`, { ...init, headers })
  if (!res.ok) {
    let detail = res.statusText
    try {
      const err = await res.json()
      detail = err.error?.message ?? detail
    } catch {
      /* ignore */
    }
    throw new Error(detail)
  }

  if (res.status === 204) return undefined
  const text = await res.text()
  if (!text) return undefined
  return JSON.parse(text)
}

export async function listChildren(token, folderId) {
  const base = folderId
    ? `/me/drive/items/${folderId}/children`
    : `/me/drive/root/children`
  try {
    const data = await graph(token, `${base}?$expand=thumbnails&$top=200`)
    return data.value ?? []
  } catch {
    const data = await graph(token, `${base}?$top=200`)
    return data.value ?? []
  }
}

export async function createFolder(token, parentId, name) {
  const path = parentId
    ? `/me/drive/items/${parentId}/children`
    : '/me/drive/root/children'
  return graph(token, path, {
    method: 'POST',
    body: JSON.stringify({
      name,
      folder: {},
      '@microsoft.graph.conflictBehavior': 'rename',
    }),
  })
}

export async function ensureLabFolder(token) {
  try {
    return await graph(token, `/me/drive/root:/${encodeURIComponent(LAB_FOLDER)}`)
  } catch {
    return createFolder(token, null, LAB_FOLDER)
  }
}

export async function deleteItem(token, id) {
  await graph(token, `/me/drive/items/${id}`, { method: 'DELETE' })
}

export async function getItem(token, id) {
  return graph(token, `/me/drive/items/${id}`)
}

export async function downloadItem(token, item) {
  const res = await fetch(`${GRAPH}/me/drive/items/${item.id}/content`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Falha ao baixar o arquivo')
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = item.name
  a.click()
  URL.revokeObjectURL(url)
}

export async function uploadFile(token, parentId, file, onProgress) {
  const safeName = encodeURIComponent(file.name)
  const itemPath = parentId
    ? `/me/drive/items/${parentId}:/${safeName}:`
    : `/me/drive/root:/${safeName}:`

  if (file.size <= 4 * 1024 * 1024) {
    onProgress?.(50)
    const item = await graph(token, `${itemPath}/content`, {
      method: 'PUT',
      headers: { 'Content-Type': file.type || 'application/octet-stream' },
      body: file,
    })
    onProgress?.(100)
    return item
  }

  const session = await graph(token, `${itemPath}/createUploadSession`, {
    method: 'POST',
    body: JSON.stringify({
      item: { '@microsoft.graph.conflictBehavior': 'rename' },
    }),
  })

  let offset = 0
  let lastItem
  while (offset < file.size) {
    const end = Math.min(offset + CHUNK_SIZE, file.size)
    const chunk = file.slice(offset, end)
    const res = await fetch(session.uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Length': String(chunk.size),
        'Content-Range': `bytes ${offset}-${end - 1}/${file.size}`,
      },
      body: chunk,
    })
    if (!res.ok && res.status !== 202) throw new Error('Falha no envio do arquivo')
    if (res.status === 200 || res.status === 201) lastItem = await res.json()
    offset = end
    onProgress?.(Math.round((offset / file.size) * 100))
  }
  if (!lastItem) throw new Error('Upload concluído sem resposta')
  return lastItem
}

export function isMedia(item) {
  const mime = item.file?.mimeType ?? ''
  return mime.startsWith('image/') || mime.startsWith('video/')
}
