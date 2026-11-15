<script setup lang="ts">
import { Languages } from '@lucide/vue'
import { locales } from '~/composables/useT'

const { locale, t, restoreLocale } = useT()
const route = useRoute()

// The saved language and analytics choice are applied once the page is running in the browser.
const { restore: restoreAnalytics } = useAnalytics()
onMounted(() => { restoreLocale(); restoreAnalytics() })
useHead({ htmlAttrs: { lang: () => locales.find(l => l.code === locale.value)!.htmlLang } })

// One address per page for search engines (so the .pages.dev copy and www never compete),
// and the shared parts of every link preview.
const pageUrl = computed(() => `${SITE_URL}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}`)
useHead({ link: [{ rel: 'canonical', href: pageUrl }] })
useSeoMeta({
  ogUrl: pageUrl,
  ogSiteName: SITE_NAME,
  ogType: 'website',
  ogLocale: 'en_PH',
  ogImage: `${SITE_URL}/og-image.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'BetterCatarman.org, Northern Samar: Catarman’s public information, in one place',
  twitterCard: 'summary_large_image',
  twitterImage: `${SITE_URL}/og-image.png`,
})
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
    >
      {{ t('Skip to main content') }}
    </a>
    <AppHeader />
    <p v-if="locale !== 'en'" class="border-b bg-secondary text-secondary-foreground print:hidden">
      <span class="container-page flex items-start gap-2.5 py-2.5 text-sm">
        <Languages class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>
          {{ t('This page is partly translated. Official requirements and quoted documents stay in English, as published.') }}
          {{ t('Spot a wrong translation?') }}
          <NuxtLink :to="{ path: '/report', query: { page: route.path } }" class="font-semibold underline underline-offset-4">{{ t('Tell us') }}</NuxtLink>
        </span>
      </span>
    </p>
    <main id="main" class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter />
    <ConsentNotice />
  </div>
</template>
