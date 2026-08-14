import { useState } from 'react'
import { checkPin, hasPin, setPin, storeKeyFromPin } from './session'

export function Gate({ onUnlock, onCancel }) {
  const [step, setStep] = useState(hasPin() ? 'enter' : 'pin1')
  const [pin, setPinValue] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!/^\d{4,8}$/.test(pin)) {
      setMsg('Use 4 a 8 dígitos.')
      return
    }
    setBusy(true)
    try {
      if (step === 'enter') {
        if (await checkPin(pin)) {
          await storeKeyFromPin(pin)
          onUnlock()
        } else {
          setMsg('Código incorreto.')
          setPinValue('')
        }
        return
      }
      if (step === 'pin1') {
        sessionStorage.setItem('calc.mem.tmp', pin)
        setPinValue('')
        setMsg('')
        setStep('pin2')
        return
      }
      const first = sessionStorage.getItem('calc.mem.tmp') ?? ''
      if (pin !== first) {
        setMsg('Os códigos não coincidem.')
        setPinValue('')
        setStep('pin1')
        return
      }
      sessionStorage.removeItem('calc.mem.tmp')
      await setPin(pin)
      await storeKeyFromPin(pin)
      onUnlock()
    } catch {
      setMsg('Não foi possível abrir agora. Tente de novo.')
    } finally {
      setBusy(false)
    }
  }

  const title = step === 'enter' ? 'Área restrita' : step === 'pin1' ? 'Definir código' : 'Confirmar código'
  const hint =
    step === 'enter'
      ? 'Digite o código de acesso.'
      : step === 'pin1'
        ? 'Escolha um código de 4 a 8 dígitos.'
        : 'Repita o código para confirmar.'

  return (
    <div className="fixed inset-0 z-[80] bg-[#0b1220]/75 backdrop-blur-md grid place-items-center p-4">
      <form
        onSubmit={(e) => void submit(e)}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#121b2e] p-7 shadow-2xl"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-blue-400 mb-2">Acesso</p>
        <h2 className="text-xl font-semibold text-white mb-1">{title}</h2>
        <p className="text-sm text-slate-400 mb-6">{hint}</p>
        <input
          autoFocus
          inputMode="numeric"
          autoComplete="off"
          value={pin}
          onChange={(e) => setPinValue(e.target.value.replace(/\D/g, '').slice(0, 8))}
          className="w-full text-center tracking-[0.45em] text-2xl rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white outline-none focus:border-blue-500"
        />
        {msg ? <p className="text-center text-sm text-red-300 mt-3">{msg}</p> : null}
        <div className="flex gap-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={busy}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 disabled:opacity-50"
          >
            {busy ? '…' : 'Continuar'}
          </button>
        </div>
      </form>
    </div>
  )
}
