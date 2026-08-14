import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { InteractionRequiredAuthError } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'
import {
  ArrowLeft,
  ChevronRight,
  Download,
  Folder,
  FolderPlus,
  Image as ImageIcon,
  Trash2,
  Upload,
  Video,
  X,
} from 'lucide-react'
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

function friendlyMessage(err, fallback) {
  const msg = err instanceof Error ? err.message : ''
  if (/operation-specific reason/i.test(msg)) {
    return 'Não foi possível concluir agora. Tente de novo.'
  }
  return msg || fallback
}

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
  const [folderOpen, setFolderOpen] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [folderBusy, setFolderBusy] = useState(false)
  const fileInput = useRef(null)
  const thumbs = useRef([])

  const token = useCallback(async () => {
    if (!account) throw new Error('Sessão expirada')
    try {
      const result = await instance.acquireTokenSilent({ ...loginRequest, account })
      return result.accessToken
    } catch (err) {
      const msg = err instanceof Error ? err.message : ''
      const needsLogin =
        err instanceof InteractionRequiredAuthError ||
        /operation-specific reason/i.test(msg)
      if (needsLogin) {
        await instance.acquireTokenRedirect({ ...loginRequest, account })
        return new Promise(() => {})
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
      setError(friendlyMessage(err, 'Não foi possível abrir'))
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

  async function onNewFolder(e) {
    e?.preventDefault()
    const name = folderName.trim()
    if (!name) return
    setFolderBusy(true)
    const folder = {
      id: crypto.randomUUID(),
      name,
      folder: true,
      parentId: currentId,
    }
    try {
      await persist([folder, ...items])
      setFolderName('')
      setFolderOpen(false)
    } catch (err) {
      setError(friendlyMessage(err, 'Não foi possível criar a pasta'))
    } finally {
      setFolderBusy(false)
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
      setError(friendlyMessage(err, 'Falha no envio'))
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
      setError(friendlyMessage(err, 'Não abriu o arquivo'))
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
      setError(friendlyMessage(err, 'Não foi possível remover'))
    }
  }

  function onDownload(item) {
    if (!preview?.url) return
    const a = document.createElement('a')
    a.href = preview.url
    a.download = item.name
    a.click()
  }

  const foldersHere = visible.filter((i) => i.folder).length
  const filesHere = visible.length - foldersHere

  return (
    <div
      className="fixed inset-0 z-[70] bg-[#0b1220] text-slate-100 flex flex-col"
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setDragOver(false)
      }}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        if (e.dataTransfer.files.length) void onUpload(e.dataTransfer.files)
      }}
    >
      <header className="border-b border-white/10 bg-[#0e1728]/90 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Portfólio
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFolderOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <FolderPlus size={16} />
              Nova pasta
            </button>
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shadow-lg shadow-blue-600/20"
            >
              <Upload size={16} />
              Enviar
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
        <div className="flex items-center justify-between gap-3 px-5 pb-3">
          <nav className="flex flex-wrap items-center gap-1 text-sm min-w-0">
            <button
              type="button"
              className={`truncate ${currentId ? 'text-slate-400 hover:text-white' : 'text-white font-medium'}`}
              onClick={() => setCurrentId(null)}
            >
              Arquivos
            </button>
            {crumbs.map((folder) => (
              <span key={folder.id} className="flex items-center gap-1 min-w-0">
                <ChevronRight size={14} className="text-slate-600 shrink-0" />
                <button
                  type="button"
                  className={`truncate ${folder.id === currentId ? 'text-white font-medium' : 'text-slate-400 hover:text-white'}`}
                  onClick={() => setCurrentId(folder.id)}
                >
                  {folder.name}
                </button>
              </span>
            ))}
          </nav>
          <p className="text-xs text-slate-500 shrink-0">
            {foldersHere} pasta{foldersHere === 1 ? '' : 's'} · {filesHere} arquivo{filesHere === 1 ? '' : 's'}
          </p>
        </div>
        {uploadPct != null ? (
          <div className="h-1 bg-white/5">
            <div className="h-full bg-blue-500 transition-all" style={{ width: `${uploadPct}%` }} />
          </div>
        ) : null}
      </header>

      {error ? (
        <div className="mx-5 mt-4 rounded-xl border border-red-500/20 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <main className="flex-1 overflow-auto p-5">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="h-full min-h-[420px] grid place-items-center">
            <div className="text-center max-w-sm">
              <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-blue-600/15 text-blue-400 grid place-items-center">
                <Upload size={28} />
              </div>
              <h2 className="text-lg font-semibold mb-2">Esta pasta está vazia</h2>
              <p className="text-sm text-slate-400 mb-6">
                Envie fotos e vídeos ou crie uma subpasta para organizar o acervo.
              </p>
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setFolderOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm hover:bg-white/5"
                >
                  <FolderPlus size={16} />
                  Nova pasta
                </button>
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-sm font-medium hover:bg-blue-500"
                >
                  <Upload size={16} />
                  Enviar arquivos
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {visible.map((item) => {
              const count = items.filter((i) => parentOf(i) === item.id).length
              return (
                <article
                  key={item.id}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-white/20 hover:bg-white/[0.05] transition"
                >
                  <button type="button" onClick={() => openItem(item)} className="w-full text-left">
                    {item.folder ? (
                      <div className="h-40 grid place-items-center bg-gradient-to-br from-amber-500/15 to-transparent">
                        <Folder size={48} className="text-amber-400" fill="currentColor" fillOpacity={0.2} />
                      </div>
                    ) : item.thumbUrl ? (
                      <img src={item.thumbUrl} alt="" className="w-full h-40 object-cover" />
                    ) : (
                      <div className="h-40 grid place-items-center bg-white/5 text-slate-500">
                        {item.video ? <Video size={36} /> : <ImageIcon size={36} />}
                      </div>
                    )}
                    {item.video ? (
                      <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wide bg-black/60 backdrop-blur px-2 py-1 rounded-md">
                        Vídeo
                      </span>
                    ) : null}
                    <div className="px-3 py-3">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.folder ? `${count} ${count === 1 ? 'item' : 'itens'}` : item.video ? 'Vídeo' : 'Imagem'}
                      </p>
                    </div>
                  </button>
                  <button
                    type="button"
                    title="Excluir"
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/55 backdrop-blur text-slate-200 grid place-items-center opacity-0 group-hover:opacity-100 hover:text-red-300 transition"
                    onClick={(e) => {
                      e.stopPropagation()
                      void onDelete(item)
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </article>
              )
            })}
          </div>
        )}
      </main>

      {dragOver ? (
        <div className="pointer-events-none absolute inset-0 z-[75] bg-blue-600/15 border-2 border-dashed border-blue-400 m-3 rounded-3xl grid place-items-center">
          <p className="text-lg font-medium">Solte os arquivos para enviar</p>
        </div>
      ) : null}

      {folderOpen ? (
        <div className="fixed inset-0 z-[85] bg-black/60 backdrop-blur-sm grid place-items-center p-4">
          <form
            onSubmit={(e) => void onNewFolder(e)}
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#121b2e] p-6 shadow-2xl"
          >
            <h2 className="text-base font-semibold mb-1">Nova pasta</h2>
            <p className="text-sm text-slate-400 mb-4">O nome aparece só nesta galeria.</p>
            <input
              autoFocus
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Ex.: Viagem 2026"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={() => {
                  setFolderOpen(false)
                  setFolderName('')
                }}
                className="px-3 py-2 text-sm rounded-lg text-slate-300 hover:bg-white/5"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={folderBusy || !folderName.trim()}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                {folderBusy ? 'Criando…' : 'Criar'}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {preview?.url ? (
        <div
          className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => {
            URL.revokeObjectURL(preview.url)
            setPreview(null)
          }}
        >
          <div
            className="w-full max-w-5xl rounded-2xl border border-white/10 bg-[#121b2e] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
              <h2 className="text-sm font-medium truncate">{preview.name}</h2>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg hover:bg-white/5"
                  onClick={() => onDownload(preview)}
                >
                  <Download size={14} />
                  Baixar
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg text-red-300 hover:bg-red-950/40"
                  onClick={() => void onDelete(preview)}
                >
                  <Trash2 size={14} />
                  Remover
                </button>
                <button
                  type="button"
                  className="w-8 h-8 grid place-items-center rounded-lg hover:bg-white/5"
                  onClick={() => {
                    URL.revokeObjectURL(preview.url)
                    setPreview(null)
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </header>
            {preview.mime?.startsWith('video/') ? (
              <video src={preview.url} controls autoPlay className="w-full max-h-[75vh] bg-black" />
            ) : (
              <img src={preview.url} alt={preview.name} className="w-full max-h-[75vh] object-contain bg-black" />
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
