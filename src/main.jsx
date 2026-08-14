import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import './index.css'
import App from './App.jsx'
import { hasClientId, msalConfig } from './lab/auth'
import { Shell } from './lab/Shell.jsx'

const root = createRoot(document.getElementById('root'))

if (!hasClientId) {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  const pca = new PublicClientApplication(msalConfig)
  void pca.initialize().then(async () => {
    await pca.handleRedirectPromise()
    root.render(
      <StrictMode>
        <MsalProvider instance={pca}>
          <Shell />
        </MsalProvider>
      </StrictMode>,
    )
  })
}
