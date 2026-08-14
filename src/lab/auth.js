import { LogLevel } from '@azure/msal-browser'

const clientId = import.meta.env.VITE_AZURE_CLIENT_ID ?? ''
const authority =
  import.meta.env.VITE_AZURE_AUTHORITY ??
  'https://login.microsoftonline.com/common'

export const GRAPH_SCOPES = ['User.Read', 'Files.ReadWrite']

const localeParams = {
  ui_locales: 'pt-BR',
  mkt: 'pt-BR',
}

export const msalConfig = {
  auth: {
    clientId,
    authority,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Warning,
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return
        if (level === LogLevel.Error) console.error(message)
      },
    },
  },
}

export const loginRequest = {
  scopes: GRAPH_SCOPES,
  extraQueryParameters: localeParams,
}

export const hasClientId = Boolean(clientId)
