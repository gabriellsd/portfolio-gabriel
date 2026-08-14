export function OpenExternal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[80] bg-[#0b1220]/75 backdrop-blur-md grid place-items-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#121b2e] p-7 shadow-2xl text-slate-100">
        <p className="text-xs uppercase tracking-[0.18em] text-blue-400 mb-2">Navegador</p>
        <h2 className="text-xl font-semibold mb-2">Abra no Safari ou Chrome</h2>
        <p className="text-sm text-slate-400 mb-5 leading-relaxed">
          O Instagram abre o site num navegador interno que bloqueia o login. Toque em
          <strong className="text-slate-200"> ··· </strong>
          no canto e escolha <strong className="text-slate-200">Abrir no navegador</strong>.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500"
        >
          Entendi
        </button>
      </div>
    </div>
  )
}
