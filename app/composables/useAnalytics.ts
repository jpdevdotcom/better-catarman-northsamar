/**
 * Google Analytics, only with the visitor's consent.
 * Nothing from Google is loaded until the visitor taps "Accept". The choice is kept on their
 * device and can be changed any time from the privacy notice. Declining or withdrawing
 * leaves the site working exactly the same.
 */
const KEY = 'bettercatarman-analytics'
export type Consent = 'granted' | 'denied' | null

declare global {
  interface Window { dataLayer?: unknown[] }
}

export function useAnalytics() {
  const consent = useState<Consent>('analytics-consent', () => null)
  // Stays false until the browser has read the saved choice, so the notice never flashes.
  const ready = useState('analytics-ready', () => false)
  const tagId = useRuntimeConfig().public.googleTagId as string

  function load() {
    if (!import.meta.client || !tagId || document.getElementById('google-tag')) return
    window.dataLayer = window.dataLayer || []
    // Same setup as the snippet Google gives, run only after consent.
    window.dataLayer.push({ 'gtm.start': Date.now(), 'event': 'gtm.js' })
    const s = document.createElement('script')
    s.id = 'google-tag'
    s.async = true
    s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(tagId)}`
    document.head.appendChild(s)
  }

  function save(value: Exclude<Consent, null>) {
    consent.value = value
    try { localStorage.setItem(KEY, value) }
    catch { /* private browsing: the choice lasts for this visit only */ }
  }

  function restore() {
    try {
      const v = localStorage.getItem(KEY)
      consent.value = v === 'granted' || v === 'denied' ? v : null
    }
    catch { consent.value = null }
    ready.value = true
    if (consent.value === 'granted') load()
  }

  const accept = () => { save('granted'); load() }
  const decline = () => save('denied')

  /** Withdraws consent: removes Google's cookies and reloads so the tag is gone. */
  function withdraw() {
    save('denied')
    for (const c of document.cookie.split(';')) {
      const name = c.split('=')[0]!.trim()
      if (name.startsWith('_ga') || name.startsWith('_gid')) {
        for (const domain of ['', `; domain=${location.hostname}`, `; domain=.${location.hostname.replace(/^www\./, '')}`])
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
      }
    }
    location.reload()
  }

  /** Shows the notice again so the visitor can choose. */
  const ask = () => (consent.value = null)

  return { consent, ready, enabled: !!tagId, accept, decline, withdraw, ask, restore }
}
