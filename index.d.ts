declare module "nuxt/schema" {
  interface RuntimeConfig {
    apiSecret: string;
  }
  interface PublicRuntimeConfig {
    apiBase: string;
  }
}

export {};
