import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import './index.css'
import { hasClientId, msalConfig } from './lab/auth'
import { isEmbeddedBrowser } from './lab/browser.js'
import { EmbeddedShell } from './lab/EmbeddedShell.jsx'
import { Shell } from './lab/Shell.jsx'

const root = createRoot(document.getElementById('root'))

function renderPlain() {
  root.render(
    <StrictMode>
      <EmbeddedShell />
    </StrictMode>,
  )
}

if (!hasClientId || isEmbeddedBrowser()) {
  renderPlain()
} else {
  const pca = new PublicClientApplication(msalConfig)
  void pca
    .initialize()
    .then(async () => {
      try {
        await pca.handleRedirectPromise()
      } catch {
        /* login pode ter concluído mesmo com aviso do Windows */
      }
      root.render(
        <StrictMode>
          <MsalProvider instance={pca}>
            <Shell />
          </MsalProvider>
        </StrictMode>,
      )
    })
    .catch(() => {
      renderPlain()
    })
}
