import { fil } from '~/i18n/fil'
import { war } from '~/i18n/war'

/**
 * Site languages. English is the source language: every string is written in English in
 * the pages, and `t('English text')` looks up its translation. Anything without a
 * translation simply stays in English, so pages can be translated a piece at a time.
 */
export const locales = [
  { code: 'en', label: 'English', short: 'EN', htmlLang: 'en' },
  { code: 'fil', label: 'Filipino', short: 'FIL', htmlLang: 'fil' },
  { code: 'war', label: 'Waray', short: 'WAR', htmlLang: 'war' },
] as const

export type Locale = typeof locales[number]['code']

const dictionaries: Record<Exclude<Locale, 'en'>, Record<string, string>> = { fil, war }
const STORAGE_KEY = 'bettercatarman-language'

export function useT() {
  // Starts as English on the server and on first paint, then switches to the saved
  // choice once the page is running in the browser (see restoreLocale in app.vue).
  const locale = useState<Locale>('locale', () => 'en')

  function t(text: string, vars?: Record<string, string | number>): string {
    let out = locale.value === 'en' ? text : (dictionaries[locale.value][text] ?? text)
    if (vars) for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, String(v))
    return out
  }

  function setLocale(code: Locale) {
    locale.value = code
    try { localStorage.setItem(STORAGE_KEY, code) }
    catch { /* private browsing: the choice just won't be remembered */ }
  }

  function restoreLocale() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && locales.some(l => l.code === saved)) locale.value = saved as Locale
    }
    catch { /* ignore */ }
  }

  return { locale, t, setLocale, restoreLocale }
}
