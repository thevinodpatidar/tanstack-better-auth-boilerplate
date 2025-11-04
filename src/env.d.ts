/// <reference types="vite/client" />
/** biome-ignore-all lint/style/noNamespace: biome is dumb */
/** biome-ignore-all lint/style/useConsistentTypeDefinitions: biome is dumb */

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string;
      readonly BETTER_AUTH_URL: string;
      readonly BETTER_AUTH_EMAIL_FROM: string;
      readonly GOOGLE_CLIENT_ID: string;
      readonly GOOGLE_CLIENT_SECRET: string;
      readonly GITHUB_CLIENT_ID: string;
      readonly GITHUB_CLIENT_SECRET: string;
      readonly RESEND_API_KEY: string;
    }
  }
}

export {};
