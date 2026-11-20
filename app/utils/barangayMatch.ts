import { barangays } from '~/data/barangays'

const VARIANTS: Record<string, string[]> = {
  'Gibulwangan': ['Gebulwangan', 'Hibulwangan'],
  'Trangue': ['Tranque'],
  'Doña Pulqueria': ['Dona Polqueria', 'Dona Polquera', 'Do±a Pulqueria'],
  'Airport Village': ['Airport'],
  'Jose Abad Santos': ['Abad Santos'],
}

export const foldText = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036F]/g, '').toLowerCase()

const pattern = (name: string) =>
  foldText(name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/[\s-]+/g, '[\\s-]*')

const matchers = barangays.map(b => ({
  name: b.name,
  re: new RegExp(`(^|[^a-z0-9])(${[b.name, ...(VARIANTS[b.name] ?? [])].map(pattern).join('|')})(?![a-z0-9])`),
}))

export function barangaysIn(text: string): string[] {
  const folded = foldText(text)
  return matchers.filter(m => m.re.test(folded)).map(m => m.name)
}
