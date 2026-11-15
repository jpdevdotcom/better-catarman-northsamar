/** The public address of the site, used for canonical links, link previews and the sitemap. */
export const SITE_URL = 'https://bettercatarman.org'
export const SITE_NAME = 'BetterCatarman.org'

/**
 * Sets a page's title and description, plus the matching link-preview tags
 * (Facebook, Viber, Messenger, X), so every page is described the same way everywhere.
 * The title gets " · BetterCatarman.org Northern Samar" from the title template.
 */
export function useSeo(title: string, description: string, opts: { noindex?: boolean } = {}) {
  useHead({ title })
  useSeoMeta({
    description,
    ogTitle: `${title} · ${SITE_NAME}`,
    ogDescription: description,
    twitterTitle: `${title} · ${SITE_NAME}`,
    twitterDescription: description,
    ...(opts.noindex ? { robots: 'noindex' } : {}),
  })
}

/** Adds a block of schema.org structured data to the page. */
export function useJsonLd(data: Record<string, unknown> | (() => Record<string, unknown>)) {
  useHead({
    script: [{
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify(typeof data === 'function' ? data() : data),
    }],
  })
}
