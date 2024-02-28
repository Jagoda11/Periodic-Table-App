/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
/// <reference types="vite-plugin-pages/client" />

interface ImportMetaEnv {
  // Define the types for your environment variables, e.g.,
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string

  // If you have boolean or number environment variables, you might define them like so:
  readonly VITE_FEATURE_FLAG_ENABLED: boolean
  readonly VITE_API_TIMEOUT_MS: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
