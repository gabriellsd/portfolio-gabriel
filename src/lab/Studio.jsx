import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { InteractionRequiredAuthError } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from './auth'
import {
  decryptBytes,
  encryptBytes,
  imageThumb,
  packMedia,
  unpackMedia,
} from './crypto.js'
import {
  deleteItem,
  downloadBytes,
  ensureLabFolder,
  listChildren,
  uploadFile,
} from './drive'
import { loadKey } from './session'

const IDX = 'sync.idx'

function hexName() {
  const bytes = crypto.getRandomValues(new Uint8Array(8))
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function parentOf(item) {
  return item.parentId ?? null
}

function subtree(items, folderId) {
  const folders = new Set([folderId])
  let added = true
  while (added) {
    added = false
    for (const item of items) {
      if (item.folder && folders.has(parentOf(item)) && !folders.has(item.id)) {
        folders.add(item.id)
        added = true
      }
    }
  }
  return items.filter(
    (item) => folders.has(item.id) || (parentOf(item) && folders.has(parentOf(item))),
  )
}

export function Studio({ onClose }) {
  const { instance, accounts } = useMsal()
  const account = accounts[0]
  const [driveFolderId, setDriveFolderId] = useState(null)
  const [currentId, setCurrentId] = useState(null)
  const [idxId, setIdxId] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [uploadPct, setUploadPct] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInput = useRef(null)
  const thumbs = useRef([])

  const token = useCallback(async () => {
    if (!account) throw new Error('Sessão expirada')
    try {
      const result = await instance.acquireTokenSilent({ ...loginRequest, account })
      return result.accessToken
    } catch (err) {
      if (err instanceof InteractionRequiredAuthError) {
        await instance.acquireTokenRedirect({ ...loginRequest, account })
      }
      throw err
    }
  }, [account, instance])

  const saveIndex = useCallback(async (t, parentDriveId, entries, currentIdxId) => {
    const key = await loadKey()
    const clean = entries.map(({ thumbUrl, ...rest }) => rest)
    const packed = await encryptBytes(
      key,
      new TextEncoder().encode(JSON.stringify({ entries: clean })),
    )
    const file = new File([packed], IDX, { type: 'application/octet-stream' })
    const uploaded = await uploadFile(t, parentDriveId, file)
    if (currentIdxId && currentIdxId !== uploaded.id) {
      try {
        await deleteItem(t, currentIdxId)
      } catch {
        /* ignore */
      }
    }
    return uploaded.id
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    thumbs.current.forEach((u) => URL.revokeObjectURL(u))
    thumbs.current = []
    try {
      const key = await loadKey()
      if (!key) throw new Error('Sessão expirada. Entre de novo.')
      const t = await token()
      const folder = await ensureLabFolder(t)
      setDriveFolderId(folder.id)
      const list = await listChildren(t, folder.id)
      const idxItem = list.find((i) => i.name === IDX)
      if (!idxItem) {
        setItems([])
        setIdxId(null)
        return
      }
      setIdxId(idxItem.id)
      const packed = await downloadBytes(t, idxItem.id)
      const json = JSON.parse(new TextDecoder().decode(await decryptBytes(key, packed)))
      const entries = json.entries ?? []
      for (const entry of entries) {
        if (!entry.thumbId) continue
        try {
          const raw = await decryptBytes(key, await downloadBytes(t, entry.thumbId))
          const url = URL.createObjectURL(new Blob([raw], { type: 'image/jpeg' }))
          thumbs.current.push(url)
          entry.thumbUrl = url
        } catch {
          /* ignore */
        }
      }
      setItems(entries)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível abrir')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    void load()
    return () => {
      thumbs.current.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [load])

  const visible = useMemo(() => {
    const here = items.filter((item) => parentOf(item) === currentId)
    return [...here].sort((a, b) => {
      const af = a.folder ? 0 : 1
      const bf = b.folder ? 0 : 1
      if (af !== bf) return af - bf
      return a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' })
    })
  }, [items, currentId])

  const crumbs = useMemo(() => {
    const map = new Map(items.filter((i) => i.folder).map((i) => [i.id, i]))
    const path = []
    let id = currentId
    while (id) {
      const folder = map.get(id)
      if (!folder) break
      path.unshift(folder)
      id = parentOf(folder)
    }
    return path
  }, [items, currentId])

  async function persist(next) {
    const t = await token()
    const newIdx = await saveIndex(t, driveFolderId, next, idxId)
    setIdxId(newIdx)
    setItems(next)
  }

  async function onNewFolder() {
    const name = window.prompt('Nome da pasta')
    if (!name?.trim()) return
    const folder = {
      id: crypto.randomUUID(),
      name: name.trim(),
      folder: true,
      parentId: currentId,
    }
    try {
      await persist([folder, ...items])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar a pasta')
    }
  }

  async function onUpload(files) {
    const media = Array.from(files).filter(
      (f) => f.type.startsWith('image/') || f.type.startsWith('video/'),
    )
    if (!media.length) {
      setError('Envie só imagens ou vídeos.')
      return
    }
    try {
      const key = await loadKey()
      const t = await token()
      let next = [...items]
      for (const file of media) {
        setUploadPct(5)
        const packed = await packMedia(key, file)
        setUploadPct(20)
        const blob = new File([packed], `${hexName()}.dat`, {
          type: 'application/octet-stream',
        })
        const uploaded = await uploadFile(t, driveFolderId, blob, (p) =>
          setUploadPct(20 + Math.round(p * 0.6)),
        )
        let thumbId
        const thumb = await imageThumb(file)
        if (thumb) {
          const tPacked = await encryptBytes(key, new Uint8Array(await thumb.arrayBuffer()))
          const tFile = new File([tPacked], `${hexName()}.dat`, {
            type: 'application/octet-stream',
          })
          const tUp = await uploadFile(t, driveFolderId, tFile)
          thumbId = tUp.id
        }
        next = [
          {
            id: uploaded.id,
            name: file.name,
            mime: file.type,
            video: file.type.startsWith('video/'),
            thumbId,
            parentId: currentId,
          },
          ...next,
        ]
      }
      const newIdx = await saveIndex(t, driveFolderId, next, idxId)
      setIdxId(newIdx)
      setUploadPct(null)
      await load()
    } catch (err) {
      setUploadPct(null)
      setError(err instanceof Error ? err.message : 'Falha no envio')
    }
  }

  function openItem(item) {
    if (item.folder) {
      setCurrentId(item.id)
      return
    }
    void openPreview(item)
  }

  async function openPreview(item) {
    try {
      const key = await loadKey()
      const t = await token()
      const packed = await downloadBytes(t, item.id)
      const file = await unpackMedia(key, packed)
      const url = URL.createObjectURL(file.blob)
      setPreview({ ...item, name: file.name, mime: file.mime, url })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não abriu o arquivo')
    }
  }

  async function removeDriveFiles(t, entry) {
    if (entry.folder) return
    await deleteItem(t, entry.id)
    if (entry.thumbId) {
      try {
        await deleteItem(t, entry.thumbId)
      } catch {
        /* ignore */
      }
    }
  }

  async function onDelete(item) {
    const isFolder = Boolean(item.folder)
    const msg = isFolder
      ? `Excluir a pasta “${item.name}” e tudo que está dentro?`
      : `Remover “${item.name}”?`
    if (!window.confirm(msg)) return
    try {
      const t = await token()
      const doomed = isFolder ? subtree(items, item.id) : [item]
      for (const entry of doomed) {
        await removeDriveFiles(t, entry)
      }
      const ids = new Set(doomed.map((e) => e.id))
      const next = items.filter((i) => !ids.has(i.id))
      const newIdx = await saveIndex(t, driveFolderId, next, idxId)
      setIdxId(newIdx)
      setItems(next)
      if (isFolder && (currentId === item.id || doomed.some((d) => d.id === currentId))) {
        setCurrentId(parentOf(item))
      }
      if (preview && ids.has(preview.id)) {
        if (preview.url) URL.revokeObjectURL(preview.url)
        setPreview(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível remover')
    }
  }

  function onDownload(item) {
    if (!preview?.url) return
    const a = document.createElement('a')
    a.href = preview.url
    a.download = item.name
    a.click()
  }

  return (
    <div
      className={`fixed inset-0 z-[70] bg-slate-950 text-slate-100 flex flex-col ${dragOver ? 'outline outline-2 outline-blue-500 outline-offset-[-8px]' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        if (e.dataTransfer.files.length) void onUpload(e.dataTransfer.files)
      }}
    >
      <header className="px-5 py-3 border-b border-slate-800 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium text-slate-300 hover:text-white"
          >
            Portfólio
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void onNewFolder()}
              className="text-sm font-semibold px-3 py-2 rounded-lg border border-slate-700 hover:bg-slate-800"
            >
              Nova pasta
            </button>
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              Adicionar
            </button>
          </div>
          <input
            ref={fileInput}
            type="file"
            accept="image/*,video/*"
            multiple
            hidden
            onChange={(e) => {
              if (e.target.files) void onUpload(e.target.files)
              e.target.value = ''
            }}
          />
        </div>
        <nav className="flex flex-wrap items-center gap-1 text-sm text-slate-400">
          <button
            type="button"
            className={currentId ? 'hover:text-white' : 'text-slate-100'}
            onClick={() => setCurrentId(null)}
          >
            Arquivos
          </button>
          {crumbs.map((folder) => (
            <span key={folder.id} className="flex items-center gap-1">
              <span>/</span>
              <button
                type="button"
                className={folder.id === currentId ? 'text-slate-100' : 'hover:text-white'}
                onClick={() => setCurrentId(folder.id)}
              >
                {folder.name}
              </button>
            </span>
          ))}
        </nav>
      </header>

      {error ? (
        <div className="px-5 py-2 bg-red-950 text-red-300 text-sm">{error}</div>
      ) : null}
      {uploadPct != null ? (
        <div className="px-5 py-2 bg-slate-900 text-sm">Enviando… {uploadPct}%</div>
      ) : null}

      <main className="flex-1 overflow-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 content-start">
        {loading ? (
          <p className="col-span-full text-center text-slate-400 py-16">Carregando…</p>
        ) : visible.length === 0 ? (
          <p className="col-span-full text-center text-slate-400 py-16">
            Pasta vazia. Crie uma pasta ou adicione fotos e vídeos.
          </p>
        ) : (
          visible.map((item) => (
            <div key={item.id} className="relative group">
              <button
                type="button"
                onClick={() => openItem(item)}
                className="w-full bg-slate-900 rounded-xl overflow-hidden text-left border border-slate-800 hover:border-slate-600"
              >
                {item.folder ? (
                  <div className="h-36 grid place-items-center text-4xl bg-slate-800 text-amber-400">
                    ▣
                  </div>
                ) : item.thumbUrl ? (
                  <img src={item.thumbUrl} alt="" className="w-full h-36 object-cover" />
                ) : (
                  <div className="h-36 grid place-items-center text-2xl bg-slate-800">
                    {item.video ? '▶' : '▤'}
                  </div>
                )}
                {item.video ? (
                  <span className="absolute top-2 left-2 text-[10px] uppercase bg-black/70 px-1.5 py-0.5 rounded">
                    vídeo
                  </span>
                ) : null}
                <span className="block px-2 py-2 text-xs truncate">{item.name}</span>
              </button>
              <button
                type="button"
                className="absolute top-2 right-2 text-[10px] bg-black/70 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 text-red-300"
                onClick={(e) => {
                  e.stopPropagation()
                  void onDelete(item)
                }}
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </main>

      {preview?.url ? (
        <div
          className="fixed inset-0 z-[90] bg-black/80 grid place-items-center p-4"
          onClick={() => {
            URL.revokeObjectURL(preview.url)
            setPreview(null)
          }}
        >
          <div
            className="w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-800">
              <h2 className="text-sm font-medium truncate">{preview.name}</h2>
              <div className="flex gap-2 shrink-0">
                <button type="button" className="text-sm text-blue-400" onClick={() => onDownload(preview)}>
                  Baixar
                </button>
                <button type="button" className="text-sm text-red-400" onClick={() => void onDelete(preview)}>
                  Remover
                </button>
                <button
                  type="button"
                  className="text-sm text-slate-300"
                  onClick={() => {
                    URL.revokeObjectURL(preview.url)
                    setPreview(null)
                  }}
                >
                  Fechar
                </button>
              </div>
            </header>
            {preview.mime?.startsWith('video/') ? (
              <video src={preview.url} controls autoPlay className="w-full max-h-[70vh] bg-black" />
            ) : (
              <img src={preview.url} alt={preview.name} className="w-full max-h-[70vh] object-contain bg-black" />
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
