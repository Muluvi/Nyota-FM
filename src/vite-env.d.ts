/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STREAM_URL?: string
  readonly VITE_STREAM_URL_LOW?: string
  readonly VITE_STREAM_URL_HIGH?: string
  readonly VITE_INQUIRY_ENDPOINT?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_SALES_EMAIL?: string
  readonly VITE_SALES_WHATSAPP?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
