import { useCallback, useEffect, useRef, useState } from 'react'
import { InteractionRequiredAuthError } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from './auth'
import {
  deleteItem,
  downloadItem,
  ensureLabFolder,
  getItem,
  isMedia,
  listChildren,
  uploadFile,
} from './drive'

export function Studio({ onClose }) {
  const { instance, accounts } = useMsal()
  const account = accounts[0]
  const [folderId, setFolderId] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [uploadPct, setUploadPct] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInput = useRef(null)

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

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const t = await token()
      const folder = await ensureLabFolder(t)
      setFolderId(folder.id)
      const list = await listChildren(t, folder.id)
      setItems(list.filter(isMedia))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível abrir')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    void load()
  }, [load])

  async function onUpload(files) {
    const media = Array.from(files).filter(
      (f) => f.type.startsWith('image/') || f.type.startsWith('video/'),
    )
    if (!media.length) {
      setError('Envie só imagens ou vídeos.')
      return
    }
    try {
      const t = await token()
      for (const file of media) {
        setUploadPct(0)
        await uploadFile(t, folderId, file, setUploadPct)
      }
      setUploadPct(null)
      await load()
    } catch (err) {
      setUploadPct(null)
      setError(err instanceof Error ? err.message : 'Falha no envio')
    }
  }

  async function openPreview(item) {
    try {
      const t = await token()
      setPreview(await getItem(t, item.id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não abriu o arquivo')
    }
  }

  async function onDelete(item) {
    if (!window.confirm('Remover este arquivo?')) return
    try {
      const t = await token()
      await deleteItem(t, item.id)
      setItems((prev) => prev.filter((i) => i.id !== item.id))
      if (preview?.id === item.id) setPreview(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível remover')
    }
  }

  async function onDownload(item) {
    try {
      const t = await token()
      await downloadItem(t, item)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download falhou')
    }
  }

  const previewUrl = preview?.['@microsoft.graph.downloadUrl']

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
      <header className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-slate-300 hover:text-white"
        >
          Início
        </button>
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          Adicionar
        </button>
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
        ) : items.length === 0 ? (
          <p className="col-span-full text-center text-slate-400 py-16">
            Solte fotos ou vídeos aqui, ou clique em Adicionar.
          </p>
        ) : (
          items.map((item) => {
            const thumb = item.thumbnails?.[0]?.medium?.url ?? item.thumbnails?.[0]?.small?.url
            const video = item.file?.mimeType?.startsWith('video/')
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => void openPreview(item)}
                className="relative bg-slate-900 rounded-xl overflow-hidden text-left border border-slate-800 hover:border-slate-600"
              >
                {thumb ? (
                  <img src={thumb} alt="" className="w-full h-36 object-cover" />
                ) : (
                  <div className="h-36 grid place-items-center text-2xl bg-slate-800">
                    {video ? '▶' : '▣'}
                  </div>
                )}
                {video ? (
                  <span className="absolute top-2 left-2 text-[10px] uppercase bg-black/70 px-1.5 py-0.5 rounded">
                    vídeo
                  </span>
                ) : null}
                <span className="block px-2 py-2 text-xs truncate">{item.name}</span>
              </button>
            )
          })
        )}
      </main>

      {preview && previewUrl ? (
        <div
          className="fixed inset-0 z-[90] bg-black/80 grid place-items-center p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-800">
              <h2 className="text-sm font-medium truncate">{preview.name}</h2>
              <div className="flex gap-2 shrink-0">
                <button type="button" className="text-sm text-blue-400" onClick={() => void onDownload(preview)}>
                  Baixar
                </button>
                <button type="button" className="text-sm text-red-400" onClick={() => void onDelete(preview)}>
                  Remover
                </button>
                <button type="button" className="text-sm text-slate-300" onClick={() => setPreview(null)}>
                  Fechar
                </button>
              </div>
            </header>
            {preview.file?.mimeType?.startsWith('video/') ? (
              <video src={previewUrl} controls autoPlay className="w-full max-h-[70vh] bg-black" />
            ) : (
              <img src={previewUrl} alt={preview.name} className="w-full max-h-[70vh] object-contain bg-black" />
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
