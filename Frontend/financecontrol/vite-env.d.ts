/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SERVICE_ID: string
  // adicione outras aqui...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}