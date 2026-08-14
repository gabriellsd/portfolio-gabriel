import { useState } from 'react'
import { checkPin, hasPin, setPin, storeKeyFromPin } from './session'

export function Gate({ onUnlock, onCancel }) {
  const [step, setStep] = useState(hasPin() ? 'enter' : 'pin1')
  const [pin, setPinValue] = useState('')
  const [msg, setMsg] = useState('')

  async function submit(e) {
    e.preventDefault()
    if (!/^\d{4,8}$/.test(pin)) {
      setMsg('Use 4 a 8 dígitos.')
      return
    }
    if (step === 'enter') {
      if (await checkPin(pin)) {
        await storeKeyFromPin(pin)
        onUnlock()
      } else {
        setMsg('Não encontrado.')
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
      setMsg('Não conferiu.')
      setPinValue('')
      setStep('pin1')
      return
    }
    sessionStorage.removeItem('calc.mem.tmp')
    await setPin(pin)
    await storeKeyFromPin(pin)
    onUnlock()
  }

  const title = step === 'enter' ? 'Acesso' : step === 'pin1' ? 'Novo código' : 'Repita o código'

  return (
    <div className="fixed inset-0 z-[80] bg-slate-900/70 backdrop-blur-sm grid place-items-center p-4">
      <form
        onSubmit={(e) => void submit(e)}
        className="w-full max-w-xs bg-slate-50 rounded-2xl p-6 shadow-2xl space-y-4"
      >
        <p className="text-center font-semibold text-slate-800">{title}</p>
        <input
          autoFocus
          inputMode="numeric"
          autoComplete="off"
          value={pin}
          onChange={(e) => setPinValue(e.target.value.replace(/\D/g, '').slice(0, 8))}
          className="w-full text-center tracking-[0.4em] text-xl rounded-xl border border-slate-200 px-3 py-3 bg-white"
        />
        {msg ? <p className="text-center text-sm text-red-600">{msg}</p> : null}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl border border-slate-200 font-medium hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button type="submit" className="flex-1 py-2 rounded-xl bg-slate-900 text-white font-medium">
            OK
          </button>
        </div>
      </form>
    </div>
  )
}
