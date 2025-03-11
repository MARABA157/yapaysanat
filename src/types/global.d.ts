export {};

declare global {
  interface Window {
    getWebpUrl: (url: string) => string;
    supportsWebp: boolean;
  }
}
