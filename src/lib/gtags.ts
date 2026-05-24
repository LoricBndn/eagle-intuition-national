// lib/gtag.ts

// Déclaration globale pour TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// Évite que TypeScript se plaigne dans les modules
export {};

export const GA_MEASUREMENT_ID = 'G-CLXCBLT3P5';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};
