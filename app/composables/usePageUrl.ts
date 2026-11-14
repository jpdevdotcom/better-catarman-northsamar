/**
 * The full public address of a page on this site, for sharing and QR codes.
 * Uses NUXT_PUBLIC_SITE_URL when set (e.g. https://bettercatarman.org), otherwise the address
 * the visitor is on. Set it in production so QR codes printed from any copy point to the real site.
 */
export function usePageUrl() {
  const configured = useRuntimeConfig().public.siteUrl as string
  return (path: string) => {
    const base = (configured || (import.meta.client ? window.location.origin : '')).replace(/\/$/, '')
    return `${base}${path}`
  }
}
